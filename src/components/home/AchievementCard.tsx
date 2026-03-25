import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { Achievement } from "../../constants/mock-data";
import { SvgProps } from "react-native-svg";

//  Import SVG icons
import RankingIcon from "../../../assets/icons/home/ranking.svg";
import NetIcon from "../../../assets/icons/home/net.svg";
import GrossIcon from "../../../assets/icons/home/gross.svg";

//  Map type → SVG component
const ICONS: Record<Achievement["type"], React.FC<SvgProps>> = {
  ranking: RankingIcon,
  net: NetIcon,
  gross: GrossIcon,
};
//  Label trên đầu icon (NET, GROSS — ranking không có)
const ICON_LABEL: Record<Achievement["type"], string | null> = {
  ranking: null,
  net: "NET",
  gross: "GROSS",
};

export const AchievementCard: React.FC<{ item: Achievement }> = ({ item }) => {
  const Icon = ICONS[item.type];
  const topLabel = ICON_LABEL[item.type];

  return (
    <View style={styles.card}>
      {/* Label nhỏ trên icon (NET / GROSS) */}
      {topLabel ? (
        <Text style={styles.topLabel}>{topLabel}</Text>
      ) : (
        <View style={styles.topLabelPlaceholder} />
      )}

      {/* SVG Icon */}
      <Icon width={40} height={40} color={Colors.gold} />

      {/* Số */}
      <Text style={styles.value}>{item.value}</Text>

      {/* Label dưới */}
      <Text style={styles.label}>{item.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.gold,
    backgroundColor: Colors.white,
    gap: 4,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
  },
  topLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.gold,
    letterSpacing: 0.5,
  },
  topLabelPlaceholder: {
    height: 16, // ✅ giữ căn giữa cho card ranking
  },
  value: {
    fontSize: 36,
    fontWeight: "800",
    color: Colors.gold,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.gold,
    textAlign: "center",
  },
});
