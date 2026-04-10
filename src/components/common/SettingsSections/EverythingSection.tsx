import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { EverythingSectionProps, FilterOption } from './types';
import { PlayerList } from '../PlayerCard';
import { MOCK_ALL_PLAYERS } from '../../../screens/home/create-flight/mock-data';
export const EverythingSection: React.FC<EverythingSectionProps> = ({
  selectedFilter,
  onFilterChange,
}) => {
  const filterOptions: FilterOption[] = [
    { id: 'nothing', label: 'Không làm tròn' },
    { id: 'down', label: 'Làm tròn xuống' },
    { id: 'up', label: 'Làm tròn lên' },
  ];

  return (
    <View style={styles.outerCard}>
      <Text style={styles.sectionTitle}>Làm tròn hố chấp</Text>
      
      {filterOptions.map((option) => (
        <TouchableOpacity
          key={option.id}
          onPress={() => onFilterChange(option.id)}
          style={styles.radioRow}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.radioCircle,
              selectedFilter === option.id && styles.radioCircleActive,
            ]}
          >
            {selectedFilter === option.id && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.radioLabel}>{option.label}</Text>
          <Ionicons name="help-circle-outline" size={16} color="#888" />
        </TouchableOpacity>
      ))}

      <View style={styles.playerListWrapper}>
        <PlayerList
          players={MOCK_ALL_PLAYERS}
          onPlayerPress={(player) => console.log(player.name)}
        />
      </View>
    </View>
  );
};