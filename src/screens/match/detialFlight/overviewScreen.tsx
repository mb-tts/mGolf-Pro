import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import PlayerCard from "./component/Tong quan va Everything/infoStickHDCNetSkin";
import { mockPlayers } from "./component/Tong quan va Everything/data";
const TABS = ["Tổng quan", "Everything", "Team", "Hợp đồng", "Quỹ gà"];
import ScoreTable from "./component/Tong quan va Everything/tableRegret";
import HandicapSection from "./component/Tong quan va Everything/handicapSection";
import ValueRegret from "./component/Tong quan va Everything/valueRegret";
import RoamingCard, { mockRoamingData } from "./component/Hop Dong/contract";
import RoamingHeader from "./component/Hop Dong/roamingHeader";
import ChickenFundSummary from "./component/Quy ga/totalquyga";
import ChickenFundTable from "./component/Quy ga/tablequyga";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { AppStackParamList } from "@/types/navigation.types";
import HeaderTeamCoDinh from "./component/Team co dinh/headerTeamcodinh";
import TableRegret from "./component/Team co dinh/TableRegret";
import HeaderTeamXoay from "./component/Team xoay/headerTeamxoay";
import TableRegretTeamXoay from "./component/Team xoay/tableRegretTeamxoay";
export default function FlightDetailHeader({ navigation }: any) {
  const route = useRoute<RouteProp<AppStackParamList, "overviewScreen">>();
  const initialTabParam = route?.params?.initialTab ?? "Tổng quan";
  const initialTeamMode = route?.params?.teamMode;

  const teamTabLabel =
    initialTeamMode === "xoay"
      ? "Team xoay"
      : initialTeamMode === "codinh"
        ? "Team cố định"
        : "Team";

  const initialTab =
    initialTabParam === "Team" && initialTeamMode
      ? teamTabLabel
      : initialTabParam;

  const [activeTab, setActiveTab] = useState(initialTab);
  const [teamMode] = useState<"xoay" | "codinh" | undefined>(initialTeamMode);

  const renderHeader = () => (
    <View style={{ marginTop: 20 }}>
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
            const displayLabel = tab === "Team" ? teamTabLabel : tab;
            const isActive = activeTab === displayLabel;
            const handlePress = () => setActiveTab(displayLabel);

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tabItem,
                  isActive ? styles.activeTabItem : styles.inactiveTabItem,
                ]}
                onPress={handlePress}
              >
                <Text
                  style={[
                    styles.tabText,
                    isActive ? styles.activeTabText : styles.inactiveTabText,
                  ]}
                >
                  {displayLabel}
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
              <HandicapSection />
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
          ListFooterComponent={() => (
            <View style={{ marginTop: 10 }}>
              <ValueRegret />
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

      {activeTab === teamTabLabel && (
        <ScrollView style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 16, paddingTop: 16, flex: 1 }}>
            {teamMode === "xoay" ? (
              <View style={{ flex: 1 }}>
                <HeaderTeamXoay />
                <TableRegretTeamXoay />
              </View>
            ) : teamMode === "codinh" ? (
              <View style={{ flex: 1 }}>
                <HeaderTeamCoDinh />
                <TableRegret />
              </View>
            ) : (
              <Text style={{ fontSize: 16, fontWeight: "600", color: "#333" }}>
                Đây là Team
              </Text>
            )}
          </View>
        </ScrollView>
      )}

      {activeTab === "Hợp đồng" && (
        <FlatList
          data={mockRoamingData}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={<RoamingHeader />}
          renderItem={({ item }) => <RoamingCard match={item} />}
          contentContainerStyle={{ paddingBottom: 0 }}
        />
      )}
      {activeTab === "Quỹ gà" && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <ChickenFundTable />
          <ChickenFundSummary />
        </ScrollView>
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
