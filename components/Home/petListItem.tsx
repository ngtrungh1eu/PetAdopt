import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

export default function PetListItem({ pet }: any) {
  return (
    <View style={{ padding: 10, marginRight: 15, backgroundColor: Colors.WHITE, borderRadius: 15 }}>
      <Image
        source={{ uri: pet?.imageUrl }}
        style={{ width: 150, height: 135, objectFit: "cover", borderRadius: 10, alignItems: "center" }}
      />
      <Text style={{ fontFamily: "outfitMedium", fontSize: 18 }}>{pet?.name}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: Colors.GRAY, fontFamily: "outfit" }}>{pet?.breed}</Text>
        <Text
          style={{
            color: Colors.PRIMARY,
            fontFamily: "outfit",
            backgroundColor: Colors.SECONDARY,
            paddingHorizontal: 10,
            fontSize: 12,
            borderRadius: 10,
          }}
        >
          {pet?.age} Yrs
        </Text>
      </View>
    </View>
  );
}
