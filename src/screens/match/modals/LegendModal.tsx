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

interface LegendModalProps {
  visible: boolean;
  players: PlayerScore[];
  onClose: () => void;
}

export const LegendModal: React.FC<LegendModalProps> = ({
  visible,
  players,
  onClose,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={[styles.holeDetailContent, { paddingBottom: 30 }]}>
          <View style={styles.modalHeaderRow}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="chevron-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Chú thích</Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.legendCard}>
            <View style={styles.legendPlayersRow}>
              {players.map((p, i) => (
                <View key={i} style={styles.legendPlayerItem}>
                  <View
                    style={[
                      styles.legendAvatarWrap,
                      i === 0 && styles.borderGray,
                      i === 1 && styles.borderBlack,
                      i === 2 && styles.borderRed,
                      i === 3 && styles.borderGreen,
                    ]}
                  >
                    <Image
                      source={{ uri: p.avatar }}
                      style={styles.legendAvatar}
                    />
                  </View>
                  <Text style={styles.legendPlayerCode}>
                    {String.fromCharCode(65 + i)}
                  </Text>
                  <View style={[styles.miniScoreBadge]}>
                    <Text style={styles.miniScoreText}>+2</Text>
                  </View>
                </View>
              ))}
            </View>

            <Text style={styles.legendDesc}>
              Để thuận tiện hơn trong việc tính điểm từng hố, chúng tôi đưa ra
              các ký hiệu minh hoạ hố chấp tại đây
            </Text>

            <View style={styles.legendItemList}>
              <View style={styles.legendItem}>
                <View style={[styles.legendAvatarWrap, styles.borderBlack]}>
                  <Image
                    source={{ uri: players[1].avatar }}
                    style={styles.legendAvatar}
                  />
                </View>
                <Text style={styles.legendItemText}>Được chấp</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendAvatarWrap, styles.borderRed]}>
                  <Image
                    source={{ uri: players[2].avatar }}
                    style={styles.legendAvatar}
                  />
                </View>
                <Text style={styles.legendItemText}>Không chấp</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendAvatarWrap, styles.borderGreen]}>
                  <Image
                    source={{ uri: players[3].avatar }}
                    style={styles.legendAvatar}
                  />
                </View>
                <Text style={styles.legendItemText}>Chấp</Text>
              </View>
            </View>

            <Text style={styles.legendFooterText}>
              Trong hố này A sẽ được chấp bởi B; A và C không chấp; A sẽ chấp D
            </Text>
          </View>

          <TouchableOpacity style={styles.continueLongBtn}>
            <Text style={styles.continueLongBtnText}>Tiếp tục (ngang)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  holeDetailContent: {
    width: width * 0.9,
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
  },
  modalHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", textAlign: "center" },
  legendCard: { marginVertical: 16 },
  legendPlayersRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  legendPlayerItem: { alignItems: "center" },
  legendAvatarWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    padding: 2,
    backgroundColor: "#FFF",
  },
  legendAvatar: { width: "100%", height: "100%", borderRadius: 21 },
  borderGray: { borderWidth: 2, borderColor: "#DDD" },
  borderBlack: { borderWidth: 2, borderColor: "#333" },
  borderRed: { borderWidth: 2, borderColor: "#ED1C24" },
  borderGreen: { borderWidth: 2, borderColor: "#00A651" },
  legendPlayerCode: { marginTop: 4, fontWeight: "600" },
  miniScoreBadge: {
    backgroundColor: "#0061AF20",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 4,
  },
  miniScoreText: { color: "#0061AF", fontSize: 10, fontWeight: "bold" },
  legendDesc: { color: "#333", lineHeight: 20, marginBottom: 16 },
  legendItemList: { gap: 12, marginBottom: 16 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 12 },
  legendItemText: { fontSize: 14, fontWeight: "500" },
  legendFooterText: {
    fontSize: 13,
    color: "#333",
    fontStyle: "italic",
  },
  continueLongBtn: {
    backgroundColor: "#F0F0F0",
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
  },
  continueLongBtnText: { fontWeight: "bold" },
});
