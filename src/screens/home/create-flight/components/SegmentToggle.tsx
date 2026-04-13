import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../../../constants/colors";

interface SegmentToggleProps<T extends string | number> {
  label?: string;
  options: { value: T; label: string }[];
  selected: T;
  onSelect: (value: T) => void;
  /** "pill" = bo tròn (9/18 hố) | "segment" = chia đôi (Đường A/B) */
  variant?: "pill" | "segment";
}

/** Toggle dạng pill (9/18 hố) hoặc segment (Đường A/B) */
export function SegmentToggle<T extends string | number>({
  label,
  options,
  selected,
  onSelect,
  variant = "segment",
}: SegmentToggleProps<T>) {
  if (variant === "pill") {
    return (
      <View style={styles.pillWrapper}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.pillRow}>
          {options.map((opt) => (
            <TouchableOpacity
              key={String(opt.value)}
              style={[styles.pillBtn, selected === opt.value && styles.pillBtnActive]}
              onPress={() => onSelect(opt.value)}
            >
              <Text
                style={[styles.pillText, selected === opt.value && styles.pillTextActive]}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.segmentWrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.segmentRow}>
        {options.map((opt) => (
          <TouchableOpacity
            key={String(opt.value)}
            style={[styles.segmentBtn, selected === opt.value && styles.segmentBtnActive]}
            onPress={() => onSelect(opt.value)}
          >
            <Text
              style={[styles.segmentText, selected === opt.value && styles.segmentTextActive]}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#404040",
    marginBottom: 8,
  },
  // ── Pill (9/18 hố) ──
  pillWrapper: { marginBottom: 20 },
  pillRow: { flexDirection: "row", gap: 12 },
  pillBtn: {
    flex: 1,
    height: 46,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "#D0D0D0",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  pillBtnActive: {
    borderColor: Colors.primary,
    backgroundColor: "#EAF3FF",
  },
  pillText: { fontSize: 15, fontWeight: "600", color: "#808080" },
  pillTextActive: { color: Colors.primary },
  // ── Segment (Đường A/B) ──
  segmentWrapper: { marginBottom: 20 },
  segmentRow: {
    flexDirection: "row",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    overflow: "hidden",
  },
  segmentBtn: {
    flex: 1,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  segmentBtnActive: { backgroundColor: "#EAF3FF" },
  segmentText: { fontSize: 15, fontWeight: "500", color: "#808080" },
  segmentTextActive: { color: Colors.primary, fontWeight: "700" },
});
