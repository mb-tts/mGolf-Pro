import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,

} from "react-native";


export default function Thele({ rules }: any) {
  return (
    <View style={styles.tabContent}>
      {rules.map((rule) => (
        <View key={rule.id} style={styles.ruleSection}>
          {/* Tiêu đề (VD: 1. ĐIỀU HÀNH GIẢI) */}
          <Text style={styles.ruleTitle}>{rule.title}</Text>

          {/* Nội dung chung (Nếu có) */}
          {!!rule.content && (
            <Text style={styles.ruleText}>{rule.content}</Text>
          )}

          {/* Tiêu đề phụ (Nếu có) */}
          {!!rule.subContent && (
            <Text style={styles.ruleText}>{rule.subContent}</Text>
          )}

          {/* Vòng lặp in ra các gạch đầu dòng */}
          {rule.bullets && rule.bullets.length > 0 && (
            <View style={styles.bulletList}>
              {rule.bullets.map((bullet, index) => (
                <View key={index} style={styles.bulletRow}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
      <View style={{ height: 40 }} />
    </View>
  );
}
const styles = StyleSheet.create({
  // STYLES CHO TAB THỂ LỆ
  tabContent: { paddingTop: 20 },
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
});
