import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Webhook, 
  Save, 
  TestTube,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useToast } from "@/hooks/use-toast";

const WebhookSettings = () => {
  const { webhookUrl, setWebhookUrl } = useAuthStore();
  const { toast } = useToast();
  const [tempUrl, setTempUrl] = useState(webhookUrl);
  const [isTesting, setIsTesting] = useState(false);

  const handleSave = () => {
    setWebhookUrl(tempUrl);
    toast({
      title: "Configuración guardada",
      description: "La URL del webhook se ha actualizado correctamente"
    });
  };

  const handleTest = async () => {
    if (!tempUrl) {
      toast({
        title: "Error",
        description: "Por favor ingresa una URL válida",
        variant: "destructive"
      });
      return;
    }

    setIsTesting(true);
    
    try {
      await fetch(tempUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          event: 'webhook_test',
          timestamp: new Date().toISOString(),
          source: 'virtual-tutor-academy',
          message: 'Prueba de conexión del webhook'
        })
      });

      toast({
        title: "Prueba enviada",
        description: "Se ha enviado una prueba al webhook. Verifica tu flujo n8n.",
      });
    } catch (error) {
      toast({
        title: "Error en la prueba",
        description: "No se pudo conectar con el webhook",
        variant: "destructive"
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Settings className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl text-foreground">
                Configuración de Webhook
              </CardTitle>
              <p className="text-muted-foreground">
                Conecta con tu flujo n8n para recibir datos de la aplicación
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Información del webhook */}
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Webhook className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  ¿Qué datos se envían?
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Inicios de sesión de usuarios</li>
                  <li>• Actividad de estudiantes (tests, juegos, vídeos)</li>
                  <li>• Actualizaciones de perfiles</li>
                  <li>• Progreso en materias</li>
                  <li>• Tiempo de estudio</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Configuración de URL */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="webhook-url">URL del Webhook n8n</Label>
              <Input
                id="webhook-url"
                placeholder="https://tu-instancia.app.n8n.cloud/webhook/..."
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Copia la URL del webhook desde tu flujo n8n
              </p>
            </div>

            {/* Estado actual */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Estado:</span>
              {webhookUrl ? (
                <Badge variant="default" className="bg-green-500">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Configurado
                </Badge>
              ) : (
                <Badge variant="outline">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Sin configurar
                </Badge>
              )}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex space-x-3">
            <Button 
              onClick={handleSave}
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={tempUrl === webhookUrl}
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar Configuración
            </Button>
            
            <Button 
              onClick={handleTest}
              variant="outline"
              disabled={!tempUrl || isTesting}
            >
              {isTesting ? (
                <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <TestTube className="w-4 h-4 mr-2" />
              )}
              Probar Webhook
            </Button>
          </div>

          {/* Ejemplo de payload */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">
              Ejemplo de datos enviados:
            </h4>
            <pre className="text-xs bg-muted rounded p-3 overflow-x-auto">
{`{
  "event": "student_activity",
  "userId": "1",
  "activity": {
    "action": "test_completed",
    "subjectId": "geography-history",
    "score": 85
  },
  "timestamp": "2024-11-20T10:30:00.000Z",
  "source": "virtual-tutor-academy"
}`}
            </pre>
          </div>

          {/* Instrucciones */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">
              Instrucciones para n8n:
            </h4>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. Crea un nuevo flujo en n8n</li>
              <li>2. Añade un nodo "Webhook" como trigger</li>
              <li>3. Copia la URL del webhook generada</li>
              <li>4. Pégala en el campo de arriba</li>
              <li>5. Configura las acciones que quieres realizar con los datos</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebhookSettings;