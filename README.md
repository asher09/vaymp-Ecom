# Setup and Run Instructions

## Prerequisites
- Node.js (v18+)
- Android Studio with Android SDK configured (for Android emulator/dev builds)
- Xcode (macOS only, for iOS simulator/dev builds)

## Setup
1. Clone the repository and navigate to the project directory:
   ```bash
   cd VayampEcommerce
   ```
2. Install the package dependencies:
   ```bash
   npm install
   ```
3. (iOS Only) Install CocoaPods:
   ```bash
   npm run pod:install
   ```

## Running the App

### 1. Start the Metro Bundler
Start the Expo development server:
```bash
npm start
```

### 2. Launch on Your Platform
Once the server is running, you can launch the app by choosing one of these options:
- **Android**: Press `a` in the terminal, or run:
  ```bash
  npm run android
  ```
- **iOS**: Press `i` in the terminal, or run:
  ```bash
  npm run ios
  ```
- **Web**: Press `w` in the terminal, or run:
  ```bash
  npx expo start --web
  ```
