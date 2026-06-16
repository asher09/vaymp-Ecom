# Vayamp E-Commerce Application

A fully functional cross-platform React Native e-commerce application built with TypeScript, Redux Toolkit for state management, Redux Persist for local storage hydration, and React Navigation.

---

## 📱 Features

### 🛒 Product Browsing & Layout
- **FakeStore API Integration**: Dynamically fetches products and categories with a configured timeout.
- **2-Column Responsive Grid**: Beautiful cards displaying high-res product images, loading states, descriptions, rating indicators, and prices.
- **Pull-To-Refresh**: Smooth gesture reloading on products and shopping bag screens.
- **Image Fallbacks**: Displays a fallback icon if a remote product image fails to load.

### 🔍 Filtering & Sorting Modals
- **Multi-Select Categories**: Fetch categories dynamically from the API and filter products using an interactive checklist.
- **Three Sorting Modes**:
  - Price: Low to High
  - Price: High to Low
  - Rating: High to Low
- **Clear All Options**: Instantly clear sorting and category filters.

### 🛍️ Shopping Bag & Persistent State
- **Add-To-Bag**: Instantly add items to the cart. If a product is already in the bag, the quantity increments automatically.
- **Quantity Controls**: Adjust item quantities (+/-) directly in the bag. Reducing the quantity to 0 removes the item.
- **Calculated Totals**: Real-time updates for total items and grand total price (in ₹).
- **Redux Persist**: Cart items automatically persist to `AsyncStorage`, remaining intact even after closing and reopening the app.

---

## 🛠️ Technology Stack

- **Framework**: [React Native](https://reactnative.dev/) (v0.86.0)
- **Language**: [TypeScript](https://www.typescriptlang.org/) for robust type safety
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) (Slices, Actions)
- **Local Persistence**: [Redux Persist](https://github.com/rt2zz/redux-persist) with [@react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage)
- **Navigation**: [React Navigation](https://reactnavigation.org/) (Bottom Tab & Native Stack)
- **API Client**: [Axios](https://github.com/axios/axios) with default configuration settings
- **Icons**: [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons) (MaterialCommunityIcons)

---

## 📁 Directory Structure

```
VayampEcommerce/
├── src/
│   ├── api/                 # API service layer (productApi.ts)
│   ├── redux/               # Store setup and reducer slices
│   │   ├── store.ts
│   │   └── slices/          # Slices (bagSlice.ts, filterSlice.ts)
│   ├── screens/             # Screen components
│   │   ├── ProductsScreen.tsx
│   │   ├── BagScreen.tsx
│   │   └── modals/          # Overlays (SortModal.tsx, FilterModal.tsx)
│   ├── components/          # Reusable UI parts (Header, ProductCard, BagItem, EmptyBag)
│   ├── types/               # TypeScript declarations & typings
│   ├── utils/               # Storage utilities, helper functions, and constants
│   └── styles/              # Layout theme colors
├── App.tsx                  # Root entry rendering Provider wrappers
└── package.json             # NPM dependencies & build scripts
```

---

## 🚀 Installation & Running

### Prerequisites
- Node.js (v18+)
- Android Studio with Android SDK configured (for Android emulator/builds)
- Xcode (macOS only, for iOS simulator/builds)

### Setup
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

### Running the App
Start the Metro bundler server:
```bash
npm start
```

In a separate terminal, launch the application:
- **Android Emulator / Device**:
  ```bash
  npm run android
  ```
- **iOS Simulator**:
  ```bash
  npm run ios
  ```

---

## 📦 Building for Production (Android APK)

We have configured convenient Gradle scripts for release builds.

1. Generate a signing release keystore (one-time setup under `android/app` directory):
   ```bash
   cd android/app
   keytool -genkey -v -keystore my-release-key.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
   ```
2. Configure credentials in `android/app/build.gradle` inside the `signingConfigs` block.
3. Build the release APK:
   ```bash
   npm run android:build
   ```
   The generated APK will be outputted to: `android/app/build/outputs/apk/release/app-release.apk`.
