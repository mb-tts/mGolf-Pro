import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text } from "react-native";
import { AuthProvider, useAuth } from "./src/providers/auth.provider";

// Auth Screens
import { SplashScreen } from "./src/screens/auth/splash";
import { OnboardingScreen } from "./src/screens/auth/onboarding";
import { LoginScreen } from "./src/screens/auth/login";
import { RegisterScreen } from "./src/screens/auth/register";
import { SetPasswordScreen } from "./src/screens/auth/set-password";

// Main Screens
import { HomeScreen } from "./src/screens/home";
import { HistoryScreen } from "./src/screens/history";
import { AccountScreen } from "./src/screens/account";
import { ClubScreen } from "./src/screens/club";
import { TournamentScreen } from "./src/screens/tournament";

// ─── Types ───────────────────────────────────────────────────────────────────
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

// ─── Tab Icons ───────────────────────────────────────────────────────────────
const TAB_ICONS: Record<string, { active: string; inactive: string }> = {
  Home: { active: "🏠", inactive: "🏠" },
  History: { active: "🕐", inactive: "🕐" },
  Club: { active: "🛡️", inactive: "🛡️" },
  Tournament: { active: "⛳", inactive: "⛳" },
  Account: { active: "👤", inactive: "👤" },
};

// ─── Auth Navigator ───────────────────────────────────────────────────────────
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator
    id="AuthStack"
    screenOptions={{ headerShown: false, animation: "fade" }}
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

const MainNavigator = () => (
  <Tab.Navigator
    id="MainTab"
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: true,
      tabBarActiveTintColor: "#1565C0",
      tabBarInactiveTintColor: "#9E9E9E",
      tabBarStyle: {
        height: 60,
        paddingBottom: 8,
        paddingTop: 6,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#F0F0F0",
        elevation: 10,
      },
      tabBarIcon: ({ focused }) => (
        <Text style={{ fontSize: 20 }}>
          {focused
            ? TAB_ICONS[route.name].active
            : TAB_ICONS[route.name].inactive}
        </Text>
      ),
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

// ─── Root Navigator ───────────────────────────────────────────────────────────
const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  console.log("--- RootNavigator: isAuthenticated =", isAuthenticated);

  if (isLoading) return null; // hoặc <SplashScreen /> trong khi check auth

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
