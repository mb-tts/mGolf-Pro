import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { Colors } from '../../constants/colors'; // Mở comment nếu bạn dùng lại Colors gốc

interface Player {
  id: string;
  name: string;
  avatar: string;
  index: number;
  hdc: number;
  voa: number;
  isVerified?: boolean;
}

interface PlayerCardProps {
  player: Player;
  isLast?: boolean;
  onPress?: (player: Player) => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  isLast = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress?.(player)}
      style={[styles.container, !isLast && styles.borderBottom]}
    >
      {/* Avatar */}
      <Image
        source={{ uri: player.avatar }}
        style={styles.avatar}
      />

      {/* Player Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{player.name}</Text>

        <View style={styles.badgesRow}>
          {/* Badge Index */}
          <View style={styles.blueBadge}>
            <Text style={styles.blueBadgeText}>Index {player.index.toFixed(1)}</Text>
          </View>

          {/* Badge HDC */}
          <View style={styles.grayBadge}>
            <Text style={styles.grayBadgeText}>HDC {player.hdc}</Text>
          </View>

          {/* Badge VOA */}
          <View style={styles.voaBadge}>
            <Text style={styles.grayBadgeText}>VOA {player.voa}</Text>
          </View>
        </View>
      </View>

      {/* Verify Icon */}
      {player.isVerified && (
        <View style={styles.verifyIcon}>
          <Ionicons name="checkmark-circle" size={24} color="#0066CC" />
        </View>
      )}
    </TouchableOpacity>
  );
};

interface PlayerListProps {
  players: Player[];
  onPlayerPress?: (player: Player) => void;
}

export const PlayerList: React.FC<PlayerListProps> = ({
  players,
  onPlayerPress,
}) => {
  return (
    <View style={styles.listWrapper}>
      <FlatList
        data={players}
        renderItem={({ item, index }) => (
          <PlayerCard 
            player={item} 
            onPress={onPlayerPress} 
            isLast={index === players.length - 1} 
          />
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 6,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 6,
    flexWrap: 'nowrap',
  },
  blueBadge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  blueBadgeText: {
    color: '#0284C7',
    fontSize: 11,
    fontWeight: '500',
  },
  grayBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  voaBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  grayBadgeText: {
    color: '#4B5563',
    fontSize: 11,
    fontWeight: '500',
  },
  voaText: {
    color: '#4B5563',
    fontSize: 11,
    fontWeight: '500',
  },
  verifyIcon: {
    marginRight: 10,
    marginTop: 28,
  },
});