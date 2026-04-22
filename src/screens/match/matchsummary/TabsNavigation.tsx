import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface TabsNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const PRIMARY_BLUE = "#0061AF";

export const TabsNavigation: React.FC<TabsNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: "team", label: "Everything và team" },
    { id: "contract", label: "Hợp đồng" },
    { id: "chicken", label: "Gà" },
  ];

  return (
    <View style={styles.tabsContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab === tab.id && styles.activeTab]}
          onPress={() => onTabChange(tab.id)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 10,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  activeTab: {
    backgroundColor: PRIMARY_BLUE,
    borderColor: PRIMARY_BLUE,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  activeTabText: {
    color: "#FFF",
    fontWeight: "600",
  },
});
