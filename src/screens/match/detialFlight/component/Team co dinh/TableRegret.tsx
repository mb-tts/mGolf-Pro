import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from "react-native";

// --- Interfaces ---
interface PlayerScore {
  name: string;
  avatar: string;
  score: string;
}

interface HoleData {
  id: string; // "Tất cả" hoặc số hố "1", "2"...
  team1Score: { top: string; bottom?: string; isWinner?: boolean };
  team2Score: { top: string; bottom?: string; isWinner?: boolean };
  detail?: {
    mainPlayer: { name: string; avatar: string };
    others: PlayerScore[];
    total: string;
  };
}

// --- Demo Data ---
const HOLES_LIST = ["Tất cả", "1", "2", "3", "4", "5", "6", "7"];

const demoHolesData: HoleData[] = [
  {
    id: "1",
    team1Score: { top: "2  1", bottom: "+2UP/ +6", isWinner: true },
    team2Score: { top: "2  1" },
    detail: {
      mainPlayer: { name: "N.Linh", avatar: "https://i.pravatar.cc/150?u=1" },
      others: [
        { name: "N.Anh", avatar: "https://i.pravatar.cc/150?u=a", score: "+1" },
        { name: "N.Nam", avatar: "https://i.pravatar.cc/150?u=b", score: "+2" },
        { name: "N.Huy", avatar: "https://i.pravatar.cc/150?u=c", score: "-1" },
      ],
      total: "+2",
    },
  },
  {
    id: "2",
    team1Score: { top: "2  1", bottom: "+2UP/ +6", isWinner: true },
    team2Score: { top: "2  1" },
    detail: {
      mainPlayer: { name: "N.Linh", avatar: "https://i.pravatar.cc/150?u=1" },
      others: [
        { name: "N.Anh", avatar: "https://i.pravatar.cc/150?u=a", score: "+1" },
        { name: "N.Nam", avatar: "https://i.pravatar.cc/150?u=b", score: "+2" },
        { name: "N.Huy", avatar: "https://i.pravatar.cc/150?u=c", score: "-1" },
      ],
      total: "+2",
    },
  },
  {
    id: "3",
    team1Score: { top: "2  1" },
    team2Score: { top: "2  1" },
  },
  {
    id: "4",
    team1Score: { top: "2  1" },
    team2Score: { top: "2  1", bottom: "+2UP/ +6", isWinner: true },
  },
  {
    id: "5",
    team1Score: { top: "2  1", bottom: "+2UP/ +6", isWinner: true },
    team2Score: { top: "2  1" },
  },
  {
    id: "6",
    team1Score: { top: "2  1", bottom: "+2UP/ +6", isWinner: true },
    team2Score: { top: "2  1" },
  },
  {
    id: "7",
    team1Score: { top: "2  1", bottom: "+2UP/ +6", isWinner: true },
    team2Score: { top: "2  1" },
  },
];

export default function TableRegret() {
  const [selectedHole, setSelectedHole] = useState("Tất cả");

  const FilterBar = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filterBar}
    >
      {HOLES_LIST.map((hole) => {
        const isActive = selectedHole === hole;
        return (
          <TouchableOpacity
            key={hole}
            onPress={() => setSelectedHole(hole)}
            style={[
              styles.filterItem,
              isActive && styles.filterItemActive,
              hole === "Tất cả" && { paddingHorizontal: 15 },
            ]}
          >
            <Text
              style={[styles.filterText, isActive && styles.filterTextActive]}
            >
              {hole}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  const TableHeader = () => (
    <View style={styles.tableHeader}>
      <View style={[styles.cell, { flex: 0.5 }]}>
        <Text style={styles.headerText}>Hố</Text>
      </View>
      <View style={styles.cell}>
        <View style={styles.headerTeam}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?u=1" }}
            style={styles.headerAvatar}
          />
          <Image
            source={{ uri: "https://i.pravatar.cc/150?u=2" }}
            style={styles.headerAvatar}
          />
        </View>
        <Text style={styles.headerSubText}>N.Linh N.Huy</Text>
      </View>
      <View style={styles.cell}>
        <View style={styles.headerTeam}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?u=3" }}
            style={styles.headerAvatar}
          />
          <Image
            source={{ uri: "https://i.pravatar.cc/150?u=4" }}
            style={styles.headerAvatar}
          />
        </View>
        <Text style={styles.headerSubText}>N.Nam N.Huy</Text>
      </View>
    </View>
  );

  const TableRow = ({ item }: { item: HoleData }) => (
    <TouchableOpacity
      style={styles.tableRow}
      onPress={() => setSelectedHole(item.id)}
    >
      <View style={[styles.cell, { flex: 0.5 }]}>
        <View style={styles.holeNumberCircle}>
          <Text>{item.id}</Text>
        </View>
      </View>

      <View style={styles.cell}>
        <Text style={styles.scoreTop}>{item.team1Score.top}</Text>
        {item.team1Score.bottom && (
          <View style={styles.scoreBottomContainer}>
            <View style={styles.divider} />
            <View style={styles.rowCenter}>
              <Text style={styles.scoreBottomText}>
                {item.team1Score.bottom}
              </Text>
              <Image
                source={require("@assets/images/chip.png")}
                style={styles.chipIcon}
              />
              {item.team1Score.isWinner && (
                <Image
                  source={require("@assets/images/crown1.png")}
                  style={styles.crownIcon}
                />
              )}
            </View>
          </View>
        )}
      </View>

      <View style={styles.cell}>
        <Text style={styles.scoreTop}>{item.team2Score.top}</Text>
        {item.team2Score.bottom && (
          <View style={styles.scoreBottomContainer}>
            <View style={styles.divider} />
            <View style={styles.rowCenter}>
              <Text style={styles.scoreBottomText}>
                {item.team2Score.bottom}
              </Text>
              <Image
                source={require("@assets/images/chip.png")}
                style={styles.chipIcon}
              />
              {item.team2Score.isWinner && (
                <Image
                  source={require("@assets/images/crown1.png")}
                  style={styles.crownIcon}
                />
              )}
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const DetailCard = ({ holeId }: { holeId: string }) => (
    <View style={styles.detailCard}>
      <Text>Chưa có màn này</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kết quả từng hố</Text>
      <FilterBar />
      
      {selectedHole === "Tất cả" ? (
        <View style={styles.tableWrapper}>
          <TableHeader />
          {/* Thay FlatList bằng .map() */}
          {demoHolesData.map((item) => (
            <TableRow key={item.id} item={item} />
          ))}
        </View>
      ) : (
        <DetailCard holeId={selectedHole} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 10,
    marginBottom: 50,
  },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 15, color: "#333" },
  filterBar: { flexDirection: "row", marginBottom: 20, maxHeight: 50 },
  filterItem: {
    minWidth: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  filterItemActive: {
    borderColor: "#0056B3",
    borderStyle: "solid",
    borderWidth: 2,
  },
  filterText: { color: "#666" },
  filterTextActive: { color: "#0056B3", fontWeight: "bold" },

  // Table Styles
  tableWrapper: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F0F7FF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  headerText: { fontWeight: "bold", fontSize: 16 },
  headerTeam: { flexDirection: "row", marginBottom: 4 },
  headerAvatar: { width: 30, height: 30, borderRadius: 15, marginRight: 5 },
  headerSubText: { fontSize: 12, color: "#444" },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    minHeight: 80,
  },
  cell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: "#F3F4F6",
  },
  holeNumberCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#DDD",
    justifyContent: "center",
    alignItems: "center",
  },
  scoreTop: { fontSize: 16, fontWeight: "500" },
  scoreBottomContainer: { width: "100%", marginTop: 5 },
  divider: { height: 1, backgroundColor: "#EEE", marginVertical: 5 },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreBottomText: { fontSize: 13, fontWeight: "bold", color: "#444" },
  chipIcon: { width: 18, height: 18, borderRadius: 7, marginHorizontal: 3 },
  crownIcon: {
    width: 18,
    height: 18,
    borderRadius: 2,
  },

  // Detail Card Styles
  content: { marginTop: 10 },
  detailCard: {
    flexDirection: "row",
    backgroundColor: "#F0F7FF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E6ED",
    padding: 15,
  },
  detailLeft: { flex: 1, alignItems: "center", justifyContent: "center" },
  detailHoleBadge: {
    position: "absolute",
    top: -10,
    left: -5,
    backgroundColor: "#FFF",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  detailHoleText: { fontSize: 12, fontWeight: "bold" },
  detailAvatarLarge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  detailName: { fontWeight: "600" },

  detailMiddle: {
    flex: 2.5,
    flexDirection: "row",
    justifyContent: "space-around",
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#D1D5DB",
    paddingHorizontal: 10,
  },
  playerScoreItem: { alignItems: "center" },
  detailAvatarSmall: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginBottom: 5,
  },
  detailNameSmall: { fontSize: 12, color: "#666", marginBottom: 5 },
  scoreBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#0056B3",
    backgroundColor: "#FFF",
  },
  scoreBadgeText: { color: "#0056B3", fontWeight: "bold", fontSize: 12 },

  detailRight: { flex: 1, alignItems: "center", justifyContent: "center" },
  totalLabel: {
    fontSize: 14,
    color: "#0056B3",
    fontWeight: "600",
    marginBottom: 5,
  },
  totalBadge: {
    backgroundColor: "#0056B3",
    width: 45,
    height: 35,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  totalValue: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
});
