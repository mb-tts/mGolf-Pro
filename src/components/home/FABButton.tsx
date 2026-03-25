import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

// ✅ Import SVG icon
import GolfPersonIcon from "../../../assets/icons/home/golfPerson.svg";

interface FABButtonProps {
  onPress: () => void;
}

export const FABButton: React.FC<FABButtonProps> = ({ onPress }) => (
  <TouchableOpacity style={styles.fab} onPress={onPress} activeOpacity={0.85}>
    <GolfPersonIcon width={30} height={30} color={Colors.white} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 24,
    right: 16,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
});
