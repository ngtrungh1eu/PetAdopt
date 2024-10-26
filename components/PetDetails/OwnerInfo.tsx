import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function OwnerInfo({ pet }: any) {
  return (
    <View style={styles.container}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20 }}>
        <Image
          source={{ uri: pet?.userImage }}
          style={{ width: 50, height: 50, borderRadius: 99 }}
        />
        <View>
          <Text style={{ fontFamily: 'outfitMedium', fontSize: 18 }}>{pet?.username}</Text>
          <Text style={{ fontFamily: 'outfit', color: Colors.GRAY }}>Pet owner</Text>
        </View>
      </View>
      <Ionicons style={{ marginRight: 10 }} name="send" size={32} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: Colors.WHITE,
  },
});
