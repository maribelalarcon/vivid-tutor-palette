import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowRight, 
  Clock, 
  TrendingUp, 
  Star,
  Play,
  Settings,
  LogOut,
  Sparkles
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { subjects } from "@/lib/types";

const SubjectSelection = () => {
  const navigate = useNavigate();
  const { user, logout, trackActivity } = useAuthStore();
  const [hoveredSubject, setHoveredSubject] = useState<string | null>(null);

  const handleSubjectSelect = (subjectId: string) => {
    trackActivity({
      action: 'subject_selected',
      subjectId,
      timestamp: new Date().toISOString()
    });

    if (subjectId === 'geography-history') {
      navigate('/subject/geography-history');
    } else {
      // Para otras materias, mostrar mensaje de "próximamente"
      navigate('/coming-soon');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Virtual Tutor Academy</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {user?.profile && (
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.profile.avatar} alt="Avatar" />
                    <AvatarFallback>
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-foreground hidden sm:block">
                    {user.name}
                  </span>
                </div>
              )}
              
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bienvenida */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            ¡Hola {user?.name?.split(' ')[0]}! 👋
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            ¿Qué materia quieres estudiar hoy?
          </p>
          
          {user?.profile?.tutorPreferences && (
            <div className="bg-card/50 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-muted-foreground mb-2">
                Tu tutor virtual está listo:
              </p>
              <p className="text-sm font-medium text-foreground">
                {user.profile.tutorPreferences.characterDescription}
              </p>
            </div>
          )}
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-accent rounded-full mx-auto mb-3 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Progreso General</h3>
              <p className="text-2xl font-bold text-primary">75%</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-full mx-auto mb-3 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Tiempo de Estudio</h3>
              <p className="text-2xl font-bold text-secondary">2.5h</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-accent rounded-full mx-auto mb-3 flex items-center justify-center">
                <Star className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Puntuación</h3>
              <p className="text-2xl font-bold text-accent">850</p>
            </CardContent>
          </Card>
        </div>

        {/* Selección de materias */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Selecciona una Materia
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <Card
                key={subject.id}
                className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-border/50 ${
                  hoveredSubject === subject.id ? 'ring-2 ring-primary' : ''
                } ${!subject.isActive ? 'opacity-60' : ''}`}
                onMouseEnter={() => setHoveredSubject(subject.id)}
                onMouseLeave={() => setHoveredSubject(null)}
                onClick={() => handleSubjectSelect(subject.id)}
              >
                {/* Fondo animado */}
                <div className={`absolute inset-0 bg-gradient-to-br ${subject.color} opacity-10`} />
                
                <CardContent className="relative p-6 text-center">
                  {/* Icono animado */}
                  <div className={`text-6xl mb-4 transition-transform duration-300 ${
                    hoveredSubject === subject.id ? 'scale-110 animate-bounce' : ''
                  }`}>
                    {subject.icon}
                  </div>
                  
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    {subject.name}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {subject.description}
                  </p>
                  
                  {subject.isActive ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Badge variant="default" className="bg-primary">
                        ¡Disponible!
                      </Badge>
                      <Play className="w-4 h-4 text-primary" />
                    </div>
                  ) : (
                    <Badge variant="outline" className="opacity-60">
                      Próximamente
                    </Badge>
                  )}
                  
                  {/* Efecto hover */}
                  {hoveredSubject === subject.id && subject.isActive && (
                    <div className="absolute inset-0 bg-primary/5 rounded-lg animate-pulse" />
                  )}
                </CardContent>
                
                {/* Botón de acción */}
                {subject.isActive && (
                  <div className={`absolute bottom-4 right-4 transition-all duration-300 ${
                    hoveredSubject === subject.id ? 'scale-110' : 'scale-0'
                  }`}>
                    <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Mensaje motivacional */}
        <div className="text-center bg-card/50 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            ¡Sigue así! 🚀
          </h3>
          <p className="text-muted-foreground">
            Cada día que estudias te acercas más a tus objetivos. 
            Tu tutor virtual está aquí para ayudarte en cada paso.
          </p>
        </div>
      </main>
    </div>
  );
};

export default SubjectSelection;