import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider, useAuth } from './src/providers/auth.provider';
import { LoginScreen }       from './src/screens/auth/login';
import { RegisterScreen }    from './src/screens/auth/register';
import { SetPasswordScreen } from './src/screens/auth/set-password';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator id="AuthStack" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login"       component={LoginScreen} />
    <Stack.Screen name="Register"    component={RegisterScreen} />
    <Stack.Screen name="SetPassword" component={SetPasswordScreen} />
  </Stack.Navigator>
);

// TODO: thêm MainNavigator khi có màn hình chính
const RootNavigator = () => {
  const { isAuthenticated } = useAuth();
  
  // Debug: Kiểm tra trạng thái đăng nhập
  console.log('--- RootNavigator: isAuthenticated =', isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? null /* <MainNavigator /> */ : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
