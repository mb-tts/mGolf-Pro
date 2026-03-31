import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { SvgProps } from "react-native-svg";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "./src/providers/auth.provider";
import OutingDetailScreen from "./src/screens/club/detailOuting.tsx/outingDeatil";

// ─── Auth Screens ─────────────────────────────────────────────────────────────
import { SplashScreen } from "./src/screens/auth/splash";
import { OnboardingScreen } from "./src/screens/auth/onboarding";
import { LoginScreen } from "./src/screens/auth/login";
import { RegisterScreen } from "./src/screens/auth/register";
import { SetPasswordScreen } from "./src/screens/auth/set-password";

// ─── Main Screens ─────────────────────────────────────────────────────────────
import { HomeScreen } from "./src/screens/home";
import { HistoryScreen } from "./src/screens/history";
import { AccountScreen } from "./src/screens/account";
import { ClubScreen } from "./src/screens/club";
import { TournamentScreen } from "./src/screens/tournament";
import { CreateFlightScreen } from "./src/screens/home/create-flight";

// ─── Account Sub-Screens ──────────────────────────────────────────────────────
import { AccountInformationScreen } from "./src/screens/account/account-information";
import { AchievementsScreen } from "./src/screens/account/achievements";
import { GameSettingScreen } from "./src/screens/account/game-setting";
import { UISettingsScreen }  from "./src/screens/account/ui-setting";

// ─── Tab Icons ────────────────────────────────────────────────────────────────
// Đường dẫn từ root (App.tsx nằm cùng cấp với assets/)
import HomeIcon from "./assets/icons/tabbar/Home.svg";
import HomeActiveIcon from "./assets/icons/tabbar/Home2.svg";

import HistoryIcon from "./assets/icons/tabbar/history.svg";
import HistoryActiveIcon from "./assets/icons/tabbar/history2.svg";

import ClubIcon from "./assets/icons/tabbar/club.svg";
import ClubActiveIcon from "./assets/icons/tabbar/club2.svg";

import GolfCourseIcon from "./assets/icons/tabbar/golf-course.svg";
import GolfCourseActiveIcon from "./assets/icons/tabbar/golf-course2.svg";

import ProfileIcon from "./assets/icons/tabbar/profile-circle.svg";
import ProfileActiveIcon from "./assets/icons/tabbar/profile-circle2.svg";

// ─── Types ────────────────────────────────────────────────────────────────────
export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  SetPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  History: undefined;
  Club: undefined;
  Tournament: undefined;
  Account: undefined;
};

export type AppStackParamList = {
  MainTabs: undefined;
  AccountInformation: undefined;
  Achievements: undefined;
  GameSettings: undefined;
  UISettings: undefined;
  PaymentSettings: undefined;
  Equipment: undefined;
  NotificationSettings: undefined;
  Security: undefined;
  // Thêm các screen con khác ở đây khi cần
  OutingDetailScreen: { outingData: any };
  CreateFlight: undefined;
};

// ─── Tab Icons Map ────────────────────────────────────────────────────────────
// Đầy đủ 5 tab, đúng tên biến
const TAB_ICONS: Record<
  string,
  { active: React.FC<SvgProps>; inactive: React.FC<SvgProps> }
> = {
  Home: { active: HomeActiveIcon, inactive: HomeIcon },
  History: { active: HistoryActiveIcon, inactive: HistoryIcon },
  Club: { active: ClubActiveIcon, inactive: ClubIcon },
  Tournament: { active: GolfCourseActiveIcon, inactive: GolfCourseIcon },
  Account: { active: ProfileActiveIcon, inactive: ProfileIcon },
};

// ─── Auth Navigator ───────────────────────────────────────────────────────────
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator
    id="AuthStack"
    screenOptions={{ headerShown: false, animation: "default" }} // Để hệ điều hành tự chọn hiệu ứng chuyển màn native (Samsung khác, iPhone khác)
  >
    <AuthStack.Screen name="Splash" component={SplashScreen} />
    <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
    <AuthStack.Screen name="SetPassword" component={SetPasswordScreen} />
  </AuthStack.Navigator>
);

// ─── Main Tab Navigator ───────────────────────────────────────────────────────
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      id="MainTab"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#1565C0",
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: "#9E9E9E",
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingBottom: 8 + insets.bottom,
          paddingTop: 6,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#F0F0F0",
          elevation: 10,
        },
        tabBarIcon: ({ focused }) => {
          const icons = TAB_ICONS[route.name];
          if (!icons) return null;
          const Icon = focused ? icons.active : icons.inactive;
          return <Icon width={24} height={24} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: "Trang chủ" }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{ tabBarLabel: "Lịch sử" }}
      />
      <Tab.Screen
        name="Club"
        component={ClubScreen}
        options={{ tabBarLabel: "Câu lạc bộ" }}
      />
      <Tab.Screen
        name="Tournament"
        component={TournamentScreen}
        options={{ tabBarLabel: "Sân đấu" }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{ tabBarLabel: "Tài khoản" }}
      />
    </Tab.Navigator>
  );
};

// ─── App Stack Navigator (Bọc Tab lại) ────────────────────────────────────────
const AppStack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => (
  <AppStack.Navigator id="AppStack" screenOptions={{ headerShown: false }}>
    {/* Màn hình mặc định là cái Tab Navigator */}
    <AppStack.Screen name="MainTabs" component={MainNavigator} />

    {/* Các màn hình con khi bấm vào từ Account sẽ được push đè lên trên Tab */}
    <AppStack.Screen
      name="AccountInformation"
      component={AccountInformationScreen}
      options={{ animation: "slide_from_right" }}
    />

    <AppStack.Screen
      name="Achievements"
      component={AchievementsScreen}
      options={{ animation: "slide_from_right" }}
    />

    <AppStack.Screen
      name="GameSettings"
      component={GameSettingScreen}
      options={{ animation: "slide_from_right" }}
    />

    <AppStack.Screen 
    name="OutingDetailScreen" 
    component={OutingDetailScreen} 
    />

    <AppStack.Screen
      name="UISettings"
      component={UISettingsScreen}
      options={{ animation: "slide_from_right" }}
    />

    <AppStack.Screen
      name="CreateFlight"
      component={CreateFlightScreen}
      options={{ animation: "slide_from_bottom" }} // Hiệu ứng trồi lên từ dưới
    />
  </AppStack.Navigator>
);

// ─── Root Navigator ───────────────────────────────────────────────────────────
const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  console.log("--- RootNavigator: isAuthenticated =", isAuthenticated);

  if (isLoading) return null;

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

import { useFonts } from "expo-font";

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [fontsLoaded] = useFonts({
    "Meow Script": require("./assets/fonts/MeowScript-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <AuthProvider>
            <RootNavigator />
          </AuthProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
