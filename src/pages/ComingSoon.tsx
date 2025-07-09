import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction, ArrowLeft, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="w-16 h-16 bg-gradient-accent rounded-full mx-auto mb-4 flex items-center justify-center">
            <Construction className="w-8 h-8 text-accent-foreground" />
          </div>
          <CardTitle className="text-2xl text-foreground">
            ¡Próximamente!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Esta materia estará disponible muy pronto. Mientras tanto, 
            puedes continuar con Geografía e Historia.
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Estimado: Próximas semanas</span>
          </div>
          
          <Button 
            onClick={() => navigate('/subjects')}
            className="w-full bg-primary hover:bg-primary/90"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Materias
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComingSoon;