import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { SelectionBottomSheet } from "../../../components/account/SelectionBottomSheet";
import type { SelectionOption } from "../../../components/account/SelectionBottomSheet";
import { useAuth } from "@/providers/auth.provider";

import { useNavigation } from "@react-navigation/native";

export const AccountInformationScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [vgaCode, setVgaCode] = useState(user?.vgaCode || "");
  const [handicap, setHandicap] = useState("30");
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState("nvlinh@mobifone.vn");
  const [memberShip, setMemberShip] = useState("Basic");
  const [teeBox, setTeeBox] = useState("Blue");

  const [membershipModal, setMembershipModal] = useState(false);
  const [teeBoxModal, setTeeBoxModal] = useState(false);

  const membershipOptions: SelectionOption[] = [
    { id: "Basic", label: "Basic" },
    { id: "Advance", label: "Advance", isUpgrade: true },
    { id: "VIP", label: "VIP", isUpgrade: true },
  ];

  const teeBoxOptions: SelectionOption[] = [
    { id: "Blue", label: "Blue" },
    { id: "Red", label: "Red" },
    { id: "White", label: "White" },
    { id: "Yellow", label: "Yellow" },
  ];

  const handleMembershipUpgrade = (membership: string) => {
    Alert.alert("Nâng cấp hội viên", `Bạn muốn nâng cấp lên ${membership}?`, [
      { text: "Hủy", onPress: () => {} },
      {
        text: "Xác nhận",
        onPress: () => {
          setMemberShip(membership);
          setMembershipModal(false);
        },
      },
    ]);
  };

  const handleUpdate = () => {
    Alert.alert("Thành công", "Cập nhật thông tin tài khoản thành công!");
  };

  const handleBack = () => {
    if (navigation?.goBack) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.screenWrapper}>
      <SafeAreaView edges={["top"]} style={{flex: 1,backgroundColor: "#F2F4F7"}}>
        {/* Vùng chứa nội dung cuộn */}
        <View style={{ flex: 1 }}>
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
                <Ionicons name="camera" size={18} color={Colors.black} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* Họ và tên */}
            <View style={styles.fieldGroup}>
              <View style={styles.fieldValueBox}>
                <Text style={styles.fieldLabel}>Họ và tên</Text>
                <TextInput
                  style={styles.inputInBox}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Nhập họ và tên"
                  placeholderTextColor={Colors.placeholder}
                />
              </View>
            </View>

            {/* Mã VGA */}
            <View style={styles.fieldGroup}>
              <View style={styles.fieldValueBox}>
                <Text style={styles.fieldLabel}>Mã VGA</Text>
                <TextInput
                  style={styles.inputInBox}
                  value={vgaCode}
                  onChangeText={setVgaCode}
                  placeholder="Nhập mã VGA"
                  placeholderTextColor={Colors.placeholder}
                  editable={false}
                />
              </View>
            </View>

            {/* HDC Index */}
            <View style={styles.fieldGroup}>
              <View style={styles.fieldValueBox}>
                <Text style={styles.fieldLabel}>HDC Index</Text>
                <TextInput
                  style={styles.inputInBox}
                  value={handicap}
                  onChangeText={setHandicap}
                  placeholder="Nhập HDC Index"
                  placeholderTextColor={Colors.placeholder}
                  keyboardType="numeric"
                />
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
                  activeOpacity={0.7}
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
                  activeOpacity={0.7}
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
      </View>

      {/* Update Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate} activeOpacity={0.8}>
          <Text style={styles.updateBtnText}>Cập nhật</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>

      {/* Membership Selection Bottom Sheet - OUTSIDE SafeAreaView */}
      <SelectionBottomSheet
        isVisible={membershipModal}
        selectedValue={memberShip}
        title="Hội viên"
        options={membershipOptions}
        onSelect={setMemberShip}
        onClose={() => setMembershipModal(false)}
        onUpgradePress={handleMembershipUpgrade}
      />

      {/* Tee Box Selection Bottom Sheet - OUTSIDE SafeAreaView */}
      <SelectionBottomSheet
        isVisible={teeBoxModal}
        selectedValue={teeBox}
        title="Tee box"
        options={teeBoxOptions}
        onSelect={setTeeBox}
        onClose={() => setTeeBoxModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
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
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
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
    paddingVertical: 15,
    backgroundColor: "#F2F4F7",
    marginBottom: 15,
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
    backgroundColor: Colors.finishedLight,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: Colors.white,
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  fieldGroup: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: "500",
    marginBottom: 6,
  },
  fieldValueBox: {
    backgroundColor: Colors.white,
    borderWidth: 0.1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
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
    paddingVertical: 2, 
  },
  selectText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: "600",
  },
  bottomContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 24, 
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
});