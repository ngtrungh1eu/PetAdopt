import { View, Text, Pressable } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';

export default function AboutPet({ pet }: any) {
  const [readMore, setReadMore] = React.useState(true);
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: 'outfitMedium', fontSize: 20 }}>About {pet?.name}</Text>
      <Text
        style={{ fontFamily: 'outfit', fontSize: 16, color: Colors.GRAY }}
        {...(readMore ? { numberOfLines: 3 } : {})}
      >
        {pet?.about}
      </Text>
      {readMore ? (
        <Pressable onPress={() => setReadMore(false)}>
          <Text style={{ fontFamily: 'outfit', fontSize: 14, color: Colors.PRIMARY }}>
            Read more
          </Text>
        </Pressable>
      ) : (
        <Pressable onPress={() => setReadMore(true)}>
          <Text style={{ fontFamily: 'outfit', fontSize: 14, color: Colors.PRIMARY }}>
            Show less
          </Text>
        </Pressable>
      )}
    </View>
  );
}
