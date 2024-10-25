import { View, Text, FlatList, Image, StyleSheet, Dimensions } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../config/FirebaseConfig";

export default function Slider() {
  const [sliderList, setSliderList] = useState<any>([]);
  useEffect(() => {
    GetSlider();
  }, []);
  const GetSlider = async () => {
    setSliderList([]);
    const snapshot = await getDocs(collection(db, "Slider"));
    snapshot.forEach((doc) => {
      setSliderList((sliderList: any) => [...sliderList, doc.data()]);
    });
  };
  return (
    <View style={{ marginTop: 15 }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={sliderList}
        renderItem={({ item, index }: any) => (
          <View>
            <Image source={{ uri: item?.imageUrl }} style={styles.slideImage} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  slideImage: {
    width: Dimensions.get("screen").width * 0.9,
    height: 170,
    borderRadius: 15,
    marginRight: 10,
  },
});
