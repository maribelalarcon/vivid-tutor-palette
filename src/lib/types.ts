// Tipos y datos de demostración para la aplicación educativa
export interface User {
  id: string;
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'parent';
  name: string;
  isNewUser?: boolean;
  profile?: StudentProfile;
}

export interface StudentProfile {
  avatar?: string;
  personalInfo: {
    fullName: string;
    age: number;
    course: string;
    email?: string;
    phone?: string;
    interests: string[];
  };
  tutorPreferences: {
    characterDescription: string;
    personality: string[];
    preferredStyle: string;
  };
  completedSetup: boolean;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  isActive: boolean;
}

// Datos de demostración
export const demoUsers: User[] = [
  {
    id: '1',
    email: 'estudiante@demo.com',
    password: 'demo123',
    role: 'student',
    name: 'María González',
    isNewUser: false,
    profile: {
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
      personalInfo: {
        fullName: 'María González Pérez',
        age: 15,
        course: '4º ESO',
        email: 'maria.gonzalez@ejemplo.com',
        interests: ['Historia', 'Arte', 'Música']
      },
      tutorPreferences: {
        characterDescription: 'Una exploradora aventurera como Lara Croft',
        personality: ['Motivador', 'Paciente', 'Divertido'],
        preferredStyle: 'Visual y dinámico'
      },
      completedSetup: true
    }
  },
  {
    id: '2',
    email: 'nuevo@demo.com',
    password: 'demo123',
    role: 'student',
    name: 'Carlos Ruiz',
    isNewUser: true
  },
  {
    id: '3',
    email: 'profesor@demo.com',
    password: 'demo123',
    role: 'teacher',
    name: 'Prof. Ana Martínez'
  },
  {
    id: '4',
    email: 'padre@demo.com',
    password: 'demo123',
    role: 'parent',
    name: 'Juan Pérez'
  }
];

export const subjects: Subject[] = [
  {
    id: 'geography-history',
    name: 'Geografía e Historia',
    icon: '🌍',
    color: 'from-amber-400 to-orange-500',
    description: 'Explora el mundo y descubre el pasado',
    isActive: true
  },
  {
    id: 'mathematics',
    name: 'Matemáticas',
    icon: '🔢',
    color: 'from-blue-400 to-blue-600',
    description: 'Resuelve problemas y descubre patrones',
    isActive: false
  },
  {
    id: 'spanish',
    name: 'Lengua Española',
    icon: '📚',
    color: 'from-green-400 to-green-600',
    description: 'Domina el arte de la comunicación',
    isActive: false
  },
  {
    id: 'science',
    name: 'Ciencias Naturales',
    icon: '🔬',
    color: 'from-purple-400 to-purple-600',
    description: 'Descubre los secretos de la naturaleza',
    isActive: false
  },
  {
    id: 'english',
    name: 'Inglés',
    icon: '🌐',
    color: 'from-red-400 to-red-600',
    description: 'Conecta con el mundo',
    isActive: false
  },
  {
    id: 'physical-education',
    name: 'Educación Física',
    icon: '⚽',
    color: 'from-cyan-400 to-cyan-600',
    description: 'Mantente activo y saludable',
    isActive: false
  }
];

// Webhook helper
export const sendToN8nWebhook = async (data: any, webhookUrl?: string) => {
  if (!webhookUrl) {
    console.log('No webhook URL configured, logging data:', data);
    return;
  }
  
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        source: 'virtual-tutor-academy'
      })
    });
  } catch (error) {
    console.error('Error sending to webhook:', error);
  }
};