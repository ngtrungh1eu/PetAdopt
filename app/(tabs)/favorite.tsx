import Shared from '@/Shared/Shared';
import PetListItem from '@/components/Home/petListItem';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';

export default function Favorite() {
  const { user } = useUser();
  const [favIds, setFavIds] = useState<any>([]);
  const [favPetList, setFavPetList] = useState<any>([]);
  const [loader, setLoader] = useState<any>(false);
  useEffect(() => {
    user && GetFavPetId();
  }, [user]);
  // Fav Id
  const GetFavPetId = async () => {
    setLoader(true);
    const result = await Shared.GetFavList(user);
    setFavIds(result?.favorites ? result?.favorites : []);
    getFavPetList(result?.favorites);
    setLoader(false);
  };
  // Fav Related Data
  const getFavPetList = async (favId_: any) => {
    setLoader(true);

    setFavPetList([]);
    const q = query(collection(db, 'Pet'), where('id', 'in', favId_));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
      setFavPetList((prev: any) => [...prev, doc.data()]);
    });
    setLoader(false);
  };
  return (
    <View style={{ padding: 20, marginTop: 20, height: '100%' }}>
      <Text style={{ fontFamily: 'outfitMedium', fontSize: 30 }}>Favorite</Text>
      <FlatList
        data={favPetList}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        onEndReachedThreshold={0.5}
        onRefresh={() => GetFavPetId()}
        refreshing={loader}
        renderItem={({ item, index }: any) => (
          <View key={index} style={{ marginTop: 20 }}>
            <PetListItem pet={item} />
          </View>
        )}
      />
    </View>
  );
}
