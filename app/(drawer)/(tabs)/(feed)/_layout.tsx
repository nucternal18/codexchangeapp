import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack, useNavigation } from "expo-router";
import {
  ColorSchemeName,
  Image,
  Pressable,
  useColorScheme,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import Colors from "../../../../constants/Colors";
import { useAuth } from "../../../../context/auth";
import { fetchUser } from "../../../../lib/users";
import { UserType } from "../../../../types";

function AvatarHeader({token}: {token: string}) {
  const navigation = useNavigation();
  const { data: user } = useQuery<UserType>({
    queryKey: ["user", token],
    queryFn: () => fetchUser(token),
  })
  
  return (
    <Pressable onPress={() => navigation.openDrawer()}>
      <Image
        style={{ width: 30, aspectRatio: 1, borderRadius: 30, marginLeft: 10 }}
        source={{ uri: user?.image }}
      />
    </Pressable>
  );
}

function PressableModal({ colorScheme }:{colorScheme: ColorSchemeName}) {
  return (
    <Link href="/modal" asChild>
      <Pressable>
        {({ pressed }) => (
          <FontAwesome
            name="info-circle"
            size={25}
            color={Colors[colorScheme ?? "light"].text}
            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
    </Link>
  );
}

export default function FeedLayout() {
  const colorScheme = useColorScheme();
  const { token } = useAuth();
  return (
    <Stack  initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "For you",
          headerRight: () => <PressableModal colorScheme={colorScheme} />,
          headerLeft: () => <AvatarHeader token={token} />,
        }}
      />
      <Stack.Screen name="tweet/[id]" options={{ title: "Tweet" }} />
      <Stack.Screen
        name="tweet/new-tweet"
        options={{ title: "New Tweet", headerShown: false }}
      />
    </Stack>
  );
}
