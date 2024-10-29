import React, { useEffect, useState } from 'react';
import Category from './category';
import PetListItem from './petListItem';
import { View, Text, FlatList } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';

export default function PetListByCategory() {
  const [petList, setPetList] = useState<any>([]);
  const [loader, setLoader] = useState<any>(false);

  useEffect(() => {
    getPetsList('Birds');
  }, []);
  const getPetsList = async (category: string) => {
    setPetList([]);
    setLoader(true);
    const q = query(collection(db, 'Pet'), where('category', '==', category));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setPetList((petList: any) => [...petList, doc.data()]);
    });
    setLoader(false);
  };
  return (
    <View>
      <Category category={(value: any) => getPetsList(value)} />
      <FlatList
        style={{ marginTop: 15 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        disableVirtualization
        data={petList}
        refreshing={loader}
        onRefresh={() => getPetsList('Birds')}
        renderItem={({ item, index }: any) => (
          <View>
            <View>
              <PetListItem pet={item} />
            </View>
          </View>
        )}
      />
    </View>
  );
}
