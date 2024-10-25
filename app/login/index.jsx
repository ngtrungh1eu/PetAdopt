import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import React from "react";
import logo from "../../assets/images/login.png";
import Colors from "../../constants/Colors";
import { useOAuth } from "@clerk/clerk-expo";
import { View, Text, Image, Pressable, ScrollView } from "react-native";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("(tabs)", { scheme: "myapp" }),
      });

      if (createdSessionId) {
        // setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  const onPressButton = function () {};

  return (
    <ScrollView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <Image style={{ width: "100%", height: 500 }} source={logo} />
      <View style={{ padding: 20, display: "flex", alignItems: "center" }}>
        <Text style={{ fontFamily: "outfitBold", fontSize: 35, textAlign: "center" }}>Ready to make a new friend</Text>
        <Text style={{ fontFamily: "outfit", marginTop: 18, fontSize: 22, textAlign: "center", color: Colors.GRAY }}>
          Let's adopt the pet which you like and make there life happy again
        </Text>

        <Pressable
          onPress={onPress}
          style={{ padding: 14, marginTop: 150, backgroundColor: Colors.PRIMARY, width: "100%", borderRadius: 14 }}
        >
          <Text style={{ textAlign: "center", fontSize: 20, fontFamily: "outfitBold" }}>Get Started</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
