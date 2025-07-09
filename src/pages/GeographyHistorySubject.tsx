import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft,
  BookOpen,
  FileText,
  CheckCircle,
  Brain,
  Gamepad2,
  Play,
  Download,
  Star,
  Trophy,
  Timer,
  Target,
  Zap,
  Users,
  Calendar,
  MapPin
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

const GeographyHistorySubject = () => {
  const navigate = useNavigate();
  const { user, trackActivity } = useAuthStore();
  const [activeTab, setActiveTab] = useState("material");

  const subjectProgress = 65;
  const weeklyProgress = 85;

  const materials = [
    {
      id: 1,
      title: "La Revolución Industrial",
      type: "PDF",
      size: "2.5 MB",
      uploadedBy: "Prof. Ana Martínez",
      date: "15 Nov 2024",
      completed: true
    },
    {
      id: 2,
      title: "Atlas de Europa Siglo XIX",
      type: "PDF",
      size: "8.1 MB",
      uploadedBy: "Prof. Ana Martínez", 
      date: "12 Nov 2024",
      completed: false
    },
    {
      id: 3,
      title: "Causas de la Primera Guerra Mundial",
      type: "DOCX",
      size: "1.2 MB",
      uploadedBy: "Prof. Ana Martínez",
      date: "10 Nov 2024", 
      completed: true
    }
  ];

  const tests = [
    {
      id: 1,
      title: "Revolución Industrial",
      questions: 15,
      timeLimit: "20 min",
      difficulty: "Intermedio",
      score: 85,
      completed: true,
      attempts: 2
    },
    {
      id: 2,
      title: "Geografía de Europa",
      questions: 20,
      timeLimit: "25 min", 
      difficulty: "Fácil",
      score: null,
      completed: false,
      attempts: 0
    },
    {
      id: 3,
      title: "Primera Guerra Mundial",
      questions: 25,
      timeLimit: "30 min",
      difficulty: "Difícil",
      score: null,
      completed: false,
      attempts: 0
    }
  ];

  const selfAssessments = [
    {
      id: 1,
      title: "Autoevaluación: Conceptos Básicos",
      description: "Evalúa tu comprensión de los conceptos fundamentales",
      icon: Brain,
      color: "text-blue-500",
      completed: true,
      score: 78
    },
    {
      id: 2,
      title: "Reflexión: Impacto Social",
      description: "Analiza el impacto social de los eventos históricos",
      icon: Users,
      color: "text-green-500",
      completed: false,
      score: null
    },
    {
      id: 3,
      title: "Cronología Personal",
      description: "Crea tu propia línea de tiempo de eventos",
      icon: Calendar,
      color: "text-purple-500",
      completed: false,
      score: null
    }
  ];

  const games = [
    {
      id: 1,
      title: "Conquista Europea",
      description: "Estrategia histórica por turnos",
      icon: "🏰",
      difficulty: "Intermedio",
      players: "1-4",
      timeToComplete: "15-30 min",
      xpReward: 150,
      unlocked: true
    },
    {
      id: 2,
      title: "Quiz Geográfico",
      description: "Identifica países, capitales y relieves",
      icon: "🌍", 
      difficulty: "Fácil",
      players: "1",
      timeToComplete: "10-15 min",
      xpReward: 100,
      unlocked: true
    },
    {
      id: 3,
      title: "Máquina del Tiempo",
      description: "Viaja a través de diferentes épocas",
      icon: "⏰",
      difficulty: "Difícil",
      players: "1",
      timeToComplete: "20-40 min",
      xpReward: 200,
      unlocked: false
    }
  ];

  const videos = [
    {
      id: 1,
      title: "La Revolución Industrial Explicada",
      duration: "12:45",
      instructor: "Prof. Ana Martínez",
      thumbnail: "/api/placeholder/320/180",
      completed: true,
      quality: "HD"
    },
    {
      id: 2,
      title: "Geografía de Europa - Recorrido Virtual",
      duration: "18:30",
      instructor: "Prof. Ana Martínez", 
      thumbnail: "/api/placeholder/320/180",
      completed: false,
      quality: "4K"
    },
    {
      id: 3,
      title: "Primera Guerra Mundial - Documental",
      duration: "25:15",
      instructor: "Historia en Vivo",
      thumbnail: "/api/placeholder/320/180",
      completed: false,
      quality: "HD"
    }
  ];

  const handleActivityClick = (activityType: string, activityId: string | number) => {
    trackActivity({
      action: 'activity_started',
      subjectId: 'geography-history',
      activityType,
      activityId,
      timestamp: new Date().toISOString()
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'text-green-500 bg-green-100';
      case 'Intermedio': return 'text-yellow-500 bg-yellow-100';
      case 'Difícil': return 'text-red-500 bg-red-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/subjects')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
              <div className="text-2xl">🌍</div>
              <h1 className="text-xl font-bold text-foreground">Geografía e Historia</h1>
            </div>
            
            {user?.profile && (
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.profile.avatar} alt="Avatar" />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground hidden sm:block">
                  {user.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Progreso General</h3>
                <Trophy className="w-5 h-5 text-amber-500" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Completado</span>
                  <span className="font-medium">{subjectProgress}%</span>
                </div>
                <Progress value={subjectProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Esta Semana</h3>
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Objetivos</span>
                  <span className="font-medium">{weeklyProgress}%</span>
                </div>
                <Progress value={weeklyProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Puntuación</h3>
                <Star className="w-5 h-5 text-accent" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">1,250</div>
                <div className="text-sm text-muted-foreground">XP Total</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="material" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Material</span>
            </TabsTrigger>
            <TabsTrigger value="tests" className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Tests</span>
            </TabsTrigger>
            <TabsTrigger value="self-assessment" className="flex items-center space-x-2">
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">Autoevaluación</span>
            </TabsTrigger>
            <TabsTrigger value="games" className="flex items-center space-x-2">
              <Gamepad2 className="w-4 h-4" />
              <span className="hidden sm:inline">Juegos</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center space-x-2">
              <Play className="w-4 h-4" />
              <span className="hidden sm:inline">Vídeos</span>
            </TabsTrigger>
          </TabsList>

          {/* Material de Lectura */}
          <TabsContent value="material" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-foreground">Material de Lectura</h3>
              <Badge variant="outline">{materials.length} documentos</Badge>
            </div>
            
            <div className="grid gap-4">
              {materials.map((material) => (
                <Card key={material.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-accent-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{material.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {material.uploadedBy} • {material.date} • {material.size}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {material.completed && (
                          <Badge variant="default" className="bg-green-500">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Leído
                          </Badge>
                        )}
                        <Button 
                          size="sm"
                          onClick={() => handleActivityClick('material', material.id)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Descargar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tests */}
          <TabsContent value="tests" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-foreground">Tests de Evaluación</h3>
              <Badge variant="outline">{tests.length} disponibles</Badge>
            </div>
            
            <div className="grid gap-4">
              {tests.map((test) => (
                <Card key={test.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{test.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Target className="w-3 h-3 mr-1" />
                              {test.questions} preguntas
                            </span>
                            <span className="flex items-center">
                              <Timer className="w-3 h-3 mr-1" />
                              {test.timeLimit}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Badge className={getDifficultyColor(test.difficulty)}>
                          {test.difficulty}
                        </Badge>
                        {test.completed ? (
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">{test.score}%</div>
                            <div className="text-xs text-muted-foreground">{test.attempts} intentos</div>
                          </div>
                        ) : (
                          <Button 
                            onClick={() => handleActivityClick('test', test.id)}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Comenzar
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Autoevaluación */}
          <TabsContent value="self-assessment" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-foreground">Autoevaluación</h3>
              <Badge variant="outline">{selfAssessments.length} actividades</Badge>
            </div>
            
            <div className="grid gap-4">
              {selfAssessments.map((assessment) => (
                <Card key={assessment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center`}>
                          <assessment.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{assessment.title}</h4>
                          <p className="text-sm text-muted-foreground">{assessment.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {assessment.completed ? (
                          <div className="text-right">
                            <Badge variant="default" className="bg-green-500 mb-1">
                              Completado
                            </Badge>
                            <div className="text-sm font-medium text-foreground">{assessment.score}%</div>
                          </div>
                        ) : (
                          <Button 
                            variant="outline"
                            onClick={() => handleActivityClick('self-assessment', assessment.id)}
                          >
                            <Brain className="w-4 h-4 mr-2" />
                            Comenzar
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Juegos */}
          <TabsContent value="games" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-foreground">Juegos Educativos</h3>
              <Badge variant="outline">{games.filter(g => g.unlocked).length} disponibles</Badge>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {games.map((game) => (
                <Card 
                  key={game.id} 
                  className={`hover:shadow-lg transition-all duration-300 ${
                    !game.unlocked ? 'opacity-60' : 'hover:scale-105'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{game.icon}</div>
                      <h4 className="text-xl font-bold text-foreground">{game.title}</h4>
                      <p className="text-sm text-muted-foreground">{game.description}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Dificultad:</span>
                        <Badge className={getDifficultyColor(game.difficulty)}>
                          {game.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Jugadores:</span>
                        <span className="font-medium">{game.players}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Duración:</span>
                        <span className="font-medium">{game.timeToComplete}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Recompensa:</span>
                        <span className="font-medium text-amber-600">+{game.xpReward} XP</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-4"
                      disabled={!game.unlocked}
                      onClick={() => handleActivityClick('game', game.id)}
                    >
                      {game.unlocked ? (
                        <>
                          <Gamepad2 className="w-4 h-4 mr-2" />
                          Jugar Ahora
                        </>
                      ) : (
                        "🔒 Bloqueado"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Vídeos */}
          <TabsContent value="videos" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-foreground">Vídeos Educativos</h3>
              <Badge variant="outline">{videos.length} vídeos</Badge>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Card key={video.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <Play className="w-12 h-12 text-gray-500" />
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-black/70 text-white">
                        {video.quality}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="secondary" className="bg-black/70 text-white">
                        {video.duration}
                      </Badge>
                    </div>
                    {video.completed && (
                      <div className="absolute top-2 left-2">
                        <Badge variant="default" className="bg-green-500">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Visto
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {video.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {video.instructor}
                    </p>
                    <Button 
                      className="w-full"
                      onClick={() => handleActivityClick('video', video.id)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {video.completed ? 'Ver de nuevo' : 'Reproducir'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default GeographyHistorySubject;