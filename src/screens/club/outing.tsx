import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import CardOfOuting from "./cardOfOuting";
import FilterSearchBox from "./filteredSearchBox"; // Import Component dùng chung

export default function OutingScreen() {
  return (
    <View style={styles.container}>
      <FilterSearchBox />

      <View>
        <CardOfOuting />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
});
