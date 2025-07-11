import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Clock,
  Plus,
  Eye,
  Edit,
  FileText,
  Video,
  CheckCircle,
  BarChart3,
  Upload,
  GraduationCap,
  Monitor,
  Calendar as CalendarIcon,
  AlertCircle,
  Star,
  X,
  Download,
  Trash2
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Material {
  id: string;
  title: string;
  description?: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  subject?: string;
  download_count: number;
  created_at: string;
}

const TeacherDashboard = () => {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("overview");
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const students = [
    { id: 1, name: "María González", progress: 75, lastActive: "2 horas", participation: 85, competences: { geografia: 78, historia: 82 } },
    { id: 2, name: "Carlos Ruiz", progress: 45, lastActive: "1 día", participation: 60, competences: { geografia: 52, historia: 38 } },
    { id: 3, name: "Ana Pérez", progress: 90, lastActive: "30 min", participation: 95, competences: { geografia: 88, historia: 92 } },
  ];

  // Load materials on component mount
  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMaterials(data || []);
    } catch (error) {
      console.error('Error loading materials:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los materiales",
        variant: "destructive",
      });
    }
  };

  const uploadFile = async (file: File) => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "Debes estar logueado para subir archivos",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (100MB max)
    if (file.size > 100 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "El archivo es demasiado grande (máx. 100MB)",
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'video/mp4',
      'image/jpeg',
      'image/png'
    ];

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Error",
        description: "Tipo de archivo no soportado",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Check if user is authenticated
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) {
        toast({
          title: "Error",
          description: "Debes iniciar sesión para subir archivos",
          variant: "destructive"
        });
        return;
      }

      // Generate unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${authUser.id}/${fileName}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('teacher-materials')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Save material metadata to database
      const { error: dbError } = await supabase
        .from('materials')
        .insert({
          teacher_id: authUser.id,
          title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
          file_name: file.name,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
          subject: 'Geografía e Historia'
        });

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }

      toast({
        title: "Éxito",
        description: "Archivo subido correctamente",
      });

      // Reload materials
      await loadMaterials();
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "No se pudo subir el archivo",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (files: FileList) => {
    Array.from(files).forEach(uploadFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files);
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return <FileText className="w-6 h-6 text-primary" />;
    if (fileType.includes('video')) return <Video className="w-6 h-6 text-primary" />;
    if (fileType.includes('image')) return <FileText className="w-6 h-6 text-primary" />;
    return <FileText className="w-6 h-6 text-primary" />;
  };

  const downloadFile = async (material: Material) => {
    try {
      const { data, error } = await supabase.storage
        .from('teacher-materials')
        .download(material.file_path);

      if (error) throw error;

      // Create download link
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = material.file_name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Update download count
      await supabase
        .from('materials')
        .update({ download_count: material.download_count + 1 })
        .eq('id', material.id);

      await loadMaterials();
    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        title: "Error",
        description: "No se pudo descargar el archivo",
        variant: "destructive",
      });
    }
  };

  const deleteMaterial = async (materialId: string, filePath: string) => {
    try {
      // Delete file from storage
      const { error: storageError } = await supabase.storage
        .from('teacher-materials')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('materials')
        .delete()
        .eq('id', materialId);

      if (dbError) throw dbError;

      toast({
        title: "Éxito",
        description: "Material eliminado correctamente",
      });

      await loadMaterials();
    } catch (error) {
      console.error('Error deleting material:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el material",
        variant: "destructive",
      });
    }
  };

  const exams = [
    { id: 1, title: "Examen Historia Medieval", type: "PDF", status: "pendiente", students: 28 },
    { id: 2, title: "Test Geografía Europa", type: "Formulario", status: "calificado", students: 28 },
  ];

  const tutoringSessions = [
    { id: 1, student: "María González", parent: "Elena González", date: "2024-01-15", time: "16:00", status: "confirmada" },
    { id: 2, student: "Carlos Ruiz", parent: "Roberto Ruiz", date: "2024-01-16", time: "17:30", status: "pendiente" },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-foreground">Panel del Profesor</h1>
            <div className="text-sm text-muted-foreground">
              Bienvenido, {user?.name}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full lg:w-auto">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="analytics">Analizar Datos</TabsTrigger>
            <TabsTrigger value="materials">Materiales</TabsTrigger>
            <TabsTrigger value="exams">Exámenes</TabsTrigger>
            <TabsTrigger value="tutoring">Tutorías</TabsTrigger>
          </TabsList>

          {/* RESUMEN */}
          <TabsContent value="overview" className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Estudiantes</p>
                      <p className="text-2xl font-bold text-foreground">28</p>
                    </div>
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Materiales</p>
                      <p className="text-2xl font-bold text-foreground">15</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-secondary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Progreso Medio</p>
                      <p className="text-2xl font-bold text-foreground">72%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Horas Totales</p>
                      <p className="text-2xl font-bold text-foreground">156</p>
                    </div>
                    <Clock className="w-8 h-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Estudiantes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Progreso de Estudiantes</span>
                    <Button size="sm" onClick={() => setActiveTab("analytics")}>
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Análisis
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {students.slice(0, 3).map((student) => (
                    <div key={student.id} className="border border-border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-foreground">{student.name}</h3>
                        <span className="text-sm text-muted-foreground">
                          Activo: {student.lastActive}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Progress value={student.progress} className="flex-1" />
                        <span className="text-sm font-medium">{student.progress}%</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Materiales Recientes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Material Reciente</span>
                    <Button size="sm" onClick={() => setActiveTab("materials")}>
                      <Plus className="w-4 h-4 mr-2" />
                      Gestionar
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {materials.map((material) => (
                    <div key={material.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center space-x-3">
                           <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                             {getFileIcon(material.file_type)}
                           </div>
                           <div>
                             <h3 className="font-medium text-foreground">{material.title}</h3>
                             <p className="text-sm text-muted-foreground">
                               {material.download_count} descargas
                             </p>
                           </div>
                         </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ANALIZAR DATOS */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Participación Media</p>
                      <p className="text-2xl font-bold text-foreground">80%</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Alumnos en Riesgo</p>
                      <p className="text-2xl font-bold text-destructive">3</p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-destructive" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Rendimiento Alto</p>
                      <p className="text-2xl font-bold text-secondary">12</p>
                    </div>
                    <Star className="w-8 h-8 text-secondary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Análisis Individual por Estudiante</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Estudiante</TableHead>
                      <TableHead>Progreso</TableHead>
                      <TableHead>Participación</TableHead>
                      <TableHead>Geografía</TableHead>
                      <TableHead>Historia</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={student.progress} className="w-16" />
                            <span className="text-sm">{student.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={student.participation >= 80 ? "default" : student.participation >= 60 ? "secondary" : "destructive"}>
                            {student.participation}%
                          </Badge>
                        </TableCell>
                        <TableCell>{student.competences.geografia}%</TableCell>
                        <TableCell>{student.competences.historia}%</TableCell>
                        <TableCell>
                          <Badge variant={student.progress >= 80 ? "default" : student.progress >= 60 ? "secondary" : "destructive"}>
                            {student.progress >= 80 ? "Excelente" : student.progress >= 60 ? "Bien" : "Necesita Apoyo"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* MATERIALES */}
          <TabsContent value="materials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Gestión de Materiales</span>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Subir desde Google Drive
                    </Button>
                    <Button onClick={() => fileInputRef.current?.click()}>
                      <Plus className="w-4 h-4 mr-2" />
                      Subir Archivos
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.jpg,.jpeg,.png"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                
                <div 
                  className={`mb-6 p-8 border-2 border-dashed rounded-lg text-center transition-colors cursor-pointer ${
                    isDragOver 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="flex flex-col items-center space-y-3">
                    <Upload className={`w-12 h-12 ${isDragOver ? 'text-primary' : 'text-muted-foreground'}`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {isUploading ? 'Subiendo archivos...' : 'Arrastra archivos aquí o haz clic para seleccionar'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Soporta: PDF, DOC, PPT, MP4, JPG, PNG (máx. 100MB)
                      </p>
                    </div>
                  </div>
                  {isUploading && (
                    <div className="mt-4">
                      <Progress value={undefined} className="w-full" />
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {materials.map((material) => (
                    <Card key={material.id} className="border-border hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            {getFileIcon(material.file_type)}
                          </div>
                          <Badge variant="secondary">
                            {material.file_type.includes('pdf') ? 'PDF' : 
                             material.file_type.includes('video') ? 'Video' : 
                             material.file_type.includes('image') ? 'Imagen' : 'Documento'}
                          </Badge>
                        </div>
                        <h3 className="font-medium text-foreground mb-2">{material.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {material.download_count} descargas • {material.subject || 'Sin categoría'}
                        </p>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => downloadFile(material)}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Descargar
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => deleteMaterial(material.id, material.file_path)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {materials.length === 0 && !isUploading && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No hay materiales subidos aún</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Arrastra archivos o haz clic en "Subir Archivos" para comenzar
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* EXÁMENES */}
          <TabsContent value="exams" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Gestión de Exámenes</span>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Subir desde Google Drive
                    </Button>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Crear Formulario
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6 p-4 border-2 border-dashed border-accent/20 bg-accent/5 rounded-lg text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <img src="/lovable-uploads/fecd3295-9f1c-4b04-8d04-0c874d41436e.png" alt="Logo" className="w-8 h-8 rounded" />
                    <p className="text-sm text-foreground font-medium">
                      Subir Exámenes desde Google Drive
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Soporta: PDF, DOC, Formularios de Google • Calificación manual o semiautomática
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {exams.map((exam) => (
                    <Card key={exam.id} className="border-border hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                              <img src="/lovable-uploads/fecd3295-9f1c-4b04-8d04-0c874d41436e.png" alt="Logo" className="w-6 h-6 rounded" />
                            </div>
                            <div>
                              <h3 className="font-medium text-foreground">{exam.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {exam.type} • {exam.students} estudiantes • Geografía e Historia
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  Google Drive
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  Calificación {exam.status === 'calificado' ? 'manual' : 'semiautomática'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge variant={exam.status === 'calificado' ? 'default' : 'secondary'}>
                              {exam.status === 'calificado' ? 'Calificado' : 'Pendiente'}
                            </Badge>
                            <Button variant="outline" size="sm">
                              {exam.status === 'calificado' ? 'Ver Resultados' : 'Calificar'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TUTORÍAS */}
          <TabsContent value="tutoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Calendario de Tutorías</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Sesiones Programadas</span>
                    <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tutoringSessions.map((session) => (
                    <Card key={session.id} className="border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-foreground">{session.student}</h3>
                          <Badge variant={session.status === 'confirmada' ? 'default' : 'secondary'}>
                            {session.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Padre/Madre: {session.parent}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {session.date} a las {session.time}
                        </p>
                        <div className="flex space-x-2 mt-3">
                          <Button variant="outline" size="sm">
                            Confirmar
                          </Button>
                          <Button variant="outline" size="sm">
                            Reagendar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TeacherDashboard;