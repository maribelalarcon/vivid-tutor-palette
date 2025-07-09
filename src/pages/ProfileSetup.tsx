import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  GraduationCap, 
  User, 
  Heart, 
  Sparkles, 
  ChevronRight,
  Shuffle,
  Settings
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useToast } from "@/hooks/use-toast";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuthStore();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Estados del formulario
  const [avatar, setAvatar] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState(15);
  const [interests, setInterests] = useState<string[]>([]);
  const [tutorDescription, setTutorDescription] = useState('');
  const [personality, setPersonality] = useState<string[]>([]);
  const [preferredStyle, setPreferredStyle] = useState('');

  const availableInterests = [
    'Historia', 'Geografía', 'Arte', 'Música', 'Deportes', 'Ciencia',
    'Literatura', 'Tecnología', 'Naturaleza', 'Cine', 'Videojuegos', 'Cocina'
  ];

  const personalityTraits = [
    'Motivador', 'Paciente', 'Divertido', 'Estricto', 'Comprensivo',
    'Energético', 'Tranquilo', 'Creativo', 'Organizado', 'Amigable'
  ];

  const tutorExamples = [
    'Un explorador como Indiana Jones',
    'Una científica como Marie Curie',
    'Un superhéroe como Spider-Man',
    'Una princesa guerrera como Mulan',
    'Un detective como Sherlock Holmes',
    'Un futbolista famoso',
    'Un astronauta espacial',
    'Un chef profesional'
  ];

  const generateRandomAvatar = () => {
    const seeds = ['Maria', 'Carlos', 'Ana', 'Luis', 'Sofia', 'Diego', 'Emma', 'Alex'];
    const randomSeed = seeds[Math.floor(Math.random() * seeds.length)];
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`;
    setAvatar(avatarUrl);
  };

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const togglePersonality = (trait: string) => {
    setPersonality(prev => 
      prev.includes(trait) 
        ? prev.filter(p => p !== trait)
        : [...prev, trait]
    );
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsLoading(true);
    
    const profile = {
      avatar,
      personalInfo: {
        fullName,
        age,
        grade: '4º ESO',
        interests
      },
      tutorPreferences: {
        characterDescription: tutorDescription,
        personality,
        preferredStyle
      },
      completedSetup: true
    };

    updateProfile(profile);

    toast({
      title: "¡Perfil completado!",
      description: "Tu tutor virtual está listo para ayudarte"
    });

    setTimeout(() => {
      navigate('/subjects');
    }, 1500);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return fullName.trim() && avatar;
      case 2:
        return interests.length > 0;
      case 3:
        return tutorDescription.trim() && personality.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-4">
            <Settings className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Configuración de Perfil
          </h1>
          <p className="text-muted-foreground">
            Personaliza tu experiencia de aprendizaje
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div 
                  className={`w-12 h-1 mx-2 ${
                    step < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} 
                />
              )}
            </div>
          ))}
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-foreground">
              {currentStep === 1 && "Información Personal"}
              {currentStep === 2 && "Tus Intereses"}
              {currentStep === 3 && "Tu Tutor Virtual"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Cuéntanos sobre ti"}
              {currentStep === 2 && "¿Qué te gusta aprender?"}
              {currentStep === 3 && "Diseña tu tutor ideal"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Paso 1: Información Personal */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={avatar} alt="Avatar" />
                    <AvatarFallback>
                      <User className="w-12 h-12" />
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    onClick={generateRandomAvatar}
                    variant="outline"
                    size="sm"
                  >
                    <Shuffle className="w-4 h-4 mr-2" />
                    Generar Avatar
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Nombre completo</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="age">Edad</Label>
                    <Input
                      id="age"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(parseInt(e.target.value))}
                      min="13"
                      max="18"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Paso 2: Intereses */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Selecciona tus materias e intereses favoritos:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableInterests.map((interest) => (
                    <Badge
                      key={interest}
                      variant={interests.includes(interest) ? "default" : "outline"}
                      className="p-3 text-center cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Paso 3: Tutor Virtual */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="tutorDescription">
                    Describe tu tutor ideal
                  </Label>
                  <Textarea
                    id="tutorDescription"
                    value={tutorDescription}
                    onChange={(e) => setTutorDescription(e.target.value)}
                    placeholder="Ej: Un explorador aventurero como Lara Croft..."
                    rows={3}
                  />
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground mb-2">Ejemplos:</p>
                    <div className="flex flex-wrap gap-2">
                      {tutorExamples.slice(0, 4).map((example, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs cursor-pointer hover:bg-muted"
                          onClick={() => setTutorDescription(example)}
                        >
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Personalidad del tutor</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    ¿Cómo te gustaría que fuera?
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {personalityTraits.map((trait) => (
                      <Badge
                        key={trait}
                        variant={personality.includes(trait) ? "default" : "outline"}
                        className="p-2 text-center cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => togglePersonality(trait)}
                      >
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Botones */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Anterior
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!isStepValid() || isLoading}
                className="bg-primary hover:bg-primary/90"
              >
                {isLoading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />}
                {currentStep === 3 ? "Completar" : "Siguiente"}
                {currentStep < 3 && <ChevronRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSetup;