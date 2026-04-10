import { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
// Import SVG icons
import RankingIcon from "@assets/icons/achievements/ranking.svg";
import NetIcon from "@assets/icons/achievements/net.svg";
import GrossIcon from "@assets/icons/achievements/gross.svg";
import ParIcon from "@assets/icons/achievements/par.svg";
import BirdieIcon from "@assets/icons/achievements/birdie 1.svg";
import EagleIcon from "@assets/icons/achievements/eagle.svg";
import HoleInOneIcon from "@assets/icons/achievements/hole-in-one.svg";
import WinSkillsIcon from "@assets/icons/achievements/win-skills.svg";
import LoseSkillsIcon from "@assets/icons/achievements/lose-skills.svg";
import GroupIcon from "@assets/icons/achievements/Group.svg";

import type { SvgProps } from 'react-native-svg';

const SVG_ICONS: Record<string, FC<SvgProps>> = {
  ranking: RankingIcon,
  matches: GroupIcon,
  net: NetIcon,
  gross: GrossIcon,
  par: ParIcon,
  birdie: BirdieIcon,
  eagle: EagleIcon,
  holeInOne: HoleInOneIcon,
  winSkills: WinSkillsIcon,
  loseSkills: LoseSkillsIcon,
};

// Thêm trường badge vào data để hiển thị badge "MBF Club" ở ô đầu tiên
const ACHIEVEMENTS = [
  { id: 1, label: "Ranking tốt nhất", value: "12", icon: "ranking", badge: "MBF Club" },
  { id: 2, label: "Trận đấu", value: "55", icon: "matches" },
  { id: 3, label: "NET tốt nhất", value: "25", icon: "net" },
  { id: 4, label: "Gross tốt nhất", value: "5", icon: "gross" },
  { id: 5, label: "Tổng số Par", value: "25", icon: "par" },
  { id: 6, label: "Tổng số Birdie", value: "5", icon: "birdie" },
  { id: 7, label: "Eagle", value: "25", icon: "eagle" },
  { id: 8, label: "Hole in one", value: "5", icon: "holeInOne" },
  { id: 9, label: "Skill thắng nhiều nhất", value: "25", icon: "winSkills" },
  { id: 10, label: "Skill thua nhiều nhất", value: "5", icon: "loseSkills" },
];

export const AchievementsScreen = () => {
  const navigation = useNavigation();


  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={20} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thành tích</Text>
          <View style={styles.placeholder} />
        </View>
          {/* FILTER SECTION */}
        <View style={styles.filterSection}>
            <TouchableOpacity style={styles.filterTagActive}>
              <Text style={styles.filterTagTextActive}>Mùa giải</Text>
              <Ionicons name="close-circle" size={16} color="#0056D2" style={{ marginLeft: 4 }} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.filterDropdown}>
              <Text style={styles.filterDropdownText}>Câu lạc bộ</Text>
              <Ionicons name="chevron-down" size={16} color="#666" style={{ marginLeft: 4 }} />
            </TouchableOpacity>
        </View>

          {/* USER INFO CARD */}
        <View style={styles.userCard}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=11" }}
              style={styles.userAvatar}
            />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>Nguyễn Văn Anh</Text>
              <View style={styles.userMatchInfo}>
                <Text style={styles.userMatchValue}>125</Text>
                <Text style={styles.userMatchLabel}>Trận đấu</Text>
              </View>
            </View>
            
            <View style={styles.allClubBadge}>
              <Text style={styles.allClubBadgeText}>Tất cả CLB</Text>
            </View>
          </View>

          {/* ACHIEVEMENTS GRID */}
          {/* Thay vì dùng FlatList, ta dùng View với flexWrap để tạo mảng liền mạch */}
          <View style={styles.gridContainer}>
            {ACHIEVEMENTS.map((item, index) => {
              const IconComponent = SVG_ICONS[item.icon];
              
              // Tính toán để thêm viền phải cho cột chẵn và viền dưới cho các hàng không phải cuối cùng
              const isRightColumn = index % 2 !== 0;
              const isLastRow = index >= ACHIEVEMENTS.length - 2;

              return (
                <View
                  key={item.id}
                  style={[
                    styles.gridCell,
                    !isRightColumn && styles.cellRightBorder,
                    !isLastRow && styles.cellBottomBorder,
                  ]}
                >
                  <View style={styles.cellHeader}>
                    {IconComponent ? (
                      <IconComponent width={24} height={24} />
                    ) : (
                      <View style={{ width: 24, height: 24 }} />
                    )}

                    {/* Hiển thị Badge nếu có (như MBF Club) */}
                    {item.badge && (
                      <View style={styles.mbfBadge}>
                        <Text style={styles.mbfBadgeText}>{item.badge}</Text>
                        <View style={styles.greenDot} />
                      </View>
                    )}
                  </View>
                  
                  <Text style={styles.achievementValue}>{item.value}</Text>
                  <Text style={styles.achievementLabel}>{item.label}</Text>
                </View>
              );
            })}
          </View>

          {/* SEE MORE LINK */}
          <TouchableOpacity style={styles.seeMoreLink}>
            <Text style={styles.seeLinkText}>Xem lịch sử các trận đấu</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F6F9", // Màu nền app theo ảnh (xám xanh rất nhạt)
  },
  container: {
    flex: 1,
    paddingHorizontal: 4,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  placeholder: {
    width: 36, // Phải bằng chiều rộng nút back để chữ ở giữa chuẩn xác
  },

  /* FILTER SECTION */
  filterSection: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  filterTagActive: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EBF3FF", // Xanh dương nhạt
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#0061AF",
  },
  filterTagTextActive: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0061AF",
  },
  filterDropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  filterDropdownText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#666",
  },

  /* USER INFO CARD */
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 16,
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  userMatchInfo: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  userMatchValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  userMatchLabel: {
    fontSize: 13,
    color: "#666",
  },
  allClubBadge: {
    backgroundColor: "#EBF3FF",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  allClubBadgeText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#0061AF",
  },
  /* ACHIEVEMENTS GRID (Khối liền mạch) */
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    borderRadius: 16,
    // Cắt viền các phần tử con vượt ra ngoài
    overflow: "hidden", 
  },
  gridCell: {
    width: "50%",
    padding: 15,
    justifyContent: "flex-start",
  },
  cellRightBorder: {
    borderRightWidth: 1,
    borderRightColor: "#F0F0F0",
  },
  cellBottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  cellHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  mbfBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EBF3FF",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    gap: 4,
  },
  mbfBadgeText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#0061AF",
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#34C759",
  },
  achievementValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  achievementLabel: {
    fontSize: 12,
    color: "#999",
  },
  /* SEE MORE LINK */
  seeMoreLink: {
    marginHorizontal: 16,
    marginTop: 16,
    alignSelf: "flex-start",
  },
  seeLinkText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0061AF",
  },
});