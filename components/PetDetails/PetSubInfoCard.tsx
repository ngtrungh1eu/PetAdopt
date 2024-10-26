import { View, Text, Image } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';

export default function PetSubInfoCard({ icon, title, value }: any) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        padding: 10,
        margin: 5,
        borderRadius: 8,
        gap: 10,
        flex: 1,
      }}
    >
      <Image source={icon} style={{ width: 40, height: 40 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: 'outfit', fontSize: 12, color: Colors.GRAY }}>{title}</Text>
        <Text style={{ fontFamily: 'outfitBold', fontSize: 16 }}>{value}</Text>
      </View>
    </View>
  );
}
