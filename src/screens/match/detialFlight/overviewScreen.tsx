import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  
  SafeAreaView,
  FlatList
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import PlayerCard from "./component/infoStickHDCNetSkin";
import { mockPlayers } from "./component/data";
const TABS = ["Tổng quan", "Everything", "Team", "Hợp đồng", "Quỹ gà"];
import ScoreTable from "./component/tableRegret";
import HandicapSection from "./component/handicapSection";
export default function FlightDetailHeader({ navigation }: any) {
  const [activeTab, setActiveTab] = useState("Tổng quan");

  const renderHeader = () => (
    <View style = {{marginBottom: 20}}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Chi tiết flight</Text>

        <View style={styles.placeholder} />
      </View>

      <View style={styles.tabsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {TABS.map((tab, index) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tabItem,
                  isActive ? styles.activeTabItem : styles.inactiveTabItem,
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    isActive ? styles.activeTabText : styles.inactiveTabText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {renderHeader()}

      {activeTab === "Tổng quan" && (
        <FlatList
          style={{ flex: 1 }}
          data={mockPlayers}
          keyExtractor={(item) => item.id}
          numColumns={2}
          ListFooterComponent={() => (
            <View style={{ marginTop: 10 }}>
               <ScoreTable />
               <HandicapSection/>
            </View>
          )}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingVertical: 16,
            paddingBottom: 50,
          }}
          renderItem={({ item }) => <PlayerCard player={item} />}
        />
      )}

      {activeTab === "Everything" && (
        <FlatList
          style={{ flex: 1 }}
          data={mockPlayers}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingVertical: 16,
            paddingBottom: 50,
          }}
          renderItem={({ item }) => <PlayerCard player={item} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    marginTop: 15,
    backgroundColor: "#FFFFFF",
    paddingBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  placeholder: {
    width: 40,
  },

  tabsWrapper: {
    marginTop: 10,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  tabItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTabItem: {
    backgroundColor: "#0066B2",
    borderColor: "#0066B2",
  },
  inactiveTabItem: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  inactiveTabText: {
    color: "#374151",
  },
});
