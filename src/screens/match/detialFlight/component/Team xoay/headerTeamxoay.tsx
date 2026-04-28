import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AppStackParamList } from '@/types/navigation.types';

interface Player {
  name: string;
  avatar: string;
}

interface TeamXoayData {
  id: string;
  players: Player[];
  score: string;
  isWinner?: boolean;
}

const mockTeams: TeamXoayData[] = [
  {
    id: '1',
    isWinner: true,
    players: [
      { name: 'N.Linh', avatar: 'https://i.pravatar.cc/150?u=1' },
      { name: 'N.Nam', avatar: 'https://i.pravatar.cc/150?u=2' },
    ],
    score: '+2UP/ +6',
  },
  {
    id: '2',
    players: [
      { name: 'N.Linh', avatar: 'https://i.pravatar.cc/150?u=1' },
      { name: 'N.Nam', avatar: 'https://i.pravatar.cc/150?u=2' },
    ],
    score: '+2UP/ +6',
  },
  {
    id: '3',
    players: [
      { name: 'N.Linh', avatar: 'https://i.pravatar.cc/150?u=1' },
      { name: 'N.Nam', avatar: 'https://i.pravatar.cc/150?u=2' },
    ],
    score: '+2UP/ +6',
  },
  {
    id: '4',
    players: [
      { name: 'N.Linh', avatar: 'https://i.pravatar.cc/150?u=1' },
      { name: 'N.Nam', avatar: 'https://i.pravatar.cc/150?u=2' },
    ],
    score: '+2UP/ +6',
  },
  {
    id: '5',
    players: [
      { name: 'N.Linh', avatar: 'https://i.pravatar.cc/150?u=1' },
      { name: 'N.Nam', avatar: 'https://i.pravatar.cc/150?u=2' },
    ],
    score: '+2UP/ +6',
  },
  {
    id: '6',
    players: [
      { name: 'N.Linh', avatar: 'https://i.pravatar.cc/150?u=1' },
      { name: 'N.Nam', avatar: 'https://i.pravatar.cc/150?u=2' },
    ],
    score: '+2UP/ +6',
  },
];

const TeamCard = ({ team }: { team: TeamXoayData }) => {
  return (
    <View style={[styles.card, team.isWinner ? styles.cardWinner : styles.cardNormal]}>
      <View style={styles.avatarRow}>
        {team.players.map((p, index) => (
          <View key={index} style={styles.playerContainer}>
            <Image source={{ uri: p.avatar }} style={styles.avatar} />
            <Text style={styles.playerName}>{p.name}</Text>
          </View>
        ))}
      </View>

      <View style={styles.scoreRow}>
        {team.isWinner && (
           <Image 
            source={require("@assets/images/crown1.png")} 
            style={styles.iconCrown} 
           />
        )}
        <Text style={[styles.scoreText, team.isWinner ? styles.textWinner : styles.textNormal]}>
          {team.score}
        </Text>
        <Image 
          source={require("@assets/images/chip.png")} 
          style={styles.iconChip} 
        />
      </View>
    </View>
  );
};

export default function HeaderTeamXoay() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {mockTeams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </View>

      {/* Footer Actions */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>Xem tất cả</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('orderRegret')}>
          <Ionicons name="create-outline" size={24} color="#0056B3" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#fff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%', // Chia 2 cột
    borderRadius: 25,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  cardNormal: {
    borderColor: '#E5E7EB',
    backgroundColor: '#FFF',
  },
  cardWinner: {
    borderColor: '#FACC15',
    backgroundColor: '#FEFCE8',
  },
  avatarRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 10,
  },
  playerContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginBottom: 4,
  },
  playerName: {
    fontSize: 14,
    color: '#6B7280',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textNormal: {
    color: '#9CA3AF',
  },
  textWinner: {
    color: '#EAB308',
  },
  iconCrown: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  iconChip: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  viewAllButton: {
    borderWidth: 1,
    borderColor: '#0056B3',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  viewAllText: {
    color: '#0056B3',
    fontWeight: '600',
    fontSize: 14,
  },
  editButton: {
    padding: 5,
  },
});
