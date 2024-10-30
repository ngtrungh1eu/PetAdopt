import { View, Text, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import Colors from '@/constants/Colors';
import UserItem from '@/components/Inbox/UserItem';

export default function Inbox() {
  const { user } = useUser();
  const [userList, setUserList] = useState<any>([]);
  const [loader, setLoader] = useState<any>(false);
  useEffect(() => {
    user && getUserList();
  }, []);
  const getUserList = async () => {
    setLoader(true);
    setUserList([]);
    const q = query(
      collection(db, 'Chat'),
      where('userIds', 'array-contains', user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserList((prev: any) => [...prev, doc.data()]);
    });
    setLoader(false);
  };

  const mapOtherUserList = () => {
    const list: any = [];
    userList.forEach((record: any) => {
      const otherUser = record.user?.filter(
        (user: any) => user.email !== user.primaryEmailAddress?.emailAddress
      );
      const result = {
        docId: record.id,
        ...otherUser[1],
      };
      list.push(result);
    });
    console.log(list);
    return list;
  };

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontFamily: 'outfitMedium', fontSize: 30 }}>Inbox</Text>
      <FlatList
        refreshing={loader}
        onRefresh={getUserList}
        style={{ marginTop: 20 }}
        data={mapOtherUserList()}
        renderItem={({ item }) => <UserItem userInfo={item} key={item.docId} />}
      />
    </View>
  );
}
