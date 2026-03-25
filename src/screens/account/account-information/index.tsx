import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  FlatList,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";

interface AccountInfoScreenProps {
  navigation?: any;
}

export const AccountInformationScreen: React.FC<AccountInfoScreenProps> = ({
  navigation,
}) => {
  const [fullName, setFullName] = useState("Nguyễn Văn Anh");
  const [vgaCode, setVgaCode] = useState("1234568");
  const [handicap, setHandicap] = useState("30");
  const [phone, setPhone] = useState("0912345678");
  const [email, setEmail] = useState("nvlinh@mobifone.vn");
  const [memberShip, setMemberShip] = useState("Basic");
  const [teeBox, setTeeBox] = useState("Blue");

  const [membershipModal, setMembershipModal] = useState(false);
  const [teeBoxModal, setTeeBoxModal] = useState(false);

  const membershipOptions = ["Basic", "Silver", "Gold", "Platinum"];
  const teeBoxOptions = ["Red", "White", "Blue", "Black", "Green"];

  const handleUpdate = () => {
    Alert.alert("Thành công", "Cập nhật thông tin tài khoản thành công!");
  };

  const handleBack = () => {
    if (navigation?.goBack) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
        
      <SafeAreaView edges={["top"]}>
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={28} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thông tin tài khoản</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Avatar Section */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=3" }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Ionicons name="camera" size={18} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Họ và tên */}
          <View style={styles.fieldGroup}>
            <View style={styles.fieldValueBox}>
              <Text style={styles.fieldLabel}>Họ và tên</Text>
              <Text style={styles.fieldValue}>{fullName}</Text>
            </View>
          </View>

          {/* Mã VGA */}
          <View style={styles.fieldGroup}>
            <View style={styles.fieldValueBox}>
              <Text style={styles.fieldLabel}>Mã VGA</Text>
              <Text style={styles.fieldValue}>{vgaCode}</Text>
            </View>
          </View>

          {/* HDC Index */}
          <View style={styles.fieldGroup}>
            <View style={styles.fieldValueBox}>
              <Text style={styles.fieldLabel}>HDC Index</Text>
              <Text style={styles.fieldValue}>{handicap}</Text>
            </View>
          </View>

          {/* Số điện thoại */}
          <View style={styles.fieldGroup}>
            <View style={styles.fieldValueBox}>
              <Text style={styles.fieldLabel}>Số điện thoại</Text>
              <TextInput
                style={styles.inputInBox}
                value={phone}
                onChangeText={setPhone}
                placeholder="Nhập số điện thoại"
                placeholderTextColor={Colors.placeholder}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.fieldGroup}>
            <View style={styles.fieldValueBox}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                style={styles.inputInBox}
                value={email}
                onChangeText={setEmail}
                placeholder="Nhập email"
                placeholderTextColor={Colors.placeholder}
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Hạng hội viên */}
          <View style={styles.fieldGroup}>
            <View style={styles.fieldValueBox}>
              <Text style={styles.fieldLabel}>Hạng hội viên</Text>
              <TouchableOpacity
                style={styles.selectInputInBox}
                onPress={() => setMembershipModal(true)}
              >
                <Text style={styles.selectText}>{memberShip}</Text>
                <Ionicons
                  name="chevron-down"
                  size={16}
                  color={Colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Tee box */}
          <View style={styles.fieldGroup}>
            <View style={styles.fieldValueBox}>
              <Text style={styles.fieldLabel}>Tee box</Text>
              <TouchableOpacity
                style={styles.selectInputInBox}
                onPress={() => setTeeBoxModal(true)}
              >
                <Text style={styles.selectText}>{teeBox}</Text>
                <Ionicons
                  name="chevron-down"
                  size={16}
                  color={Colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
      {/* Update Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
          <Text style={styles.updateBtnText}>Cập nhật</Text>
        </TouchableOpacity>
      </View>

      {/* Membership Modal */}
      <Modal
        visible={membershipModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setMembershipModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chọn hạng hội viên</Text>
              <TouchableOpacity onPress={() => setMembershipModal(false)}>
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={membershipOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    memberShip === item && styles.selectedOption,
                  ]}
                  onPress={() => {
                    setMemberShip(item);
                    setMembershipModal(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      memberShip === item && styles.selectedOptionText,
                    ]}
                  >
                    {item}
                  </Text>
                  {memberShip === item && (
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color={Colors.primary}
                    />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Tee Box Modal */}
      <Modal
        visible={teeBoxModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setTeeBoxModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chọn Tee box</Text>
              <TouchableOpacity onPress={() => setTeeBoxModal(false)}>
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={teeBoxOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    teeBox === item && styles.selectedOption,
                  ]}
                  onPress={() => {
                    setTeeBox(item);
                    setTeeBoxModal(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      teeBox === item && styles.selectedOptionText,
                    ]}
                  >
                    {item}
                  </Text>
                  {teeBox === item && (
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color={Colors.primary}
                    />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F2F4F7",
  },
  backBtn: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.text,
    flex: 1,
    textAlign: "center",
  },
  placeholder: {
    width: 44,
  },
  avatarContainer: {
    alignItems: "center",
    paddingVertical: 24,
    backgroundColor: "#F2F4F7",
    marginBottom: 16,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: Colors.white,
  },
  formSection: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  fieldGroup: {
    marginBottom: 12,
    paddingHorizontal: 6,
  },
  fieldLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: "500",
    marginBottom: 6,
  },
  fieldValueBox: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  fieldValue: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
  },
  inputInBox: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: "600",
    padding: 0,
    margin: 0,
  },
  selectInputInBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: "600",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  updateBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  updateBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  selectedOption: {
    backgroundColor: "#E3F2FD",
  },
  optionText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: "500",
  },
  selectedOptionText: {
    color: Colors.primary,
    fontWeight: "600",
  },
});
