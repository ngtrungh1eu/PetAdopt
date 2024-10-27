import React from 'react';
import Colors from '@/constants/Colors';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { View, Text, Image } from 'react-native';
import MarkFav from '../MarkFav';

export default function PetInfo({ pet }: any) {
  return (
    <View>
      <Image
        source={{ uri: pet?.imageUrl }}
        style={{ width: '100%', height: 390, objectFit: 'cover' }}
      />
      <View
        style={{
          padding: 20,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View>
          <Text style={{ fontFamily: 'outfitBold', fontSize: 29 }}>{pet?.name}</Text>
          <Text style={{ fontFamily: 'outfit', fontSize: 16, color: Colors.GRAY }}>
            179 Nguyen Tat Thanh
          </Text>
        </View>
        <View>
          <MarkFav pet={pet} />
        </View>
      </View>
    </View>
  );
}
