# Vayamp E-Commerce Application

A fully functional React Native e-commerce application with product browsing, filtering, sorting, and shopping cart management.

## Features

✅ **Product Browsing**
- Fetch products from FakeStore API
- Display products in grid layout
- Load product images with fallback

✅ **Sorting**
- Sort by Price (Low to High, High to Low)
- Sort by Rating (High to Low)
- Apply sorting with modal selection

✅ **Filtering**
- Filter products by category
- Multi-select category filters
- Clear all filters option

✅ **Shopping Bag**
- Add products to bag
- Increase/decrease quantity
- Remove items from bag
- View total items and grand total

✅ **Persistence**
- Redux Persist with AsyncStorage
- Shopping bag data persists after app close
- Automatic state hydration on app launch

## Tech Stack

- **React Native** - Cross-platform mobile framework
- **Redux Toolkit** - State management
- **Redux Persist** - State persistence
- **React Navigation** - Navigation library
- **Axios** - HTTP client
- **AsyncStorage** - Local storage
- **TypeScript** - Type safety

## API

- **Base URL**: https://fakestoreapi.com
- **Endpoints**:
  - `GET /products` - All products
  - `GET /products/categories` - All categories
  - `GET /products/category/:category` - Products by category

## Project Structure

```
src/
├── api/               # API services
├── redux/             # Redux store & slices
├── screens/           # Screen components
├── components/        # Reusable components
├── types/             # TypeScript types
├── utils/             # Helper functions
└── styles/            # Theme & colors
```

## Setup Instructions

### Prerequisites

- Node.js v16+
- Android Studio (for Android)

### Installation

```bash
# Navigate to project directory
cd VayampEcommerce

# Install dependencies
npm install

# Start development server
npm start
```

### Running on Emulator/Device

**Android:**
```bash
npm run android
```

### Building APK

```bash
# Generate keystore (one time)
cd android/app
keytool -genkey -v -keystore my-release-key.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
cd ../..

# Update android/app/build.gradle with signing config

# Build APK
npm run android:apk

# APK location: android/app/build/outputs/apk/release/app-release.apk
```

## Usage

1. **Launch App**: Opens to Products screen by default
2. **Browse Products**: Scroll through products in grid layout
3. **Sort Products**: Tap sort icon → select option → applies immediately
4. **Filter Products**: Tap filter icon → select categories → tap Apply
5. **Add to Bag**: Tap "Add" button on product card
6. **View Bag**: Tap Bag icon in tab bar
7. **Manage Items**: Increase/decrease quantity or remove items
8. **Persistence**: Close and reopen app → bag items still present

## Redux State Structure

```typescript
{
  bag: {
    items: [
      {
        id: number,
        productId: number,
        title: string,
        price: number,
        image: string,
        quantity: number,
      }
    ],
    totalItems: number,
    totalPrice: number,
  },
  filter: {
    selectedCategories: string[],
    sortBy: 'price-low' | 'price-high' | 'rating' | null,
  }
}
```

## Performance Optimizations

- Memoized selectors for Redux
- FlatList with keyExtractor for products
- Image lazy loading with fallback
- Debounced filter/sort operations
- Redux Persist for instant app load

## Future Enhancements

- [ ] Product detail screen
- [ ] Search functionality
- [ ] Wishlist feature
- [ ] User authentication
- [ ] Payment gateway integration
