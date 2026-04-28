import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Flight, Player, SelectedPlayers, SelectionStep } from "./";
import PlayerCard from "./PlayerCard";

interface FlightSectionProps {
  flight: Flight;
  step: SelectionStep;
  selected: SelectedPlayers;
  onSelectPlayer: (player: Player) => void;
}

const FlightSection: React.FC<FlightSectionProps> = ({
  flight,
  step,
  selected,
  onSelectPlayer,
}) => {
  const isPlayerSelected = (player: Player) => {
    return selected.player1?.id === player.id || selected.player2?.id === player.id;
  };

  const rows: Player[][] = [];
  for (let i = 0; i < flight.players.length; i += 2) {
    rows.push(flight.players.slice(i, i + 2));
  }

  return (
    <View style={styles.section}>
      <Text style={styles.flightLabel}>{flight.name}</Text>
      <View style={styles.flightCard}>
        {rows.map((row, rowIndex) => (
          <View
            key={rowIndex}
            style={[
              styles.row,
              rowIndex === rows.length - 1 && styles.lastRow,
            ]}
          >
            {row.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                isSelected={isPlayerSelected(player)}
                onPress={onSelectPlayer}
              />
            ))}
            {/* Fill empty cells to maintain grid */}
            {row.length < 2 &&
              Array.from({ length: 2 - row.length }).map((_, i) => (
                <View key={`empty-${i}`} style={styles.emptyCell} />
              ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  flightLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
    marginBottom: 10,
  },
  flightCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6", // Viền màu xám nhạt nhẹ
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  lastRow: {
    marginBottom: 0,
  },
  emptyCell: {
    flex: 1,
  },
});

export default FlightSection;