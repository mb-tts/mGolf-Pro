import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import CardOfOuting from "./cardOfOuting";
import FilterSearchBox from "./filteredSearchBox"; // Import Component dùng chung

export default function OutingScreen() {
  return (
    <View style={styles.container}>
      {/* Chỉ cần gọi Component này ra */}
      <FilterSearchBox />

      <ScrollView showsVerticalScrollIndicator={false}>
        <CardOfOuting />
      </ScrollView>
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