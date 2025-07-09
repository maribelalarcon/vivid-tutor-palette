import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  BookOpen, 
  Clock, 
  Star,
  TrendingUp,
  Calendar,
  MessageCircle,
  Bell
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

const ParentDashboard = () => {
  const { user } = useAuthStore();

  const childProgress = [
    { subject: "Geografía e Historia", progress: 75, grade: "B+", timeWeek: "4.5h" },
    { subject: "Matemáticas", progress: 60, grade: "B", timeWeek: "3.2h" },
    { subject: "Lengua Española", progress: 85, grade: "A-", timeWeek: "2.8h" },
  ];

  const recentActivity = [
    { action: "Completó test de Revolución Industrial", score: "85%", time: "2 horas" },
    { action: "Vio video de Geografía Europea", time: "1 día" },
    { action: "Jugó 'Conquista Europea'", score: "+150 XP", time: "2 días" },
  ];

  const notifications = [
    { message: "Nueva calificación en Historia", time: "3 horas" },
    { message: "Recordatorio: Examen próximo miércoles", time: "1 día" },
    { message: "Objetivo semanal completado", time: "2 días" },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-foreground">Panel de Padres</h1>
            <div className="text-sm text-muted-foreground">
              Bienvenido, {user?.name}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header del estudiante */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">María González</h2>
                <p className="text-muted-foreground">4º ESO • 15 años</p>
                <Badge variant="default" className="mt-1 bg-green-500">
                  Activa esta semana
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats generales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Promedio General</p>
                  <p className="text-2xl font-bold text-foreground">B+</p>
                </div>
                <Star className="w-8 h-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Horas Semanales</p>
                  <p className="text-2xl font-bold text-foreground">10.5h</p>
                </div>
                <Clock className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Materias Activas</p>
                  <p className="text-2xl font-bold text-foreground">3</p>
                </div>
                <BookOpen className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Progreso</p>
                  <p className="text-2xl font-bold text-foreground">73%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Progreso por materia */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Progreso por Materia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {childProgress.map((subject, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-foreground">{subject.subject}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{subject.grade}</Badge>
                      <span className="text-sm text-muted-foreground">{subject.timeWeek}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Progress value={subject.progress} className="flex-1" />
                    <span className="text-sm font-medium">{subject.progress}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Actividad reciente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Actividad Reciente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {activity.action}
                      </p>
                      {activity.score && (
                        <Badge variant="default" className="mt-1 bg-green-500 text-xs">
                          {activity.score}
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Hace {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Notificaciones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notificaciones
                </div>
                <Badge variant="outline">{notifications.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.map((notification, index) => (
                <div key={index} className="flex justify-between items-start p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-foreground flex-1">
                    {notification.message}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {notification.time}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Comunicación */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Comunicación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contactar Profesor
              </Button>
              <Button className="w-full" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Programar Reunión
              </Button>
              <Button className="w-full" variant="outline">
                <BookOpen className="w-4 h-4 mr-2" />
                Ver Informe Completo
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ParentDashboard;