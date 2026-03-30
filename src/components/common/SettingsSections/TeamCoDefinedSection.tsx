import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';
import { TeamCoDefinedSectionProps } from './types';
import { PlayerList } from '../PlayerCard';
import { MOCK_PLAYERS } from '../../../constants/mock-data';

export const TeamCoDefinedSection: React.FC<TeamCoDefinedSectionProps> = ({
  settings,
  onSettingsChange,
}) => {
  const holeOptions = [
    { label: '3 hộ', value: 3 },
    { label: '6 hộ', value: 6 },
    { label: '9 hộ', value: 9 },
  ];

  const comparisonOptions: { label: string; value: 'best' | 'all' | 'weakest' }[] = [
    { label: 'Golfer tốt nhất', value: 'best' },
    { label: 'Tất cả', value: 'all' },
    { label: 'Tất cả nếu hỏa', value: 'weakest' },
  ];

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.settingBlock}>
        <Text style={styles.sectionTitle}>Số hộ</Text>
        <View style={styles.buttonRow}>
          {holeOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() =>
                onSettingsChange({
                  ...settings,
                  holeCount: option.value,
                })
              }
              style={[
                styles.outlineButton,
                settings.holeCount === option.value &&
                  styles.outlineButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.outlineButtonText,
                  settings.holeCount === option.value &&
                    styles.outlineButtonTextActive,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.settingBlock}>
        <Text style={styles.sectionTitle}>So sánh</Text>
        <View style={styles.buttonRow}>
          {comparisonOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() =>
                onSettingsChange({
                  ...settings,
                  comparison: option.value,
                })
              }
              style={[
                styles.outlineButton,
                settings.comparison === option.value &&
                  styles.outlineButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.outlineButtonText,
                  settings.comparison === option.value &&
                    styles.outlineButtonTextActive,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.subtitle}>Danh sách thành viên</Text>
      <PlayerList
        players={MOCK_PLAYERS}
        onPlayerPress={(player) => console.log(player.name)}
      />
    </View>
  );
};
