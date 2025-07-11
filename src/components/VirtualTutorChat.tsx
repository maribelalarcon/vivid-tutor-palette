import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { X, Bot, Sparkles } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

interface VirtualTutorChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const VirtualTutorChat = ({ isOpen, onClose }: VirtualTutorChatProps) => {
  const { user, trackActivity } = useAuthStore();
  
  const tutorName = user?.profile?.tutorPreferences?.characterDescription || "Tu Tutor Virtual";

  useEffect(() => {
    if (isOpen) {
      // Track activity when chat opens
      trackActivity({
        action: 'tutor_chat_opened',
        tutorType: tutorName,
        timestamp: new Date().toISOString()
      });

      // Clear any existing chat instance
      const container = document.getElementById('n8n-chat-container');
      if (container) {
        container.innerHTML = '';
      }

      // Initialize n8n chat with a slight delay to ensure container is ready
      setTimeout(() => {
        try {
          createChat({
            webhookUrl: 'https://jmog.app.n8n.cloud/webhook/e104e40e-6134-4825-a6f0-8a646d882662/chat',
            target: '#n8n-chat-container',
            mode: 'fullscreen',
            chatInputKey: 'message',
            chatSessionKey: 'sessionId',
            loadPreviousSession: false,
            showWelcomeScreen: false,
            initialMessages: [
              `¡Hola ${user?.name?.split(' ')[0] || 'estudiante'}! 👋`,
              `Soy ${tutorName}, tu tutor virtual personalizado. ¿En qué puedo ayudarte hoy?`
            ],
            i18n: {
              en: {
                title: tutorName,
                subtitle: 'Tu tutor virtual personalizado',
                footer: '',
                getStarted: '¡Empezar conversación!',
                inputPlaceholder: `Pregúntale algo a ${tutorName}...`,
                closeButtonTooltip: 'Cerrar chat',
              },
            },
          });
        } catch (error) {
          console.error('Error initializing n8n chat:', error);
        }
      }, 100);
    }
  }, [isOpen, user?.name, tutorName, trackActivity]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-2xl h-[90vh] sm:h-[85vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b max-h-[30vh] min-h-fit px-3 sm:px-6 py-2 sm:py-3">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
              <AvatarImage src={user?.profile?.avatar} />
              <AvatarFallback>
                <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base sm:text-lg">{tutorName}</CardTitle>
              <div className="flex items-center space-x-1 sm:space-x-2 mt-0.5 sm:mt-1">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground">En línea</span>
                <Badge variant="outline" className="text-xs px-1 sm:px-2">
                  <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                  <span className="hidden sm:inline">IA Personalizada</span>
                  <span className="sm:hidden">IA</span>
                </Badge>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 sm:h-10 sm:w-10">
            <X className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden p-0 min-h-[60vh]">
          <div id="n8n-chat-container" className="h-full w-full"></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VirtualTutorChat;