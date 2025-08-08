# Mobile Setup Guide

This project now supports mobile development using Capacitor! You can build native iOS and Android apps from your web application.

## 🚀 What's Been Added

- **Capacitor Core & CLI**: For cross-platform mobile development
- **iOS Platform**: Native iOS app support
- **Android Platform**: Native Android app support
- **Static Export**: Next.js configured for static export
- **Mobile API Client**: Direct communication with Hono server
- **CORS Configuration**: Enabled for mobile app origins

## 📱 Mobile Features

### ✅ **Working Features**

- **Authentication**: Sign in/up works on mobile
- **Dashboard**: Full dashboard functionality
- **Challenges**: View and interact with coding challenges
- **Progress Tracking**: User progress and achievements
- **Class Management**: Teachers can manage classes
- **Responsive Design**: Optimized for mobile screens

### 🔧 **Technical Setup**

- **Static Export**: Next.js builds to static files
- **Hono Server**: Direct API communication
- **Better Auth**: Mobile-compatible authentication
- **CORS Enabled**: Supports mobile app origins

## 🛠️ Development Commands

### **Build for Mobile**

```bash
# Build the web app and sync with mobile platforms
bun run build:mobile
```

### **Capacitor Commands**

```bash
# Sync web assets to mobile platforms
bun run cap:sync

# Open iOS project in Xcode
bun run cap:open:ios

# Open Android project in Android Studio
bun run cap:open:android

# Run on iOS simulator
bun run cap:run:ios

# Run on Android emulator
bun run cap:run:android
```

## 📋 Prerequisites

### **For iOS Development**

- macOS (required for iOS development)
- Xcode (latest version recommended)
- CocoaPods (`sudo gem install cocoapods`)

### **For Android Development**

- Android Studio
- Android SDK
- Java Development Kit (JDK)

## 🚀 Quick Start

### **1. Build the Mobile App**

```bash
# Build and sync to mobile platforms
bun run build:mobile
```

### **2. Start the Backend Server**

```bash
# Start the Hono server (required for mobile)
bun run dev:server
```

### **3. Open in Mobile IDE**

```bash
# For iOS (requires Xcode)
bun run cap:open:ios

# For Android (requires Android Studio)
bun run cap:open:android
```

### **4. Run on Simulator/Emulator**

```bash
# iOS Simulator
bun run cap:run:ios

# Android Emulator
bun run cap:run:android
```

## 📁 Project Structure

```
coder/
├── android/                 # Android native project
├── ios/                    # iOS native project
├── out/                    # Static build output
├── src/
│   ├── lib/
│   │   ├── api-client.ts   # Mobile API client
│   │   └── auth-client.ts  # Mobile auth client
│   └── server/
│       └── index.ts        # Hono server with mobile CORS
└── capacitor.config.ts     # Capacitor configuration
```

## 🔧 Configuration

### **Capacitor Config** (`capacitor.config.ts`)

```typescript
{
  appId: 'com.coder.saas',
  appName: 'Coder - Learn to Code',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      // Custom splash screen configuration
    }
  }
}
```

### **Next.js Config** (`next.config.js`)

```javascript
{
  output: 'export',        // Static export for mobile
  trailingSlash: true,     // Required for static export
  images: {
    unoptimized: true      // Required for static export
  }
}
```

## 🌐 API Communication

### **Mobile API Client** (`src/lib/api-client.ts`)

- Direct communication with Hono server
- Supports both development and production URLs
- Handles authentication and data fetching

### **CORS Configuration**

```typescript
app.use(
  "/*",
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3002",
      "capacitor://localhost",
      "ionic://localhost",
    ],
    credentials: true,
  })
);
```

## 📱 Mobile-Specific Features

### **Authentication Flow**

1. User opens mobile app
2. App checks authentication status via Hono server
3. If not authenticated, redirects to sign-in
4. After sign-in, user can access dashboard

### **API Endpoints**

- `GET /auth/session` - Check authentication status
- `POST /auth/signin` - Sign in user
- `GET /challenges` - Get coding challenges
- `POST /challenges/:id/submit` - Submit solution
- `GET /classes` - Get user's classes
- `GET /user/progress` - Get user progress

## 🔄 Development Workflow

### **1. Web Development**

```bash
# Start web development server
bun run dev
```

### **2. Mobile Development**

```bash
# Build for mobile
bun run build:mobile

# Start backend server
bun run dev:server

# Open in mobile IDE
bun run cap:open:ios
# or
bun run cap:open:android
```

### **3. Testing**

```bash
# Run on iOS simulator
bun run cap:run:ios

# Run on Android emulator
bun run cap:run:android
```

## 🚀 Production Deployment

### **Backend Server**

Deploy the Hono server to your production environment:

```bash
# Build the server
bun run build

# Deploy to your hosting platform
# (Vercel, Railway, Heroku, etc.)
```

### **Mobile Apps**

1. Update `capacitor.config.ts` with production API URL
2. Build the mobile apps
3. Submit to App Store/Google Play

## 🐛 Troubleshooting

### **Common Issues**

**1. Build Errors**

```bash
# Clean and rebuild
rm -rf out android ios
bun run build:mobile
```

**2. iOS Build Issues**

- Ensure Xcode is installed
- Install CocoaPods: `sudo gem install cocoapods`
- Run: `cd ios && pod install`

**3. Android Build Issues**

- Ensure Android Studio is installed
- Set up Android SDK
- Configure environment variables

**4. API Connection Issues**

- Ensure Hono server is running: `bun run dev:server`
- Check CORS configuration
- Verify API endpoints

### **Debug Commands**

```bash
# Check Capacitor status
bunx cap doctor

# Sync web assets
bunx cap sync

# List installed plugins
bunx cap list
```

## 📚 Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Next.js Static Export](https://nextjs.org/docs/advanced-features/static-html-export)
- [Hono Documentation](https://hono.dev/)
- [Better Auth Documentation](https://www.better-auth.com/)

## 🎉 Success!

Your Coder SAAS app is now mobile-ready! You can:

- ✅ Build native iOS and Android apps
- ✅ Use the same codebase for web and mobile
- ✅ Access all features on mobile devices
- ✅ Deploy to app stores

The mobile apps will have the same functionality as the web app, including authentication, coding challenges, progress tracking, and class management!
