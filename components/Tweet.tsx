import { StyleSheet, Image } from "react-native";

import { Text, View } from "./Themed";
import { TweetType } from "../types";

type TweetProps = {
  tweet: TweetType;
};

export default function Tweet({ tweet }: TweetProps) {
  return (
    <View style={styles.container}>
      <Image style={styles.userImage} source={{ uri: tweet.user.image }} />
      <View style={styles.mainContainer}>
        <Text style={styles.name}>{tweet.user.name}</Text>
        <Text style={styles.content}>{tweet.content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "grey",
  },
  userImage: { width: 50, height: 50, borderRadius: 50 },
  mainContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontWeight: "600",
  },
  content: {
    lineHeight: 18,
    marginTop: 5,
  },
});
