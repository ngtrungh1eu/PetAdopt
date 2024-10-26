import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import PetInfo from '@/components/PetDetails/PetInfo';
import PetSubInfo from '@/components/PetDetails/PetSubInfo';
import AboutPet from '@/components/PetDetails/AboutPet';
import OwnerInfo from '@/components/PetDetails/OwnerInfo';
import Colors from '@/constants/Colors';

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
        <OwnerInfo pet={pet} />
        <View style={{ height: 200 }}></View>
      </ScrollView>
      {/* Adopt button */}
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.adoptBtn}>
          <Text style={{ textAlign: 'center', fontFamily: 'outfitMedium', fontSize: 20 }}>
            Adopt me
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  adoptBtn: { padding: 15, backgroundColor: Colors.PRIMARY, borderRadius: 10 },
  btnContainer: { position: 'absolute', bottom: 10, left: 10, right: 10 },
});
