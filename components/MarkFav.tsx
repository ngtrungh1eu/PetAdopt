import { View, Text, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Shared from '@/Shared/Shared';
import { useUser } from '@clerk/clerk-expo';

export default function MarkFav({ pet }: any) {
  const user = useUser();
  const [favList, setFavList] = useState([]);
  useEffect(() => {
    user && getFavorite();
  }, [user]);
  const getFavorite = async () => {
    const result = await Shared.GetFavList(user);
    console.log(result);
    setFavList(result?.favorites ? result?.favorites : []);
  };
  const AddToFav = async () => {
    const favResult = favList;
    favResult.push(pet?.id);
    await Shared.UpdateFavList(user, favResult);
    getFavorite();
  };

  return (
    <View>
      {favList.includes(pet?.id) ? (
        <Pressable>
          <FontAwesome name="heart" size={24} color="red" />
        </Pressable>
      ) : (
        <Pressable onPress={() => AddToFav()}>
          <FontAwesome name="heart-o" size={24} color="black" />
        </Pressable>
      )}
    </View>
  );
}
