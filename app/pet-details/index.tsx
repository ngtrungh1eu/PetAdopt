import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import PetInfo from '@/components/PetDetails/PetInfo';
import PetSubInfo from '@/components/PetDetails/PetSubInfo';
import AboutPet from '@/components/PetDetails/AboutPet';
import OwnerInfo from '@/components/PetDetails/OwnerInfo';
import Colors from '@/constants/Colors';
import { useUser } from '@clerk/clerk-expo';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';

export default function PetDetails() {
  const pet = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: '',
    });
  });

  const initiateChat = async () => {
    const docId1 = user?.primaryEmailAddress?.emailAddress + '_' + pet?.email;
    const docId2 = pet?.email + '_' + user?.primaryEmailAddress?.emailAddress;

    const q = query(collection(db, 'Chat'), where('id', 'in', [docId1, docId2]));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      router.push({ pathname: '/chat', params: { id: doc.id } });
    });

    if (querySnapshot.docs?.length == 0) {
      await setDoc(doc(db, 'Chat', docId1), {
        id: docId1,
        user: [
          {
            email: user?.primaryEmailAddress?.emailAddress,
            imageUrl: user?.imageUrl,
            name: user?.fullName,
          },
          {
            email: pet?.email,
            imageUrl: pet?.userImage,
            name: pet?.username,
          },
        ],
        userIds: [user?.primaryEmailAddress?.emailAddress, pet?.email],
      });
      router.push({ pathname: '/chat', params: { id: docId1 } });
    }
  };
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
        <TouchableOpacity style={styles.adoptBtn} onPress={() => initiateChat()}>
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
