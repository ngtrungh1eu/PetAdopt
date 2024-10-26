import { View, Text, Image } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import PetSubInfoCard from './PetSubInfoCard';

export default function PetSubInfo({ pet }: any) {
  return (
    <View style={{ paddingHorizontal: 20 }}>
      {/* Row 1 */}
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
          <PetSubInfoCard
            icon={require('../../assets/images/calendar.png')}
            title="Age"
            value={pet?.age + ' Years'}
          />
          <PetSubInfoCard
            icon={require('../../assets/images/bone.png')}
            title="Breed"
            value={pet?.breed}
          />
        </View>
      </View>
      {/* Row 2 */}
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
          <PetSubInfoCard
            icon={require('../../assets/images/sex.png')}
            title="Sex"
            value={pet?.sex}
          />
          <PetSubInfoCard
            icon={require('../../assets/images/weight.png')}
            title="Weight"
            value={pet?.weight}
          />
        </View>
      </View>
    </View>
  );
}
