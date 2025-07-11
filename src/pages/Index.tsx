import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Play,
  Award
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: BookOpen,
      title: "Cursos Interactivos",
      description: "Aprende con contenido dinámico y ejercicios prácticos"
    },
    {
      icon: Users,
      title: "Tutores Expertos",
      description: "Profesores calificados disponibles 24/7"
    },
    {
      icon: Award,
      title: "Certificaciones",
      description: "Obtén certificados reconocidos por la industria"
    }
  ];

  const subjects = [
    "Matemáticas", "Ciencias", "Historia", "Literatura", 
    "Programación", "Idiomas", "Arte", "Música"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6">
              <img src="/lovable-uploads/fecd3295-9f1c-4b04-8d04-0c874d41436e.png" alt="Logo" className="w-20 h-20 rounded-3xl" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Virtual Tutor{" "}
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Academy
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Descubre una nueva forma de aprender con tutores virtuales inteligentes, 
              cursos personalizados y seguimiento en tiempo real de tu progreso.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => navigate("/login")}
              >
                Comenzar Ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button size="lg" variant="outline" className="border-border">
                <Play className="mr-2 h-5 w-5" />
                Ver Demo
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              ¿Por qué elegir Virtual Tutor Academy?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nuestra plataforma combina tecnología avanzada con pedagogía moderna 
              para ofrecerte la mejor experiencia de aprendizaje.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-accent rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Materias Disponibles
            </h2>
            <p className="text-muted-foreground">
              Explora nuestra amplia gama de cursos y especialízate en lo que más te interesa
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {subjects.map((subject, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-lg p-4 text-center hover:shadow-md transition-shadow cursor-pointer"
              >
                <p className="font-medium text-foreground">{subject}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="border-border/50 bg-gradient-primary text-primary-foreground">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">
                ¿Listo para comenzar tu viaje de aprendizaje?
              </h2>
              <p className="text-primary-foreground/80 mb-6">
                Únete a miles de estudiantes que ya están transformando su educación
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate("/login")}
              >
                Crear Cuenta Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
              <span className="font-bold text-foreground">Virtual Tutor Academy</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Virtual Tutor Academy. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
