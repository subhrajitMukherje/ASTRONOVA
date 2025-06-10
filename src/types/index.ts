export interface User {
  id: string;
  email: string;
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  coordinates?: {
    lat: number;
    lng: number;
    timezone: string;
  };
  profileImage?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  coordinates?: {
    lat: number;
    lng: number;
    timezone: string;
  };
}

export interface AstrologyReading {
  id: string;
  userId: string;
  type: 'sadsati' | 'mangalik' | 'kalsarpa' | 'general';
  title: string;
  content: string;
  recommendations: string[];
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  message: string;
  response: string;
  type: 'question' | 'reading';
  timestamp: string;
}

export interface BirthChart {
  lagnaChart: ChartData;
  navamsaChart: ChartData;
  planetPositions: PlanetPosition[];
}

export interface ChartData {
  houses: House[];
  planets: PlanetInHouse[];
}

export interface House {
  number: number;
  sign: string;
  lord: string;
  strength: number;
}

export interface PlanetPosition {
  planet: string;
  sign: string;
  degree: number;
  house: number;
  isRetrograde: boolean;
}

export interface PlanetInHouse {
  planet: string;
  house: number;
  sign: string;
  degree: number;
}

export interface AstrologyAnalysis {
  sadsati: {
    isActive: boolean;
    phase: 'starting' | 'peak' | 'ending' | 'not-active';
    startDate: string;
    endDate: string;
    effects: string[];
    remedies: string[];
  };
  mangalik: {
    isMangalik: boolean;
    severity: 'low' | 'medium' | 'high';
    affectedAreas: string[];
    remedies: string[];
  };
  kalsarpa: {
    hasKalsarpa: boolean;
    type: string;
    severity: 'partial' | 'complete';
    effects: string[];
    remedies: string[];
  };
}

export interface LocationData {
  latitude: number;
  longitude: number;
  timezone: string;
  place_name: string;
}