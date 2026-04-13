import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../../constants/colors";

interface PickerFieldProps {
  label: string;
  value?: string;
  placeholder: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

/** Trường chọn tái sử dụng: Label + Button với icon bên phải */
export const PickerField: React.FC<PickerFieldProps> = ({
  label,
  value,
  placeholder,
  icon = "chevron-down",
  onPress,
}) => (
  <View style={styles.wrapper}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={onPress}>
      <Text
        style={[styles.value, !value && styles.placeholder]}
        numberOfLines={1}
      >
        {value || placeholder}
      </Text>
      <Ionicons name={icon} size={20} color={Colors.primary} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  wrapper: { marginBottom: 20 },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#404040",
    marginBottom: 8,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderWidth: 1, // 👈 đổi từ borderBottom
    borderColor: "#E8E8E8",
    borderRadius: 12, // 👈 bo góc

    paddingVertical: 14,
    paddingHorizontal: 12, // 👈 tăng cho đẹp hơn
    backgroundColor: "#fff", // 👈 để thấy rõ shape
  },
  value: { fontSize: 15, color: "#1A1A1A", flex: 1 },
  placeholder: { color: "#B0B0B0" },
});
