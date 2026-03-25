import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CardOfOuting from "./cardOfOuting";

export default function OutingScreen() {
  return (
    <View style={styles.container}>
      {/* SEARCH */}
      <View style={styles.searchWrap}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#666" />
          <TextInput
            placeholder="Tìm kiếm"
            style={styles.input}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.filterBtn}>
          <Ionicons name="options-outline" size={20} color="#007AFF" />
        </View>
      </View>

      {/* CARD */}
      <ScrollView>
        <CardOfOuting/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 16,
  },

  /* SEARCH */
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
    elevation: 2
  },

  input: {
    marginLeft: 8,
    flex: 1,
  },

  filterBtn: {
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2
  },

  /* CARD */
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },

  image: {
    width: "100%",
    height: 180,
  },

  timeBadge: {
    position: "absolute",
    bottom: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  timeText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 12,
  },

  info: {
    padding: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  text: {
    marginLeft: 6,
    color: "#666",
    fontSize: 13,
  },
});
