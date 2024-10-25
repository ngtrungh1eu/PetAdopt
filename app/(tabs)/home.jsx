import { View, Text } from "react-native";
import React from "react";
import Header from "../../components/Home/header";
import Slider from "../../components/Home/slider";
import PetListByCategory from "../../components/Home/petListByCategory";

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
    </View>
  );
}
