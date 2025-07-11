import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Users, 
  Award, 
  Clock, 
  TrendingUp,
  PlayCircle,
  Calendar,
  Star
} from "lucide-react";

const Dashboard = () => {
  const courses = [
    {
      id: 1,
      title: "Matemáticas Avanzadas",
      progress: 75,
      nextLesson: "Cálculo Diferencial",
      timeLeft: "45 min",
      instructor: "Prof. García"
    },
    {
      id: 2,
      title: "Programación Web",
      progress: 60,
      nextLesson: "React Hooks",
      timeLeft: "30 min",
      instructor: "Prof. Martínez"
    },
    {
      id: 3,
      title: "Historia Universal",
      progress: 90,
      nextLesson: "Revolución Industrial",
      timeLeft: "25 min",
      instructor: "Prof. López"
    }
  ];

  const recentAchievements = [
    { title: "Primer Examen Aprobado", icon: Award, color: "text-secondary" },
    { title: "Semana de Estudio Completa", icon: Calendar, color: "text-accent" },
    { title: "Top 10 del Mes", icon: Star, color: "text-primary" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
              <h1 className="text-xl font-bold text-foreground">TutorIA</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                Estudiante Premium
              </Badge>
              <div className="w-8 h-8 bg-gradient-accent rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bienvenida */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">¡Bienvenido de vuelta!</h2>
          <p className="text-muted-foreground">Continúa tu aprendizaje donde lo dejaste</p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Cursos Activos</p>
                  <p className="text-2xl font-bold text-primary">3</p>
                </div>
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Progreso Promedio</p>
                  <p className="text-2xl font-bold text-secondary">75%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Horas de Estudio</p>
                  <p className="text-2xl font-bold text-accent">42</p>
                </div>
                <Clock className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Logros</p>
                  <p className="text-2xl font-bold text-foreground">12</p>
                </div>
                <Award className="w-8 h-8 text-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cursos Activos */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Mis Cursos</CardTitle>
                <CardDescription>Continúa aprendiendo desde donde lo dejaste</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{course.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Próximo: {course.nextLesson}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {course.instructor}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {course.timeLeft}
                          </span>
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Progreso</span>
                            <span className="text-foreground font-medium">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <Button size="sm" className="ml-4 bg-primary hover:bg-primary/90">
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Continuar
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Logros Recientes */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Logros Recientes</CardTitle>
                <CardDescription>Tus últimos hitos académicos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                    <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
                    <span className="text-sm font-medium text-foreground">{achievement.title}</span>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  Ver Todos los Logros
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;