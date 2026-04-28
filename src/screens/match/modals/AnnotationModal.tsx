import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface PlayerScore {
  name: string;
  avatar: string;
  score: number;
  relative: number;
  id?: string;
}

interface AnnotationModalProps {
  visible: boolean;
  players: PlayerScore[];
  onClose: () => void;
}

export const AnnotationModal: React.FC<AnnotationModalProps> = ({
  visible,
  players,
  onClose,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeaderRow}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Chú thích</Text>
            <View style={{ width: 24 }} />
          </View>

        {/* Bảng phân tích người chơi trên cùng */}
          <View style={styles.topPanelContainer}>
            <View style={styles.bottomOverlay} pointerEvents="none" />
            {players.map((p, i) => {
              const isHighlight = true;
              const isSelected = i === 0; 
              return (
                <View
                  key={i}
                  style={[
                    styles.topPlayerCol,
                    isSelected && styles.topPlayerColActive,
                  ]}
                >
                <View
                  style={[
                    styles.highlightWrap,
                    isHighlight && styles.highlightActive
                  ]}
                >
                  <View
                    style={[
                      styles.avatarWrap,
                      isSelected && styles.avatarWrapActive,
                      i === 2 && styles.borderRed,
                      i === 3 && styles.borderGreen,
                    ]}
                  >
                    <Image source={{ uri: p.avatar }} style={styles.avatar} />
                  </View>
                  <Text
                    style={[
                      styles.playerCode,
                      isSelected ? styles.textDark : styles.textGray,
                    ]}
                  >
                    {String.fromCharCode(65 + i)}
                  </Text>
                </View>
                  <View
                    style={[
                      styles.scoreBadge,
                      isSelected ? styles.scoreBadgeActive : styles.scoreBadgeInactive,
                    ]}
                  >
                    <Text
                      style={isSelected ? styles.scoreTextActive : styles.scoreTextInactive}
                    >
                      {p.relative > 0 ? `+${p.relative}` : p.relative}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Mô tả chung */}
          <Text style={styles.descText}>
            Để thuận tiện hơn trong việc tính điểm từng hố, chúng tôi đưa ra các ký hiệu minh hoạ hố chấp tại đây
          </Text>

          {/* Danh sách chú thích */}
          <View style={styles.legendList}>
            {/* Chú thích B */}
            <View style={styles.legendRow}>
              <View style={styles.legendAvatarCol}>
                <View style={styles.avatarWrap}>
                  <Image source={{ uri: players[1].avatar }} style={styles.avatar} />
                </View>
                <Text style={styles.legendPlayerCode}>B</Text>
              </View>
              <Text style={styles.legendLabelText}>Được chấp</Text>
            </View>

            {/* Chú thích C */}
            <View style={styles.legendRow}>
              <View style={styles.legendAvatarCol}>
                <View style={[styles.avatarWrap, styles.borderRed]}>
                  <Image source={{ uri: players[2].avatar }} style={styles.avatar} />
                </View>
                <Text style={styles.legendPlayerCode}>C</Text>
              </View>
              <Text style={styles.legendLabelText}>Không chấp</Text>
            </View>

            {/* Chú thích D */}
            <View style={styles.legendRow}>
              <View style={styles.legendAvatarCol}>
                <View style={[styles.avatarWrap, styles.borderGreen]}>
                  <Image source={{ uri: players[3].avatar }} style={styles.avatar} />
                </View>
                <Text style={styles.legendPlayerCode}>D</Text>
              </View>
              <Text style={styles.legendLabelText}>Chấp</Text>
            </View>
          </View>

          {/* Footer Text */}
          <Text style={styles.footerText}>
            Trong hố này <Text style={styles.footerTextBold}>A sẽ được chấp bởi B; A và C không chấp; A sẽ chấp D</Text>
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: width * 0.9,
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 24,
  },
  modalHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 4,
    marginLeft: -4,
  },
  modalTitle: { 
    fontSize: 18, 
    fontWeight: "600",
    color: "#333",
  },

    highlightWrap: {
    alignItems: "center",
    zIndex: 2, 
  },

  highlightActive: {
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  
  /* Cập nhật StyleSheet của bạn với các kiểu này */

  topPanelContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF", 
    borderRadius: 16,
    overflow: "hidden", 
    marginBottom: 20,
  },
  topPlayerCol: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,

  },
  topPlayerColActive: {
    backgroundColor: "#DFE5EB", 
  },

  bottomOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%", 
    backgroundColor: "#00000080",
    zIndex: 1,
  },
  
  /* Cập nhật kiểu avatarWrap mặc định */
  avatarWrap: {
    width: 38,
    height: 38,
    borderRadius: 19, 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EAECEF",
    borderWidth: 2, 
    borderColor: "transparent", 
  },
  
  avatarWrapActive: {
    shadowColor: "rgba(0,0,0,0.3)", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6, 
    elevation: 4, 
  },
  
  avatar: { 
    width: 32, 
    height: 32, 
    borderRadius: 16 
  },
  borderRed: { borderColor: "#ED1C24" },
  borderGreen: { borderColor: "#00A651" }, 
  
  /* Phần còn lại của StyleSheet giữ nguyên */
  playerCode: { 
    marginTop: 8, 
    fontWeight: "600",
    fontSize: 14,
  },
  textDark: { color: "#333" },
  textGray: { color: "#5F5F5F" },
  scoreBadge: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreBadgeActive: {
    backgroundColor: "#0061AF", 
  },
  scoreBadgeInactive: {
    backgroundColor: "#FFF", 
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  scoreTextActive: { 
    color: "#FFF", 
    fontSize: 12, 
    fontWeight: "600" 
  },
  scoreTextInactive: { 
    color: "#0061AF", 
    fontSize: 12, 
    fontWeight: "500" 
  },

  /* Text Descriptions */
  descText: { 
    color: "#000", 
    lineHeight: 22, 
    fontSize: 14,
    marginBottom: 20,
  },
  
  /* Legend List */
  legendList: {
    marginBottom: 20,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  legendAvatarCol: {
    alignItems: "center",
    width: 50,
    marginRight: 12,
  },
  legendPlayerCode: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  legendLabelText: {
    fontSize: 15,
    color: "#000",
  },
  
  /* Footer */
  footerText: {
    fontSize: 14,
    color: "#000",
    lineHeight: 22,
  },

  footerTextBold: {
    fontWeight: "bold",
  }
});