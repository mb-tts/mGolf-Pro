
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,


} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { CourseDetails, HoleData } from "@/types/golf.types";

export default function Sandau({ courseDetails }: { courseDetails: CourseDetails }) {
  return (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>{courseDetails.name}</Text>

      <View style={styles.courseContactBox}>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={18} color="#0055A5" />
          <Text style={styles.courseInfoText}>{courseDetails.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="golf-outline" size={18} color="#0055A5" />
          <Text style={styles.courseInfoText}>{courseDetails.holes}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={18} color="#0055A5" />
          <Text style={styles.courseInfoText}>
            {courseDetails.operatingHours}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={18} color="#0055A5" />
          <Text style={styles.courseInfoText}>{courseDetails.phone}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Thông tin giới thiệu</Text>
      <Text style={styles.descText}>
        {courseDetails.description}{" "}
        <Text style={styles.readMore}>xem thêm</Text>
      </Text>

      <Text style={styles.sectionTitle}>Hình ảnh sân đấu</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imageList}
      >
        {courseDetails.courseImages.map((img: string, idx: number) => (
          <Image key={idx} source={{ uri: img }} style={styles.courseImg} />
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Bảng điểm (Scorecard)</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tableWrapper}
      >
        <View>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.cell, styles.colHole, { fontWeight: "bold" }]}>
              Hole
            </Text>
            {courseDetails.scorecard.map((s: HoleData) => (
              <Text
                key={`h${s.hole}`}
                style={[styles.cell, styles.colNum, { fontWeight: "bold" }]}
              >
                {s.hole}
              </Text>
            ))}
          </View>
          <View style={[styles.tableRow, { backgroundColor: "#F5F5F5" }]}>
            <Text style={[styles.cell, styles.colHole, { fontWeight: "bold" }]}>
              Black
            </Text>
            {courseDetails.scorecard.map((s: HoleData) => (
              <Text key={`b${s.hole}`} style={[styles.cell, styles.colNum]}>
                {s.black}
              </Text>
            ))}
          </View>
          <View style={[styles.tableRow, { backgroundColor: "#D1E8FF" }]}>
            <Text style={[styles.cell, styles.colHole, { fontWeight: "bold" }]}>
              Blue
            </Text>
            {courseDetails.scorecard.map((s: HoleData) => (
              <Text key={`bl${s.hole}`} style={[styles.cell, styles.colNum]}>
                {s.blue}
              </Text>
            ))}
          </View>
          <View style={[styles.tableRow, { backgroundColor: "#FFFFFF" }]}>
            <Text style={[styles.cell, styles.colHole, { fontWeight: "bold" }]}>
              White
            </Text>
            {courseDetails.scorecard.map((s: HoleData) => (
              <Text key={`w${s.hole}`} style={[styles.cell, styles.colNum]}>
                {s.white}
              </Text>
            ))}
          </View>
          <View style={[styles.tableRow, { backgroundColor: "#FF7F8F" }]}>
            <Text style={[styles.cell, styles.colHole, { fontWeight: "bold" }]}>
              Red
            </Text>
            {courseDetails.scorecard.map((s: HoleData) => (
              <Text key={`r${s.hole}`} style={[styles.cell, styles.colNum]}>
                {s.red}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  tabContent: { paddingTop: 10 , flex: 1  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    marginTop: 8,
  },
  courseContactBox: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 0,
  },
  courseInfoText: { marginLeft: 12, color: "#444", fontSize: 14 },

  descText: { fontSize: 14, color: "#555", lineHeight: 22, marginBottom: 10 },
  readMore: { color: "#999", fontWeight: "bold" },

  imageList: { flexDirection: "row", marginBottom: 10 },
  courseImg: { width: 220, height: 160, borderRadius: 12, marginRight: 12 },

  tableWrapper: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  tableHeader: { backgroundColor: "#FFE4B5" },
  cell: {
    paddingVertical: 8,
    textAlign: "center",
    fontSize: 13,
    borderRightWidth: 1,
    borderRightColor: "#EEE",
  },
  colHole: { width: 150, paddingLeft: 10, textAlign: "left" },
  colNum: { width: 45 },
  // ... các styles cũ giữ nguyên

  // STYLES CHO TAB THỂ LỆ
  ruleSection: {
    marginBottom: 24,
  },
  ruleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textTransform: "uppercase", // Tự động in hoa giống ảnh
  },
  ruleText: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
    marginBottom: 6,
  },
  bulletList: {
    marginTop: 4,
    paddingLeft: 8, // Thụt lề nhẹ cho nguyên cụm list
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  bulletDot: {
    fontSize: 18,
    lineHeight: 22,
    color: "#444",
    marginRight: 8,
    marginTop: -2, // Đẩy dấu chấm lên tí cho cân bằng với chữ
  },
  bulletText: {
    flex: 1, // Cực kỳ quan trọng: Giúp text dài tự động xuống dòng và không chui dưới dấu chấm
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
  },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
});
