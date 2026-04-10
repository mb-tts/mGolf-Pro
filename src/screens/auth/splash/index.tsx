import React, { useEffect } from "react";
import { View, Image, Text, StyleSheet, StatusBar } from "react-native";
import { useAuthNavigation } from "@/hooks/useNavigation";

export const SplashScreen = () => {
  const navigation = useAuthNavigation();

  // Tự động chuyển sang Onboarding sau 2.5 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Onboarding");
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Logo lớn ở giữa màn hình */}
      <View style={styles.logoWrapper}>
        <Image
          source={require("../../../../assets/icons/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>mGolf</Text>
      </View>

      {/* Dòng chữ "Phát triển bởi mobifone" ở đáy */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Phát triển bởi
          <Text style={styles.footerBrand}>mobifone</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  logoWrapper: {
    alignItems: "center",
  },
  logo: {
    width: 160,
    height: 160,
  },
  appName: {
    fontSize: 32,
    fontWeight: "700",
    color: "#0060AF",
    marginTop: 12,
    letterSpacing: -0.5,
  },
  footer: {
    position: "absolute",
    bottom: 40,
  },
  footerText: {
    fontSize: 13,
    color: "#999",
  },
  footerBrand: {
    color: "#0060AF",
    fontWeight: "600",
  },
});
