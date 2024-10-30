import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { addDoc, collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { GiftedChat } from 'react-native-gifted-chat';
import moment from 'moment';

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const [messages, setMessages] = useState<any>([]);
  const navigation = useNavigation();
  const { user } = useUser();
  useEffect(() => {
    getUserDetails();

    const unsubscribe = onSnapshot(
      collection(db, 'Chat', params?.id as string, 'Messages'),
      (snapshot) => {
        const messageData = snapshot.docs.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
        }));
        setMessages(messageData);
      }
    );
    return () => unsubscribe();
  }, []);
  const getUserDetails = async () => {
    const docRef = doc(db, 'Chat', params?.id as string);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    const otherUser = result?.user.filter(
      (item: any) => item.email != user?.primaryEmailAddress?.emailAddress
    );

    navigation.setOptions({
      headerTitle: otherUser[0].name,
    });
  };
  const onSend = async (newMessages: any) => {
    setMessages((previousMessages: any) => GiftedChat.append(previousMessages, newMessages));
    newMessages[0].createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
    await addDoc(collection(db, 'Chat', params?.id as string, 'Messages'), newMessages[0]);
  };
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      showUserAvatar
      user={{
        _id: user?.primaryEmailAddress?.emailAddress as string,
        name: user?.fullName as string,
        avatar: user?.imageUrl,
      }}
    />
  );
}
