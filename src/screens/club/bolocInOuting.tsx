
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Boloc() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.sheetContent}
    >
      
      <View>
        <Text style={styles.sectionTitle}>Mùa giải</Text>
      </View>
      <TouchableOpacity style={styles.dropdownBox}>
        <Text style={styles.dropdownText}>Chọn mùa giải</Text>
        <Ionicons name="chevron-down" size={18} color="#666" />
      </TouchableOpacity>

      
      <View>
        <Text style={styles.sectionTitle}>Trạng thái</Text>
      </View>
      <View style={styles.chipContainer}>
        
        <TouchableOpacity style={[styles.chip, styles.chipActive]}>
          <Ionicons name="calendar-outline" size={16} color="#0066CC" />
          <Text style={[styles.chipText, styles.chipTextActive]}>
            Sắp diễn ra
          </Text>
        </TouchableOpacity>
       
        <TouchableOpacity style={styles.chip}>
          <Ionicons name="radio-button-on-outline" size={16} color="#666" />
          <Text style={styles.chipText}>Đang diễn ra</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chip}>
          <Ionicons name="calendar-clear-outline" size={16} color="#666" />
          <Text style={styles.chipText}>Đã kết thúc</Text>
        </TouchableOpacity>
      </View>

      
      <View>
        <Text style={styles.sectionTitle}>Khoảng thời gian</Text>
      </View>
      <View style={styles.rowInputs}>
        <View style={styles.inputBoxWrap}>
          <Text style={styles.inputLabel}>Từ</Text>
          <View style={styles.inputInner}>
            <Text style={styles.inputValueText}>20/10/2023</Text>
            <Ionicons name="calendar-outline" size={18} color="#333" />
          </View>
        </View>
        <View style={styles.dash} />
        <View style={styles.inputBoxWrap}>
          <Text style={styles.inputLabel}>Đến</Text>
          <View style={styles.inputInner}>
            <Text style={styles.inputValueText}>20/10/2023</Text>
            <Ionicons name="calendar-outline" size={18} color="#333" />
          </View>
        </View>
      </View>

      <View>
        <Text style={styles.sectionTitle}>Số lượng golfer</Text>
      </View>
      <View style={styles.rowInputs}>
        <View style={styles.inputBoxWrap}>
          <Text style={styles.inputLabel}>Từ</Text>
          <TextInput
            style={styles.inputValueInput}
            defaultValue="2"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.dash} />
        <View style={styles.inputBoxWrap}>
          <Text style={styles.inputLabel}>Đến</Text>
          <TextInput
            style={styles.inputValueInput}
            defaultValue="4"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View>
        <Text style={styles.sectionTitle}>Số lượng fly</Text>
      </View>
      <View style={styles.rowInputs}>
        <View style={styles.inputBoxWrap}>
          <Text style={styles.inputLabel}>Từ</Text>
          <TextInput
            style={styles.inputValueInput}
            placeholder="Nhập"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.dash} />
        <View style={styles.inputBoxWrap}>
          <Text style={styles.inputLabel}>Đến</Text>
          <TextInput
            style={styles.inputValueInput}
            placeholder="Nhập"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sheetContent: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginTop: 20,
    marginBottom: 12,
  },
  dropdownBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignSelf: "flex-start",
  },
  dropdownText: {
    fontSize: 14,
    color: "#666",
    marginRight: 8,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipActive: {
    borderColor: "#0066CC",
    backgroundColor: "#F0F7FF",
  },
  chipText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 6,
  },
  chipTextActive: {
    color: "#0066CC",
    fontWeight: "500",
  },
  rowInputs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputBoxWrap: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 12,
  },
  inputLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  inputInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputValueText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  inputValueInput: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    padding: 0,
    height: 20,
  },
  dash: {
    width: 12,
    height: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 12,
  },
});
