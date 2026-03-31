import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import CardOfOuting from "./cardOfOuting";
import FilterSearchBox from "./filteredSearchBox"; // Import Component dùng chung

export default function OutingScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      <FilterSearchBox />

      <ScrollView showsVerticalScrollIndicator={false}>
        <CardOfOuting />
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
});