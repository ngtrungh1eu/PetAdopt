import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';
import Colors from '@/constants/Colors';

export default function Category({ category }: { category: (value: any) => void }) {
  const [categoryList, setCategoryList] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>('Birds');

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, 'Category'));
    snapshot.forEach((doc) => {
      setCategoryList((categoryList: any) => [...categoryList, doc.data()]);
    });
  };

  return (
    <View style={{ marginTop: 15 }}>
      <Text style={{ fontFamily: 'outfitMedium', fontSize: 20 }}>Category</Text>
      <FlatList
        numColumns={4}
        data={categoryList}
        disableVirtualization
        renderItem={({ item }: any) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory(item.name);
              category(item.name); // Now this will correctly call the function
            }}
            style={{ flex: 1 }}
          >
            <View
              style={[
                styles.container,
                selectedCategory === item.name && styles.selectedCategoryContainer,
              ]}
            >
              <Image
                source={{ uri: item?.imageUrl }}
                style={{ width: 60, height: 60, borderRadius: 10 }}
              />
            </View>
            <Text style={{ fontFamily: 'outfit', textAlign: 'center' }}>{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SECONDARY,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: Colors.SECONDARY,
    borderWidth: 1,
    margin: 5,
  },
  selectedCategoryContainer: {
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.SECONDARY,
    borderWidth: 1,
  },
});
