import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const { user } = useUser();
  const homeRoute: any = "/(tabs)/home";
  const LogInRoute: any = "/login";

  return <View>{user ? <Redirect href={homeRoute} /> : <Redirect href={LogInRoute} />}</View>;
}
