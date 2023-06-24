import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack, useNavigation } from "expo-router";
import {
  ColorSchemeName,
  Image,
  Pressable,
  useColorScheme,
} from "react-native";
import Colors from "../../../../constants/Colors";
import { user } from "../../../../assets/data/tweets";

function AvatarHeader() {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.openDrawer()}>
      <Image
        style={{ width: 30, aspectRatio: 1, borderRadius: 30, marginLeft: 10 }}
        source={{ uri: user.image }}
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
  return (
    <Stack  initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "For you",
          headerRight: () => <PressableModal colorScheme={colorScheme} />,
          headerLeft: () => <AvatarHeader />,
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
