import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import { Achievement } from "@/constants/mock-data";
import { SvgProps } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

//  Import SVG icons
import RankingIcon from "@assets/icons/home/ranking.svg";
import NetIcon from "@assets/icons/home/net.svg";
import GrossIcon from "@assets/icons/home/gross.svg";

//  Map type → SVG component
const ICONS: Record<Achievement["type"], FC<SvgProps>> = {
  ranking: RankingIcon,
  net: NetIcon,
  gross: GrossIcon,
};


export const AchievementCard: FC<{ item: Achievement }> = ({ item }) => {
  const Icon = ICONS[item.type];

  return (
    <View style={styles.card}>
      {/* Label nhỏ trên icon (NET / GROSS) */}
      {/* {topLabel ? (
        <Text style={styles.topLabel}>{topLabel}</Text>
      ) : (
        <View style={styles.topLabelPlaceholder} />
      )} */}

      {/* SVG Icon */}
      <Icon width={40} height={40} color={Colors.gold} />

      {/* Số với Hiệu ứng Gradient Text (Không có border) */}
      <MaskedView
        maskElement={
          <Text style={[styles.value, { backgroundColor: "transparent" }]}>
            {item.value}
          </Text>
        }
      >
        <LinearGradient
          colors={["#DAA650", "#F6CB64", "#DAA650"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={[styles.value, { opacity: 0 }]}>{item.value}</Text>
        </LinearGradient>
      </MaskedView>

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
    height: 16,
  },
  value: {
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.gold,
    textAlign: "center",
  },
});
