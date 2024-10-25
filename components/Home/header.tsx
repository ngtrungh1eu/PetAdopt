import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

export default function Header() {
  const { user } = useUser();
  return (
    <View>
      <View>
        <Text style={{ fontFamily: "outfit", fontSize: 18 }}>Welcome,</Text>
        <Text style={{ fontFamily: "outfitMedium", fontSize: 25 }}>{user?.fullName}</Text>
      </View>
      <Image src="" />
    </View>
  );
}
