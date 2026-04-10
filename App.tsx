import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import type { SvgProps } from "react-native-svg";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useFonts } from "expo-font";

// ─── Types (tập trung trong 1 file) ──────────────────────────────────────────
import type {
  AuthStackParamList,
  MainTabParamList,
  AppStackParamList,
} from "@/types/navigation.types";
// Re-export để các file cũ import từ App.tsx vẫn hoạt động
export type { AuthStackParamList, MainTabParamList, AppStackParamList };

// ─── Auth Screens ─────────────────────────────────────────────────────────────
import { SplashScreen } from "@/screens/auth/splash";
import { OnboardingScreen } from "@/screens/auth/onboarding";
import { LoginScreen } from "@/screens/auth/login";
import { RegisterScreen } from "@/screens/auth/register";
import { SetPasswordScreen } from "@/screens/auth/set-password";

// ─── Main Screens ─────────────────────────────────────────────────────────────
import { HomeScreen } from "@/screens/home";
import { HistoryScreen } from "@/screens/history";
import { AccountScreen } from "@/screens/account";
import { TournamentScreen } from "@/screens/tournament";
import { CreateFlightScreen } from "@/screens/home/create-flight";
import ClubIndexScreen from "@/screens/club";

// ─── Account Sub-Screens ──────────────────────────────────────────────────────
import { AccountInformationScreen } from "@/screens/account/account-information";
import { AchievementsScreen } from "@/screens/account/achievements";
import { GameSettingScreen } from "@/screens/account/game-setting";
import { UISettingsScreen } from "@/screens/account/ui-setting";
import { EquipmentSettingsScreen } from "@/screens/account/equipment-setting";
import { NotificationSettingsScreen } from "@/screens/account/notification-setting";
import { PaymentSettingsScreen } from "@/screens/account/payments";
import { SecurityScreen } from "@/screens/account/security";
import { PasswordChangeScreen } from "@/screens/account/security/passwordchange";
import { SetPasswordFormScreen } from "@/screens/account/security/set-password-form";
import { OutingNotificationScreen } from "@/screens/account/notification-setting/outing";
import { PersonalNotificationScreen } from "@/screens/account/notification-setting/personal";
import { ContactScreen } from "@/screens/account/contact";
import { AboutUsScreen } from "@/screens/account/aboutus";
import { RuleScreen } from "@/screens/account/rules";

// ─── Tournament / Club Sub-Screens ────────────────────────────────────────────
import OutingDetailScreen from "@/screens/tournament/detail/outingDetail";
import HoleListScreen from "@/screens/tournament/detail/HoleListScreen";
import HoleDetailScreen from "@/screens/tournament/detail/HoleDetailScreen";
import HoleMapScreen from "@/screens/tournament/detail/HoleMapScreen";
import HoleVideoScreen from "@/screens/tournament/detail/HoleVideoScreen";
import ClubMainScreen from "@/screens/club/mainscreen";
import ImagesAndVideosScreen from "@/screens/club/imagesAndvideos";

// ─── Create Flight Sub-Screens ────────────────────────────────────────────────
import InstallGameScreen from "@/screens/home/create-flight/installGame";
import TeamCoDinhScreen from "@/screens/home/create-flight/teamcodinh";
import TeamXoayScreen from "@/screens/home/create-flight/teamxoay";

// ─── Provider ─────────────────────────────────────────────────────────────────
import { AuthProvider, useAuth } from "@/providers/auth.provider";

// ─── Tab Icons ────────────────────────────────────────────────────────────────
import HomeIcon from "@assets/icons/tabbar/Home.svg";
import HomeActiveIcon from "@assets/icons/tabbar/Home2.svg";
import HistoryIcon from "@assets/icons/tabbar/history.svg";
import HistoryActiveIcon from "@assets/icons/tabbar/history2.svg";
import ClubIcon from "@assets/icons/tabbar/club.svg";
import ClubActiveIcon from "@assets/icons/tabbar/club2.svg";
import GolfCourseIcon from "@assets/icons/tabbar/golf-course.svg";
import GolfCourseActiveIcon from "@assets/icons/tabbar/golf-course2.svg";
import ProfileIcon from "@assets/icons/tabbar/profile-circle.svg";
import ProfileActiveIcon from "@assets/icons/tabbar/profile-circle2.svg";

// ─── Tab Icons Map ────────────────────────────────────────────────────────────
const TAB_ICONS: Record<
  keyof MainTabParamList,
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
    screenOptions={{ headerShown: false, animation: "default" }}
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
        component={ClubIndexScreen}
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
    <AppStack.Screen name="MainTabs" component={MainNavigator} />

    <AppStack.Screen
      name="AccountInformation"
      component={AccountInformationScreen}
      options={{ animation: "slide_from_right" }}
    />
    <AppStack.Screen
      name="ImagesAndVideosScreen"
      component={ImagesAndVideosScreen}
    />
    <AppStack.Screen
      name="NotificationSettings"
      component={NotificationSettingsScreen}
      options={{ animation: "slide_from_right" }}
    />

    <AppStack.Screen
      name="TeamCoDinh"
      component={TeamCoDinhScreen}
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
      name="Teamxoay"
      component={TeamXoayScreen}
      options={{ animation: "slide_from_right" }}
    />

    <AppStack.Screen name="OutingDetailScreen" component={OutingDetailScreen} />
    <AppStack.Screen name="HoleListScreen" component={HoleListScreen} />

    <AppStack.Screen
      name="HoleDetailScreen"
      component={HoleDetailScreen}
      options={{ animation: "slide_from_right" }}
    />
    <AppStack.Screen
      name="HoleMapScreen"
      component={HoleMapScreen}
      options={{ animation: "slide_from_right" }}
    />
    <AppStack.Screen
      name="ClubMainScreen"
      component={ClubMainScreen}
      options={{ headerShown: false }}
    />

    <AppStack.Screen
      name="InstallGame"
      component={InstallGameScreen}
      options={{ animation: "slide_from_right" }}
    />

    <AppStack.Screen
      name="UISettings"
      component={UISettingsScreen}
      options={{ animation: "slide_from_right" }}
    />

    <AppStack.Screen
      name="PaymentSettings"
      component={PaymentSettingsScreen}
      options={{ animation: "slide_from_right" }}
    />

    <AppStack.Screen
      name="Equipment"
      component={EquipmentSettingsScreen}
      options={{ animation: "slide_from_right" }}
    />

    <AppStack.Screen
      name="Security"
      component={SecurityScreen}
      options={{ animation: "slide_from_right" }}
    />

    <AppStack.Screen
      name="Contact"
      component={ContactScreen}
      options={{ animation: "slide_from_right" }}
    />

    <AppStack.Screen
      name="About"
      component={AboutUsScreen}
      options={{ animation: "slide_from_right" }}
    />

    <AppStack.Screen
      name="Rules"
      component={RuleScreen}
      options={{ animation: "slide_from_right" }}
    />

    <AppStack.Screen
      name="OutingNotificationScreen"
      component={OutingNotificationScreen}
      options={{ animation: "slide_from_right" }}
    />

    <AppStack.Screen
      name="PersonalNotificationScreen"
      component={PersonalNotificationScreen}
      options={{ animation: "slide_from_right" }}
    />

    <AppStack.Screen
      name="PasswordChange"
      component={PasswordChangeScreen}
      options={{ animation: "slide_from_right" }}
    />

    <AppStack.Screen
      name="SetPasswordForm"
      component={SetPasswordFormScreen}
      options={{ animation: "slide_from_right" }}
    />

    <AppStack.Screen
      name="CreateFlight"
      component={CreateFlightScreen}
      options={{ animation: "slide_from_bottom" }}
    />
    <AppStack.Screen
      name="HoleVideoScreen"
      component={HoleVideoScreen}
      options={{ headerShown: false }}
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