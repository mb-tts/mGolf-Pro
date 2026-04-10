import { FC } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';
import { ToggleOptionProps } from './types';

export const ToggleOption: FC<ToggleOptionProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <View style={styles.toggleRow}>
      <Text style={styles.toggleLabel}>{label}</Text>
      <TouchableOpacity
        style={[styles.toggle, value && styles.toggleActive]}
        onPress={() => onChange(!value)}
      >
        <View
          style={[
            styles.toggleThumb,
            value && styles.toggleThumbActive,
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};
