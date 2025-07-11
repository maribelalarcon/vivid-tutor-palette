import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, GraduationCap, User, BookOpen, Users } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const demoAccounts = [
    {
      role: 'Estudiante',
      email: 'estudiante@demo.com',
      password: 'demo123',
      icon: User,
      description: 'Perfil completado - María González',
      bgColor: 'bg-primary'
    },
    {
      role: 'Estudiante Nuevo',
      email: 'nuevo@demo.com',
      password: 'demo123',
      icon: User,
      description: 'Requiere configuración - Carlos Ruiz',
      bgColor: 'bg-secondary'
    },
    {
      role: 'Profesor',
      email: 'profesor@demo.com',
      password: 'demo123',
      icon: BookOpen,
      description: 'Prof. Ana Martínez',
      bgColor: 'bg-accent'
    },
    {
      role: 'Padre/Madre',
      email: 'padre@demo.com',
      password: 'demo123',
      icon: Users,
      description: 'Juan Pérez',
      bgColor: 'bg-muted'
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "¡Bienvenido!",
          description: "Has iniciado sesión correctamente"
        });
        
        // Redirigir según el rol del usuario
        const user = useAuthStore.getState().user;
        if (user?.role === 'student' && user.isNewUser) {
          navigate('/profile-setup');
        } else if (user?.role === 'student') {
          navigate('/subjects');
        } else if (user?.role === 'teacher') {
          navigate('/teacher-dashboard');
        } else if (user?.role === 'parent') {
          navigate('/parent-dashboard');
        }
      } else {
        toast({
          title: "Error de acceso",
          description: "Credenciales incorrectas",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al iniciar sesión",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };


  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4">
            <img src="/lovable-uploads/fecd3295-9f1c-4b04-8d04-0c874d41436e.png" alt="Logo" className="w-16 h-16 rounded-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Virtual Tutor Academy</h1>
          <p className="text-muted-foreground">Accede a tu cuenta para continuar aprendiendo</p>
        </div>

        {/* Cuentas de demostración */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Cuentas de Demostración:</h3>
          <div className="grid grid-cols-1 gap-2">
            {demoAccounts.map((account, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="justify-start h-auto p-3 text-left"
                onClick={() => handleDemoLogin(account.email, account.password)}
              >
                <div className={`w-8 h-8 rounded-lg ${account.bgColor} flex items-center justify-center mr-3`}>
                  <account.icon className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{account.role}</div>
                  <div className="text-xs text-muted-foreground">{account.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Formulario de login */}
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-foreground">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Ingresa tus credenciales para acceder
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background border-border"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-background border-border pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? "Iniciando..." : "Iniciar Sesión"}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-3">
              <Button variant="ghost" className="text-sm text-muted-foreground hover:text-accent">
                ¿Olvidaste tu contraseña?
              </Button>
              
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm text-muted-foreground">¿No tienes cuenta?</span>
                <Button variant="ghost" className="text-sm text-accent hover:text-accent/80 p-0 h-auto">
                  Regístrate aquí
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Virtual Tutor Academy. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;