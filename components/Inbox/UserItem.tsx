import { View, Text, Image } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';

export default function UserItem({ userInfo }: any) {
  return (
    <Link href={`/chat?id=` + userInfo?.docId} style={{ padding: 10 }}>
      <View
        style={{
          marginVertical: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <Image
          source={{ uri: userInfo?.imageUrl }}
          style={{ width: 39, height: 39, borderRadius: 99 }}
        />
        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 20,
            marginLeft: 10,
          }}
        >
          {userInfo?.name}
        </Text>
      </View>
      <View style={{ borderWidth: 0.2, marginVertical: 5, borderColor: Colors.GRAY }}></View>
    </Link>
  );
}
