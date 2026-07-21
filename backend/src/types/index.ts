export interface User {
  id: string;
  email: string;
  name: string;
  role: 'farmer' | 'admin' | 'seller';
  createdAt: Date;
}

export interface FarmerProfile {
  userId: string;
  location: {
    lat: number;
    lon: number;
    address: string;
  };
  farmSize: number; // in acres
  primaryCrops: string[];
  preferredLanguage: string;
}

export interface Crop {
  id: string;
  name: string;
  typicalYieldRange: { min: number; max: number; unit: string };
  growingSeason: string[];
}

export interface Disease {
  id: string;
  name: string;
  scientificName: string;
  symptoms: string[];
  treatment: string[];
  prevention: string[];
}

export interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    conditions: string;
    windSpeed: number;
  };
  forecast: any[];
}

export interface MandiPrice {
  commodity: string;
  mandi: string;
  price: number;
  unit: string;
  date: string;
  trend: 'up' | 'down' | 'stable';
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  category: string;
  deadline?: string;
}

export interface Equipment {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  pricePerDay: number;
  location: string;
  available: boolean;
}

export interface Produce {
  id: string;
  name: string;
  sellerId: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  quality: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'alert' | 'info' | 'success';
  read: boolean;
  createdAt: string;
}

export interface AnalyticsData {
  revenue: number;
  expenses: number;
  profit: number;
  efficiencyScore: number;
  trends: any[];
}
