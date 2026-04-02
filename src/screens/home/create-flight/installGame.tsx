import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../constants/colors";
import {
  EverythingSection,
  TeamXoaySection,
  TeamCoDefinedSection,
  ContractSection,
  QuyGaSection,
} from "../../../components/common/SettingsSections";
import SelectionCard from "../../../components/common/SelectionCard";
import { SavedGameModal, SavedGame } from "./components/SavedGameModal";
import { MOCK_SAVED_GAMES } from "./mock-data";

export default function InstallGame() {
  const navigation = useNavigation();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  // Modal "Game đã lưu"
  const [savedGameModalVisible, setSavedGameModalVisible] = useState(false);

  // Everything section state
  const [everythingFilter, setEverythingFilter] = useState("nothing");

  // Team Xoay section state
  const [teamXoaySettings, setTeamXoaySettings] = useState<{
    holeCount: number;
    comparison: "best" | "all" | "weakest";
    byMonth: boolean;
    playBest: boolean;
    restrictions: boolean;
  }>({
    holeCount: 3,
    comparison: "best",
    byMonth: false,
    playBest: true,
    restrictions: false,
  });

  // Team Cố Định section state
  const [teamCoDefinedSettings, setTeamCoDefinedSettings] = useState<{
    holeCount: number;
    comparison: "best" | "all" | "weakest";
  }>({
    holeCount: 3,
    comparison: "best",
  });

  // Contract section state
  const [contractSettings, setContractSettings] = useState<{
    skinsOut: string;
    skinsIn: string;
    skinsTotal: string;
  }>({
    skinsOut: "",
    skinsIn: "",
    skinsTotal: "",
  });

  // Quy gà section state
  const [quyGaSettings, setQuyGaSettings] = useState<{
    skinsPerHole: string;
    condition: "birdie" | "eagle" | "par" | "";
  }>({
    skinsPerHole: "",
    condition: "",
  });

  const handleBack = () => {
    navigation.goBack();
  };

  // Khôi phục tất cả settings từ game đã lưu
  const handleSelectSavedGame = (game: SavedGame) => {
    const { settings } = game;
    setSelectedSection(settings.selectedSection);
    setEverythingFilter(settings.everythingFilter);
    setTeamXoaySettings(settings.teamXoaySettings);
    setTeamCoDefinedSettings(settings.teamCoDefinedSettings);
    setContractSettings(settings.contractSettings);
    setQuyGaSettings(settings.quyGaSettings);
  };

  const settingSections = [
    { id: "everything", label: "Everything", memberCount: 4 },
    { id: "teamxoay", label: "Team xoay", memberCount: 4 },
    { id: "teamcodefined", label: "Team cố định", memberCount: 0 },
    { id: "hopdong", label: "Hợp đồng", memberCount: 0 },
    { id: "quyga", label: "Quỹ gà", memberCount: 0 },
  ];

  return (
    <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
              <Ionicons name="chevron-back" size={20} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Cài đặt game</Text>
            <View style={styles.placeholder} />
          </View>

          {/* NÚT "GAME ĐÃ LƯU" */}
          <View style={styles.savedGameBtnWrap}>
            <TouchableOpacity
              style={styles.savedGameBtn}
              activeOpacity={0.7}
              onPress={() => setSavedGameModalVisible(true)}
            >
              <Ionicons name="bookmark-outline" size={18} color={Colors.primary} />
              <Text style={styles.savedGameBtnText}>Game đã lưu</Text>
              <Ionicons name="chevron-forward" size={16} color="#999" />
            </TouchableOpacity>
          </View>

          {/* CHECKBOX SECTION LỒNG ACCORDION */}
          <View style={styles.checkboxSection}>
            {settingSections.map((section) => {
              const isActive = selectedSection === section.id;

              return (
                <View key={section.id} style={[styles.accordionWrapper]}>
                  {/* Phần Header chứa Checkbox */}
                  <SelectionCard
                    isChecked={isActive}
                    onPress={() =>
                      setSelectedSection(isActive ? null : section.id)
                    }
                    style={[isActive && styles.settingCardHeaderActive]}
                  >
                    <View style={styles.cardContent}>
                      <Text style={styles.cardLabel}>{section.label}</Text>
                      {section.memberCount > 0 && (
                        <View style={styles.badge}>
                          <Text style={styles.badgeText}>
                            {section.memberCount}
                          </Text>
                          <Ionicons
                            name="people"
                            size={12}
                            color={Colors.white}
                            style={{ marginLeft: 4 }}
                          />
                        </View>
                      )}
                    </View>
                  </SelectionCard>

                  {/* Phần Nội dung thả xuống */}
                  {isActive && (
                    <View style={styles.accordionContent}>
                      {section.id === "everything" && (
                        <EverythingSection
                          selectedFilter={everythingFilter}
                          onFilterChange={setEverythingFilter}
                        />
                      )}
                      {section.id === "teamxoay" && (
                        <TeamXoaySection
                          settings={teamXoaySettings}
                          onSettingsChange={setTeamXoaySettings}
                        />
                      )}
                      {section.id === "teamcodefined" && (
                        <TeamCoDefinedSection
                          settings={teamCoDefinedSettings}
                          onSettingsChange={setTeamCoDefinedSettings}
                        />
                      )}
                      {section.id === "hopdong" && (
                        <ContractSection
                          settings={contractSettings}
                          onSettingsChange={setContractSettings}
                        />
                      )}
                      {section.id === "quyga" && (
                        <QuyGaSection
                          settings={quyGaSettings}
                          onSettingsChange={setQuyGaSettings}
                        />
                      )}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* MODAL GAME ĐÃ LƯU */}
      <SavedGameModal
        visible={savedGameModalVisible}
        savedGames={MOCK_SAVED_GAMES}
        onSelect={handleSelectSavedGame}
        onClose={() => setSavedGameModalVisible(false)}
      />

      <View style={styles.footerWrap}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              // { width: canContinue ? "50%" : "50%" },
            ]}
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.ReturnBtn]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.continueReturn]}>Quay lại</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.continueBtn]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.continueText]}>Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F4F6F9" },
  container: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  header: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    top: 10,
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "600",
    color: "#1A1A1A",
    marginLeft: 10,
  },
  placeholder: { width: 36 },

  checkboxSection: { paddingHorizontal: 16, paddingVertical: 8 },

  /* NÚT GAME ĐÃ LƯU */
  savedGameBtnWrap: {
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  savedGameBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    gap: 10,
  },
  savedGameBtnText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
  },

  /* ACCORDION WRAPPER (Khung bao ngoài) */
  accordionWrapper: {
    marginVertical: 6,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    overflow: "hidden",
  },
  footerWrap: { backgroundColor: Colors.white, bottom: 0 },
  progressBar: { height: 3, backgroundColor: "#E8E8E8" },
  progressFill: { height: 3, backgroundColor: Colors.primary },
  footer: {
    bottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    width: "100%",
  },
  continueBtn: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#0061AF",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 8,
  },
  continueBtnActive: {
    backgroundColor: Colors.primary,
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  continueText: { fontSize: 16, fontWeight: "700", color: "#ffffff" },
  continueTextActive: { color: Colors.white },

  ReturnBtn: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 8,
    borderBlockColor: "#0061AF",
    borderWidth: 1,
    borderStyle: "solid",
  },
  continueReturn: { fontSize: 16, fontWeight: "700", color: "#0061AF" },

  settingCardHeaderActive: {
    borderBottomColor: "#E8E8E8", // Vạch kẻ ngang ngăn cách
  },

  cardContent: { flex: 1, flexDirection: "row", alignItems: "center", gap: 8 },
  cardLabel: { fontSize: 14, fontWeight: "600", color: Colors.text },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0052CC",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  badgeText: { fontSize: 11, fontWeight: "600", color: Colors.white },

  /* NỘI DUNG THẢ XUỐNG */
  accordionContent: {
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: Colors.white,
  },
  placeholderSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: "center",
  },
  placeholderText: { fontSize: 14, color: Colors.textSecondary },
});
