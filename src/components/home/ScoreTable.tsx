import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

interface ScoreTableProps {
  hdc: number;
  net: number;
  gross: number;
  ranking: number;
  skins: number;
}

const HEADERS = ["HDC", "NET", "Gross", "Ranking", "Skins"];

export const ScoreTable: React.FC<ScoreTableProps> = ({
  hdc,
  net,
  gross,
  ranking,
  skins,
}) => {
  const values = [hdc, net, gross, ranking, skins];
  return (
    <View style={styles.table}>
      <View style={styles.row}>
        {HEADERS.map((h) => (
          <Text key={h} style={styles.headerCell}>
            {h}
          </Text>
        ))}
      </View>
      <View style={styles.row}>
        {values.map((v, i) => (
          <Text key={i} style={styles.valueCell}>
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
  headerCell: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 7,
    fontSize: 12,
    fontWeight: "700",
    color: Colors.tableHeader,
    backgroundColor: "#EEF4FF",
  },
  valueCell: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 8,
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    backgroundColor: Colors.white,
  },
});
