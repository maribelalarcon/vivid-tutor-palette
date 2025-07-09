import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  CheckCircle
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

const TeacherDashboard = () => {
  const { user } = useAuthStore();

  const students = [
    { id: 1, name: "María González", progress: 75, lastActive: "2 horas" },
    { id: 2, name: "Carlos Ruiz", progress: 45, lastActive: "1 día" },
    { id: 3, name: "Ana Pérez", progress: 90, lastActive: "30 min" },
  ];

  const materials = [
    { id: 1, title: "La Revolución Industrial", type: "PDF", uploads: 3 },
    { id: 2, title: "Atlas de Europa", type: "PDF", uploads: 2 },
    { id: 3, title: "Video: Primera Guerra Mundial", type: "Video", uploads: 1 },
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
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                <Button size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Todos
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {students.map((student) => (
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

          {/* Materiales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Material Subido</span>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Subir Nuevo
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {materials.map((material) => (
                <div key={material.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                        {material.type === 'PDF' ? (
                          <FileText className="w-5 h-5 text-primary-foreground" />
                        ) : (
                          <Video className="w-5 h-5 text-primary-foreground" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{material.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {material.uploads} descargas
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
      </main>
    </div>
  );
};

export default TeacherDashboard;