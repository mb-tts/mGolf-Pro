import React, { useMemo, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

const { height } = Dimensions.get("window");

interface SelectionOption {
  id: string;
  label: string;
  isUpgrade?: boolean;
}

interface SelectionBottomSheetProps {
  isVisible: boolean;
  selectedValue: string;
  title: string;
  options: SelectionOption[];
  onSelect: (value: string) => void;
  onClose: () => void;
  onUpgradePress?: (value: string) => void;
}

export type { SelectionOption };

export const SelectionBottomSheet: React.FC<SelectionBottomSheetProps> = ({
  isVisible,
  selectedValue,
  title,
  options,
  onSelect,
  onClose,
  onUpgradePress,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => {
    const itemHeight = options.length * 80 + 100;
    return [Math.min(itemHeight, height * 0.7)];
  }, [options.length]);

  React.useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  const handleSelectOption = useCallback((option: SelectionOption) => {
    if (option.id === selectedValue) return;

    if (option.isUpgrade && onUpgradePress) {
      onUpgradePress(option.id);
    } else {
      onSelect(option.id);
      onClose();
    }
  }, [selectedValue, onSelect, onClose, onUpgradePress]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={isVisible ? 0 : -1}
      enablePanDownToClose={true}
      enableDynamicSizing={false}
      onChange={(index) => {
        if (index === -1) {
          onClose();
        }
      }}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
      style={styles.bottomSheetContainer}
    >
      {/* Header with Close Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Options List */}
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.optionItem}
            onPress={() => handleSelectOption(option)}
            activeOpacity={0.7}
          >
            <Text style={styles.optionLabel}>{option.label}</Text>

            {selectedValue === option.id ? (
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={Colors.primary}
              />
            ) : option.isUpgrade && onUpgradePress ? (
              <TouchableOpacity
                style={styles.registerBtn}
                onPress={() => onUpgradePress(option.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.registerBtnText}>Đăng ký</Text>
              </TouchableOpacity>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    zIndex: 1000,
  },
  bottomSheetBackground: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handleIndicator: {
    backgroundColor: "#D0D0D0",
    width: 45,
    height: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomColor: "#F0F0F0",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    flex: 1,
    textAlign: "center",
  },
  closeBtn: {
    padding: 8,
    marginRight: -40,
  },
  optionsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.text,
    flex: 1,
  },
  registerBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#EAF6FF',
    borderRadius: 16,
  },
  registerBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: '#0061AF',
  },
});
