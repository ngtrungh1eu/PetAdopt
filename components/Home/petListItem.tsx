import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import MarkFav from '../MarkFav';

export default function PetListItem({ pet }: any) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push({ pathname: '/pet-details', params: pet })}
      style={{ padding: 10, marginRight: 15, backgroundColor: Colors.WHITE, borderRadius: 15 }}
    >
      <Image
        source={{ uri: pet?.imageUrl }}
        style={{
          width: 150,
          height: 135,
          objectFit: 'cover',
          borderRadius: 10,
          alignItems: 'center',
        }}
      />
      <Text style={{ fontFamily: 'outfitMedium', fontSize: 18 }}>{pet?.name}</Text>
      <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
        <Text style={{ color: Colors.GRAY, fontFamily: 'outfit' }}>{pet?.breed}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: Colors.PRIMARY,
              fontFamily: 'outfit',
              backgroundColor: Colors.SECONDARY,
              paddingHorizontal: 20,
              paddingVertical: 2,
              fontSize: 12,
              borderRadius: 10,
            }}
          >
            {pet?.age} Yrs
          </Text>
          <MarkFav pet={pet} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
