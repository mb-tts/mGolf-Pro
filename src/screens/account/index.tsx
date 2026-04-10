import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/providers/auth.provider";
import { Colors } from "@/constants/colors";
import { ScreenWrapper } from "@/components/common/ScreenWrapper";
import { useAppNavigation } from "@/hooks/useNavigation";
import type { AppStackParamList } from "@/types/navigation.types";

import BackgroundProfile from "@assets/icons/profile/backgroundProfile.svg";
import InformationIcon from "@assets/icons/information.svg";
import AchievementsIcon from "@assets/icons/achievements.svg";
import GameSettingsIcon from "@assets/icons/game_settings.svg";
import UISettingsIcon from "@assets/icons/ui_settings.svg";
import PaymentsIcon from "@assets/icons/payments.svg";
import EquipmentsIcon from "@assets/icons/equipments.svg";
import NotificationIcon from "@assets/icons/notification.svg";
import PrivacyIcon from "@assets/icons/privacy.svg";
import ContactUsIcon from "@assets/icons/contactus.svg";
import AboutUsIcon from "@assets/icons/aboutus.svg";
import type { SvgProps } from "react-native-svg";

// ─── Menu Item Interface ──────────────────────────────────────────────────────
interface MenuItem {
  label: string;
  icon: React.FC<SvgProps>;
  id: keyof AppStackParamList;
}

const MENU_GROUP_1: MenuItem[] = [
  {
    label: "Thông tin tài khoản",
    icon: InformationIcon,
    id: "AccountInformation",
  },
  { label: "Thành tích", icon: AchievementsIcon, id: "Achievements" },
  {
    label: "Cài đặt game",
    icon: GameSettingsIcon,
    id: "GameSettings",
  },
  { label: "Cài đặt giao diện", icon: UISettingsIcon, id: "UISettings" },
  { label: "Cài đặt thanh toán", icon: PaymentsIcon, id: "PaymentSettings" },
  { label: "Trang bị", icon: EquipmentsIcon, id: "Equipment" },
  {
    label: "Cài đặt thông báo",
    icon: NotificationIcon,
    id: "NotificationSettings",
  },
  {
    label: "Bảo mật và Quyền riêng tư",
    icon: PrivacyIcon,
    id: "Security",
  },
];

const MENU_GROUP_2: MenuItem[] = [
  { label: "Liên hệ với chúng tôi", icon: ContactUsIcon, id: "Contact" },
  { label: "Về chúng tôi", icon: AboutUsIcon, id: "About" },
  { label: "Luật chơi", icon: NotificationIcon, id: "Rules" },
];

// ─── Menu Item Component ──────────────────────────────────────────────────────
interface MenuItemComponentProps {
  item: MenuItem;
  onPress: (screenName: keyof AppStackParamList) => void;
}

const MenuItemComponent: React.FC<MenuItemComponentProps> = ({
  item,
  onPress,
}) => {
  const IconComponent = item.icon;
  return (
    <TouchableOpacity
      style={styles.menuItem}
      activeOpacity={0.7}
      onPress={() => onPress(item.id)}
    >
      <View style={styles.menuIconBox}>
        <IconComponent width={24} height={24} />
      </View>
      <Text style={styles.menuLabel}>{item.label}</Text>
      <Ionicons name="chevron-forward" size={20} color="#C4C4C4" />
    </TouchableOpacity>
  );
};

// ─── Account Screen ───────────────────────────────────────────────────────────
export const AccountScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useAppNavigation();

  const handleMenuPress = (screenName: keyof AppStackParamList) => {
    // Tất cả các screen này đều nằm trong AppStack, navigate trực tiếp từ parent
    navigation.getParent()?.navigate(screenName as string);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* ScrollView hợp lý — nội dung cố định (profile + menu items) */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* NỀN XANH TRÊN CÙNG */}
          <View style={styles.headerBackground}>
            <LinearGradient
              colors={["#42A5F5", "#90CAF9", "#F0F4F8"]}
              style={StyleSheet.absoluteFillObject}
            />
            <SafeAreaView edges={["top"]} style={styles.safeHeader}>
              <TouchableOpacity
                hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="chevron-back" size={28} color={Colors.white} />
              </TouchableOpacity>
              <TouchableOpacity
                hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
              >
                <Ionicons
                  name="qr-code-outline"
                  size={24}
                  color={Colors.white}
                />
              </TouchableOpacity>
            </SafeAreaView>
          </View>

          {/* THẺ PROFILE */}
          <View style={styles.profileCard}>
            <View style={styles.svgContainer}>
              <BackgroundProfile
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
              />
            </View>

            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: "https://i.pravatar.cc/150?img=11" }}
                style={styles.avatar}
              />
            </View>

            <Text style={styles.userName}>
              {user?.fullName || "Nguyễn Văn Anh"}
            </Text>

            <View style={styles.badgeRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  VGA {user?.vgaCode || "234568"}
                </Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>HDC 30</Text>
              </View>
              <View style={[styles.badge, { backgroundColor: "#E3F2FD" }]}>
                <Text style={[styles.badgeText, { color: Colors.primary }]}>
                  MBF Club
                </Text>
                <View style={styles.greenDot} />
              </View>
            </View>
          </View>

          {/* MENU — dữ liệu cố định, ít → dùng .map() thay FlatList */}
          <View style={styles.menuGroup}>
            {MENU_GROUP_1.map((item) => (
              <MenuItemComponent
                key={item.id}
                item={item}
                onPress={handleMenuPress}
              />
            ))}
          </View>

          <View style={styles.menuGroup}>
            {MENU_GROUP_2.map((item) => (
              <MenuItemComponent
                key={item.id}
                item={item}
                onPress={handleMenuPress}
              />
            ))}
          </View>

          {/* NÚT ĐĂNG XUẤT */}
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={logout}
            activeOpacity={0.8}
          >
            <Ionicons
              name="log-out-outline"
              size={20}
              color="#FF3B30"
              style={{ transform: [{ scaleX: -1 }] }}
            />
            <Text style={styles.logoutText}>Đăng xuất</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerBackground: {
    height: 200,
  },
  safeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  profileCard: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginTop: -80,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    position: "relative",
  },
  svgContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
    overflow: "hidden",
  },
  avatarWrapper: {
    marginTop: -40,
    padding: 3,
    backgroundColor: Colors.white,
    borderRadius: 50,
    zIndex: 1,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginTop: 8,
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 8,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#4A4A4A",
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#34C759",
    marginLeft: 4,
  },
  menuGroup: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    borderRadius: 16,
    marginTop: 16,
    paddingVertical: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: "#1A1A1A",
    fontWeight: "400",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 25,
    paddingVertical: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    gap: 8,
  },
  logoutText: {
    color: "#FF3B30",
    fontSize: 16,
    fontWeight: "600",
  },
});
