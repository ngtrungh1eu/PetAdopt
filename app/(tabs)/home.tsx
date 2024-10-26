import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Header from '../../components/Home/header';
import Slider from '../../components/Home/slider';
import PetListByCategory from '../../components/Home/petListByCategory';
import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';

export default function Home() {
  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      {/* Header */}
      <Header />
      {/* Slider */}
      <Slider />
      {/* ListPet + Category */}
      <PetListByCategory />
      {/* AddNewPetAdopt */}
      <TouchableOpacity style={styles.addNewPetContainer}>
        <MaterialIcons name="pets" size={24} color="black" />
        <Text style={{ fontFamily: 'outfitMedium', fontSize: 20 }}>Add new pet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  addNewPetContainer: {
    padding: 20,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
  },
});
