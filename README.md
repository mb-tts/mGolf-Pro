# mGolf-Pro

## Tổng hợp yêu cầu & chỉnh sửa

### 1. Yêu cầu ban đầu

- Expo 54 (bare-minimum) + TypeScript
- React Navigation, Context API
- react-hook-form + zod
- react-native-mmkv
- gorhom bottom sheet, reanimated
- Repo private, có người quản lý merge
- Branch: `feat/*`, `fix/*`, `update/*`
- Có người chia task
- Dùng mock data để build UI trước

---

### 2. Đã sửa / tối ưu ✅

#### ✅ Chuẩn hoá import path (alias + tsconfig + babel)

- Thêm alias `@/` → `src/` và `@assets/` → `assets/` trong `tsconfig.json` + `babel.config.js`
- Toàn bộ imports đã chuyển từ relative (`../../`) sang alias (`@/`, `@assets/`)
- Plugin `babel-plugin-module-resolver` đã cấu hình

#### ✅ Dùng MMKV cho storage

- `src/store/auth.store.ts` đã chuyển từ **AsyncStorage** sang **MMKV v4** (`createMMKV`)
- Tất cả operations giờ là **synchronous** (nhanh hơn ~30x)
- `AuthProvider` đã cập nhật để dùng MMKV sync APIs

#### ✅ Phân biệt FlatList vs ScrollView

- **FlatList** → dữ liệu động (search filtering, API data): `HistoryScreen`, `TournamentScreen`, trận đấu trong `HomeScreen`
- **ScrollView** + `.map()` → dữ liệu ít, cố định: `AccountScreen` menu, `ClubIndexScreen`, thành tích `HomeScreen`

#### ✅ Tận dụng type có sẵn của thư viện

- Dùng `type` imports cho type-only imports (`import type { ... }`)
- Dùng `SvgProps` từ `react-native-svg` cho tab icons
- `TAB_ICONS` type-safe với `keyof MainTabParamList` thay vì `string`
- Menu items type-safe với `keyof AppStackParamList`

#### ✅ Custom hook navigation để giảm generic

- Tạo `src/hooks/useNavigation.ts` với:
  - `useAppNavigation()` — cho App Stack
  - `useAuthNavigation()` — cho Auth Stack
  - `useTabNavigation()` — cho Bottom Tab
  - `useAppRoute<T>()` và `useAuthRoute<T>()` cho typed route params
- Tách navigation types vào `src/types/navigation.types.ts`

---

### 3. Cấu trúc thư mục

```
src/
├── components/
│   ├── account/
│   ├── auth/
│   ├── button/
│   ├── common/
│   └── home/
├── constants/
│   ├── colors.ts
│   └── mock-data.ts
├── hooks/
│   └── useNavigation.ts      ← NEW
├── providers/
│   └── auth.provider.tsx
├── screens/
│   ├── account/
│   ├── auth/
│   ├── club/
│   ├── history/
│   ├── home/
│   └── tournament/
├── store/
│   └── auth.store.ts         ← MMKV
└── types/
    ├── auth.types.ts
    ├── mock-data.ts
    └── navigation.types.ts   ← NEW
```

taskkill /F /IM java.exe; taskkill /F /IM adb.exe; Remove-Item -Recurse -Force android/app/build, android/build -ErrorAction SilentlyContinue; npm run android
