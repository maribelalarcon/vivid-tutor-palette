import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { X, Bot, Sparkles } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
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

      // Initialize n8n chat
      createChat({
        webhookUrl: 'https://jmog.app.n8n.cloud/webhook/e104e40e-6134-4825-a6f0-8a646d882662/chat',
        target: '#n8n-chat-container',
        mode: 'window',
        chatInputKey: 'message',
        chatSessionKey: 'sessionId',
        metadata: {
          userId: user?.id,
          tutorType: tutorName
        },
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
    }
  }, [isOpen, user?.id, tutorName, trackActivity]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.profile?.avatar} />
              <AvatarFallback>
                <Bot className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{tutorName}</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground">En línea</span>
                <Badge variant="outline" className="text-xs">
                  <Sparkles className="w-3 h-3 mr-1" />
                  IA Personalizada
                </Badge>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden p-0">
          <div id="n8n-chat-container" className="h-full w-full"></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VirtualTutorChat;