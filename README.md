# 🌾 AgriVerse AI

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)

AgriVerse AI is a comprehensive, AI-powered platform designed to empower farmers with modern technology. It provides tools for disease detection, weather forecasting, yield prediction, market prices, and much more, all in one unified ecosystem.

## ✨ Features

- 🦠 **Disease Detection**: AI-powered crop disease identification from images.
- 🌦️ **Weather Forecasts**: Hyper-local weather data and farming advisories.
- 📈 **Yield Prediction**: Machine learning-based crop yield estimations.
- 🏪 **Mandi Prices**: Real-time agricultural commodity prices.
- 🤖 **AI Assistant**: Multilingual virtual assistant for farmers.
- 🛒 **Marketplace**: Buy/sell produce and rent agricultural equipment.
- 📊 **Farm Analytics**: Insights into farm revenue, expenses, and soil health.
- 🏢 **Nearby Shops**: Find local fertilizer and equipment stores.
- 📜 **Government Schemes**: Browse and check eligibility for farming schemes.
- 🔔 **Notifications**: Real-time alerts and updates.
- 👤 **Farmer Profiles**: Manage farm details and personal information.

## 🛠️ Tech Stack

| Component | Technology |
|---|---|
| **Frontend** | React, TypeScript, Tailwind CSS |
| **Backend** | Node.js, Express, TypeScript |
| **Database** | PostgreSQL (planned) |
| **Cache** | Redis (planned) |
| **AI Integration** | Google Gemini API |
| **APIs** | OpenWeather, Google Maps |

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/agriverse-ai.git
cd agriverse-ai

# Install dependencies (assuming a root package.json exists to manage both, or run individually)
npm run install:all  

# Setup environment variables
cp backend/.env.example backend/.env
# Open backend/.env and add your API keys

# Start the development server
npm run dev
```

## 🔌 API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/disease/analyze` | POST | Analyze crop image for diseases |
| `/api/weather/:lat/:lon` | GET | Get local weather forecast |
| `/api/yield/predict` | POST | Predict crop yield |
| `/api/mandi/prices` | GET | Get current market prices |
| `/api/assistant/chat` | POST | Chat with AI assistant |
| `/api/shops/nearby` | GET | Find nearby agricultural shops |
| `/api/schemes` | GET | List government schemes |
| `/api/marketplace/equipment` | GET | List rentable equipment |
| `/api/analytics/summary` | GET | Get farm analytics summary |
| `/api/auth/login` | POST | User authentication |

## 📁 Project Structure

```
agriverse-ai/
├── backend/
│   ├── src/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── types/
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/ (planned)
└── README.md
```

## ⚙️ Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Backend server port (default: 5000) |
| `NODE_ENV` | Environment (development/production) |
| `GEMINI_API_KEY` | Google Gemini API Key |
| `OPENWEATHER_API_KEY` | OpenWeatherMap API Key |
| `GOOGLE_MAPS_API_KEY` | Google Maps API Key |
| `JWT_SECRET` | Secret key for JWT signing |

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License
[MIT](https://choosealicense.com/licenses/mit/)
