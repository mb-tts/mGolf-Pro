import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";

interface ScoreTableProps {
  hdc: number;
  net: number;
  gross: number;
  ranking: number;
  skins: number;
}

const HEADERS = ["HDC", "NET", "Gross", "Ranking", "Skins"];

export const ScoreTable: FC<ScoreTableProps> = ({
  hdc,
  net,
  gross,
  ranking,
  skins,
}) => {
  const values = [hdc, net, gross, ranking, skins];
  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.headerRow]}>
        {HEADERS.map((h, index) => (
          <Text key={h} style={[styles.headerCell, index < HEADERS.length - 1 && styles.borderRight]}>
            {h}
          </Text>
        ))}
      </View>
      <View style={styles.row}>
        {values.map((v, index) => (
          <Text key={index} style={[styles.valueCell, index < values.length - 1 && styles.borderRight]}>
            {v}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 10,
  },
  row: { flexDirection: "row" },
  headerRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
  },
  headerCell: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 10,
    fontSize: 12,
    fontWeight: "600",
    color: "#0066FF",
    backgroundColor: "#F5F8FF",
  },
  valueCell: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text,
    backgroundColor: Colors.white,
  },
});
