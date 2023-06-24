import {
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  Platform,
  NativeModules,
  Dimensions,
} from "react-native";
import React from "react";
import { Text, View } from "../../../../../components/Themed";
import tweets from "../../../../../assets/data/tweets";
import { Link, useRouter } from "expo-router";

const { StatusBarManager } = NativeModules;
const screenDimensions = Dimensions.get("screen");

const user = tweets[0].user;

export default function NewTweet() {
    const router = useRouter();
  const [tweet, setTweet] = React.useState<string>("");

  const onTweetPressed = React.useCallback(() => {
    console.warn("tweeted: ", tweet);

    setTweet("");
    router.back();
  }, [tweet]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Link href="/" asChild>
          <Pressable>
            <Text style={{ fontSize: 18 }}>Cancel</Text>
          </Pressable>
        </Link>
        <Pressable style={styles.tweetButton} onPress={onTweetPressed}>
          <Text
            style={{
              fontSize: 18,
              color: "white",
            }}
          >
            Tweet
          </Text>
        </Pressable>
      </View>
      <View style={styles.headerContainer}>
        <Image style={styles.userImage} source={{ uri: user.image }} />
        <TextInput
          value={tweet}
          style={{ flex: 1, marginLeft: 10 }}
          placeholder={"What's happening?"}
          multiline
          numberOfLines={5}
          onChangeText={setTweet}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingTop:
      Platform.OS === "android"
        ? StatusBarManager.HEIGHT
        : screenDimensions.height * 0.05,
  },
  headerContainer: {
    flexDirection: "row",
  },
  userImage: { width: 50, aspectRatio: 1, borderRadius: 50, marginRight: 10 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    alignItems: "center",
  },
  tweetButton: {
    backgroundColor: "#1C9BF0",
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tweetButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
  },
});
