import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ViewStyle,
  TextStyle,
} from "react-native";

interface Player {
  id: string;
  avatarUrl: string;
}

interface TeamData {
  id: string;
  isWinner: boolean;
  players: Player[];
  soGay: string;
  net: number;
  skins?: number; 
  bonus?: string; 
  up: number;
}

const demoData: TeamData[] = [
  {
    id: "1",
    isWinner: true,
    players: [
      { id: "p1", avatarUrl: "https://i.pravatar.cc/150?u=a1" },
      { id: "p2", avatarUrl: "https://i.pravatar.cc/150?u=a2" },
    ],
    soGay: "+15",
    net: 1,
    bonus: "+20",
    up: 3,
  },
  {
    id: "2",
    isWinner: false,
    players: [
      { id: "p3", avatarUrl: "https://i.pravatar.cc/150?u=a3" },
      { id: "p4", avatarUrl: "https://i.pravatar.cc/150?u=a4" },
    ],
    soGay: "+15",
    net: 1,
    skins: -1,
    up: -3,
  },
];

const TeamCard = ({ team }: { team: TeamData }) => {
  const { isWinner } = team;

  const containerStyle: ViewStyle = {
    backgroundColor: isWinner ? "#FFF9E6" : "#FFFFFF",
    borderColor: isWinner ? "#E6B84D" : "#E0E6ED",
  };

  const textStyle: TextStyle = {
    color: isWinner ? "#C9920E" : "#0056B3",
  };

  return (
    <View style={[styles.card, containerStyle]}>
      <View style={styles.cardHeader}>
        <View style={styles.avatarContainer}>
          {team.players.map((player, index) => (
            <Image
              key={player.id}
              source={{ uri: player.avatarUrl }}
              style={[styles.avatar]}
            />
          ))}
        </View>
        {isWinner && (
          <View style={styles.crownPlaceholder}>
            <Image
              source={require("@assets/images/crown1.png")}
              style={styles.crownPlaceholder}
            />
          </View>
        )}
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Số gậy</Text>
          <Text style={[styles.value, textStyle]}>{team.soGay}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>NET</Text>
          <Text style={[styles.value, textStyle]}>{team.net}</Text>
        </View>

        <View style={styles.row}>
          {isWinner ? (
            <>
              <Text style={styles.label}></Text>
              <Text style={[styles.value, textStyle]}>{team.bonus}</Text>
            </>
          ) : (
            <>
              <View style={styles.labelWithIcon}>
                <Text style={styles.label}>Skins</Text>
                <Image
                  source={require("@assets/images/chip.png")}
                  style={styles.crownPlaceholderchip}
                />
              </View>
              <Text style={[styles.value, textStyle]}>{team.skins}</Text>
            </>
          )}
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>UP</Text>
          <Text style={[styles.value, textStyle]}>{team.up}</Text>
        </View>
      </View>
    </View>
  );
};

// --- Main Component ---
export default function HeaderTeamCoDinh() {
  return (
    <View style={styles.mainContainer}>
      {demoData.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    borderRadius: 24,
    borderWidth: 2,
    padding: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  avatarContainer: {
    flexDirection: "row",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  crownPlaceholder: {
    width: 30,
    height: 30,
    marginTop: 3,
  },
  crownPlaceholderchip: {
    width: 25,
    height: 25,
    marginTop: 3,
  },
  statsContainer: {
    gap: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 24,
  },
  label: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  labelWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  chipPlaceholder: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#333",
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
