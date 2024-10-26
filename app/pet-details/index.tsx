import { View, Text, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import PetInfo from '@/components/PetDetails/PetInfo';
import PetSubInfo from '@/components/PetDetails/PetSubInfo';
import AboutPet from '@/components/PetDetails/AboutPet';

export default function PetDetails() {
  const pet = useLocalSearchParams();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: '',
    });
  });
  return (
    <View>
      <ScrollView>
        {/* PetInfo */}
        <PetInfo pet={pet} />
        {/* Pet properties */}
        <PetSubInfo pet={pet} />
        {/* About */}
        <AboutPet pet={pet} />
        {/* Pet owner */}
      </ScrollView>
      {/* Adopt button */}
    </View>
  );
}
