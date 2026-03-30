import React, { useState } from "react";
import {
  View, Text, Modal, TouchableOpacity,
  StyleSheet, Platform, ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../../constants/colors";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const HOURS = [
  "6:00", "6:30", "7:00", "7:30", "8:00", "8:30",
  "9:00", "9:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00",
];

interface TeeTimePickerModalProps {
  visible: boolean;
  selectedDate: string; // "YYYY-MM-DD"
  selectedTime: string; // "HH:mm"
  onConfirm: (date: string, time: string) => void;
  onClose: () => void;
}

/** Modal chọn Tee time: Lịch tháng + chọn giờ */
export const TeeTimePickerModal: React.FC<TeeTimePickerModalProps> = ({
  visible, selectedDate, selectedTime, onConfirm, onClose,
}) => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth()); // 0-indexed
  const [tempDate, setTempDate] = useState(selectedDate);
  const [tempTime, setTempTime] = useState(selectedTime || "8:00");
  const [showTimePicker, setShowTimePicker] = useState(false);

  React.useEffect(() => {
    if (visible) {
      setTempDate(selectedDate);
      setTempTime(selectedTime || "8:00");
      setViewYear(today.getFullYear());
      setViewMonth(today.getMonth());
      setShowTimePicker(false);
    }
  }, [visible]);

  // Helpers lịch
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const formatDate = (day: number) =>
    `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const handleConfirm = () => {
    onConfirm(tempDate, tempTime);
    onClose();
  };

  // Tạo mảng cells cho calendar grid
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  // Thêm cells cuối cho đủ hàng
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.dragHandle} />

          <View style={styles.header}>
            <View />
            <Text style={styles.title}>Chọn tee time</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
            {/* Month Navigation */}
            <View style={styles.monthRow}>
              <TouchableOpacity onPress={prevMonth}>
                <Text style={styles.monthTitle}>
                  {monthNames[viewMonth]} {viewYear}{" "}
                  <Ionicons name="chevron-forward" size={14} color={Colors.primary} />
                </Text>
              </TouchableOpacity>
              <View style={styles.monthNav}>
                <TouchableOpacity onPress={prevMonth} style={styles.navBtn}>
                  <Ionicons name="chevron-back" size={20} color={Colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={nextMonth} style={styles.navBtn}>
                  <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Day Headers */}
            <View style={styles.dayHeaderRow}>
              {DAYS.map((d) => (
                <Text key={d} style={styles.dayHeader}>{d}</Text>
              ))}
            </View>

            {/* Calendar Grid */}
            <View style={styles.calGrid}>
              {cells.map((day, idx) => {
                if (day === null) {
                  return <View key={`empty-${idx}`} style={styles.dayCell} />;
                }
                const dateStr = formatDate(day);
                const isToday = dateStr === todayStr;
                const isSelected = dateStr === tempDate;

                return (
                  <TouchableOpacity
                    key={dateStr}
                    style={styles.dayCell}
                    onPress={() => setTempDate(dateStr)}
                  >
                    <View
                      style={[
                        styles.dayCircle,
                        isSelected && styles.dayCircleSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          isToday && styles.dayTextToday,
                          isSelected && styles.dayTextSelected,
                        ]}
                      >
                        {day}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Time Picker */}
            <View style={styles.timeRow}>
              <Text style={styles.timeLabel}>Thời gian</Text>
              <TouchableOpacity
                style={styles.timeValue}
                onPress={() => setShowTimePicker(!showTimePicker)}
              >
                <Text style={styles.timeText}>{tempTime}</Text>
              </TouchableOpacity>
            </View>

            {showTimePicker && (
              <View style={styles.timeGrid}>
                {HOURS.map((h) => (
                  <TouchableOpacity
                    key={h}
                    style={[styles.timeBtn, tempTime === h && styles.timeBtnActive]}
                    onPress={() => { setTempTime(h); setShowTimePicker(false); }}
                  >
                    <Text style={[styles.timeBtnText, tempTime === h && styles.timeBtnTextActive]}>
                      {h}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </ScrollView>

          <View style={styles.footerBtn}>
            <TouchableOpacity
              style={[styles.confirmBtn, !tempDate && styles.confirmBtnDisabled]}
              onPress={handleConfirm}
              disabled={!tempDate}
            >
              <Text style={[styles.confirmText, !tempDate && styles.confirmTextDisabled]}>
                Xác nhận
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  sheet: {
    backgroundColor: "#FFF", borderTopLeftRadius: 24, borderTopRightRadius: 24,
    maxHeight: "80%", paddingBottom: Platform.OS === "ios" ? 34 : 16,
  },
  dragHandle: {
    width: 40, height: 4, borderRadius: 2, backgroundColor: "#D0D0D0",
    alignSelf: "center", marginTop: 10, marginBottom: 8,
  },
  header: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: 20, paddingVertical: 12,
  },
  title: { fontSize: 17, fontWeight: "700", color: "#1A1A1A" },

  // Month
  monthRow: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: 20, paddingVertical: 10,
  },
  monthTitle: { fontSize: 16, fontWeight: "700", color: "#1A1A1A" },
  monthNav: { flexDirection: "row", gap: 8 },
  navBtn: {
    width: 32, height: 32, borderRadius: 16,
    justifyContent: "center", alignItems: "center",
  },

  // Day Headers
  dayHeaderRow: {
    flexDirection: "row", paddingHorizontal: 16, marginBottom: 4,
  },
  dayHeader: {
    flex: 1, textAlign: "center",
    fontSize: 12, fontWeight: "600", color: "#999",
  },

  // Calendar Grid
  calGrid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 16 },
  dayCell: { width: "14.28%", alignItems: "center", marginVertical: 4 },
  dayCircle: {
    width: 38, height: 38, borderRadius: 19,
    justifyContent: "center", alignItems: "center",
  },
  dayCircleSelected: {
    borderWidth: 2, borderColor: Colors.primary,
  },
  dayText: { fontSize: 15, color: "#333" },
  dayTextToday: { color: Colors.primary, fontWeight: "700" },
  dayTextSelected: { color: Colors.primary, fontWeight: "700" },

  // Time
  timeRow: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: 20, paddingVertical: 14,
    borderTopWidth: 1, borderTopColor: "#F0F0F0", marginTop: 8,
  },
  timeLabel: { fontSize: 15, fontWeight: "600", color: "#333" },
  timeValue: {
    backgroundColor: "#F0F0F0", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10,
  },
  timeText: { fontSize: 15, fontWeight: "600", color: "#333" },
  timeGrid: {
    flexDirection: "row", flexWrap: "wrap",
    paddingHorizontal: 16, paddingTop: 8, gap: 8,
  },
  timeBtn: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10,
    borderWidth: 1, borderColor: "#E0E0E0", backgroundColor: "#FFF",
  },
  timeBtnActive: { borderColor: Colors.primary, backgroundColor: "#EAF3FF" },
  timeBtnText: { fontSize: 13, color: "#666" },
  timeBtnTextActive: { color: Colors.primary, fontWeight: "700" },

  // Footer
  footerBtn: { paddingHorizontal: 20, paddingTop: 12 },
  confirmBtn: {
    height: 56, borderRadius: 16, backgroundColor: Colors.primary,
    justifyContent: "center", alignItems: "center",
  },
  confirmBtnDisabled: { backgroundColor: "#F0F0F0" },
  confirmText: { fontSize: 16, fontWeight: "700", color: "#FFF" },
  confirmTextDisabled: { color: "#9E9E9E" },
});
