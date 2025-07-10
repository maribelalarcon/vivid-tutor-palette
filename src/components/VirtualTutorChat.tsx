import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot,
  User,
  Sparkles,
  Heart
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface VirtualTutorChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const VirtualTutorChat = ({ isOpen, onClose }: VirtualTutorChatProps) => {
  const { user, trackActivity } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const tutorName = user?.profile?.tutorPreferences?.characterDescription || "Tu Tutor Virtual";
  const userInterests = user?.profile?.personalInfo?.interests || [];
  const tutorPersonality = user?.profile?.tutorPreferences?.personality || [];

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = generateWelcomeMessage();
      setMessages([{
        id: '1',
        content: welcomeMessage,
        role: 'assistant',
        timestamp: new Date()
      }]);
    }
  }, [isOpen]);

  const generateWelcomeMessage = () => {
    const interests = userInterests.join(', ');
    const personality = tutorPersonality.join(', ');
    
    return `¡Hola ${user?.name?.split(' ')[0]}! 👋 

Soy tu tutor virtual personalizado basado en: "${tutorName}". 

He visto que te interesa: ${interests || 'aprender cosas nuevas'}, y mi personalidad es ${personality || 'motivadora y paciente'}. 

¿En qué puedo ayudarte hoy? Puedes preguntarme sobre tus materias, dudas específicas, o simplemente conversar. ¡Estoy aquí para ti! ⚽📚✨`;
  };

  const generateTutorResponse = (userMessage: string): string => {
    // Esta es una simulación básica. Para funcionalidad completa, se necesitaría Supabase + API de IA
    const lowerMessage = userMessage.toLowerCase();
    
    // Respuestas basadas en intereses del usuario
    if (lowerMessage.includes('historia') || lowerMessage.includes('geografía')) {
      if (userInterests.includes('Deportes') || userInterests.includes('Fútbol')) {
        return `¡Excelente pregunta sobre historia! 🏆 Sabes, la historia es como un partido de fútbol épico que dura siglos. Cada civilización es como un equipo que entra al campo, algunas ganan títulos (como el Imperio Romano), otras luchan en divisiones menores, pero todas tienen su historia que contar. ¿Qué período específico te interesa? ¡Vamos a explorarlo juntos como si fuéramos exploradores en busca del gol perfecto! ⚽📜`;
      }
      return `¡Me encanta que preguntes sobre historia! 📚 Como ${tutorName}, te diré que la historia está llena de aventuras increíbles. Cada evento histórico es como una pieza de un gran rompecabezas. ¿Hay algún período o tema específico que te llame la atención?`;
    }
    
    if (lowerMessage.includes('matemática') || lowerMessage.includes('número')) {
      if (userInterests.includes('Deportes')) {
        return `¡Las matemáticas son como las estadísticas del fútbol! 📊⚽ Piensa en esto: cada gol, cada pase, cada partido tiene números detrás. Las probabilidades, los porcentajes de acierto, ¡incluso la geometría está en cada jugada! ¿Qué problema específico de matemáticas te está dando batalla?`;
      }
      return `Las matemáticas son fascinantes, como ${tutorName} te diría que cada problema es un enigma esperando ser resuelto. ¿En qué área específica necesitas ayuda?`;
    }
    
    if (lowerMessage.includes('hola') || lowerMessage.includes('saludo')) {
      return `¡Hola de nuevo! 😊 Como ${tutorName}, estoy aquí para apoyarte. ¿Hay algo específico en lo que te gustaría trabajar hoy? ¡Vamos a por ello!`;
    }
    
    if (lowerMessage.includes('ayuda') || lowerMessage.includes('no entiendo')) {
      return `¡Por supuesto que te ayudo! 💪 Recuerda que como ${tutorName}, siempre digo que no hay preguntas tontas, solo oportunidades para aprender. Cuéntame exactamente qué es lo que no entiendes y lo resolvemos paso a paso.`;
    }
    
    // Respuesta general personalizada
    return `Interesante lo que dices. Como ${tutorName}, creo que cada pregunta es una oportunidad de crecimiento. Basándome en tus intereses en ${userInterests.join(', ')}, podríamos enfocar esto de una manera que te resulte más familiar. ¿Podrías contarme más detalles sobre lo que necesitas?`;
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Track activity
    trackActivity({
      action: 'tutor_chat_message',
      message: input,
      tutorType: tutorName
    });

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateTutorResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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
          <div className="h-full flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      {message.role === 'user' ? (
                        <AvatarImage src={user?.profile?.avatar} />
                      ) : (
                        <AvatarFallback>
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      )}
                      <AvatarFallback>
                        {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className={`rounded-lg p-3 ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Pregúntale algo a ${tutorName}...`}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!input.trim() || isLoading}
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="mt-2 text-center">
                <p className="text-xs text-muted-foreground">
                  <Heart className="w-3 h-3 inline mr-1" />
                  Personalizado con tus intereses: {userInterests.join(', ') || 'Aprendizaje general'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VirtualTutorChat;