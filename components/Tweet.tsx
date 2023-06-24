import React from "react";
import { StyleSheet, Image, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";

import { Text, View } from "./Themed";
import { TweetType } from "../types";
import IconButton from "./IconButton";

type TweetProps = {
  tweet: TweetType;
};

export default function Tweet({ tweet }: TweetProps) {
  return (
    <Link href={`/(feed)/tweet/${tweet.id}`} asChild>
      <Pressable style={styles.container}>
        <Image style={styles.userImage} source={{ uri: tweet.author.image }} />
        <View style={styles.mainContainer}>
          <View style={styles.tweetHeaderContainer}>
            <Text style={styles.name}>{tweet.author.name}</Text>
            <Text style={styles.username}>{tweet.author.username}</Text>
            <Entypo
              name={"dots-three-horizontal"}
              size={16}
              color={"grey"}
              style={{ marginLeft: "auto" }}
            />
          </View>
          <Text style={styles.content}>{tweet.content}</Text>

          {(!!tweet.image && tweet.image !== null) && (
            <Image style={styles.image} source={{ uri: tweet.image }} />
          )}
          {/* Tweet Footer */}
          <View style={styles.tweetFooterContainer}>
            {/* Comment IconButton */}
            <IconButton
              iconName={"comment"}
              text={tweet.numberOfComments as number}
            />
            {/* Retweet IconButton */}
            <IconButton
              iconName={"retweet"}
              text={tweet.numberOfRetweets as number}
            />
            {/* Heart IconButton */}
            <IconButton
              iconName={"heart"}
              text={tweet.numberOfLikes as number}
            />
            {/* Chart IconButton */}
            <IconButton iconName={"chart"} text={tweet.impressions as number} />
            {/* Share IconButton */}
            <IconButton iconName={"share-apple"} />
          </View>
        </View>
      </Pressable>
    </Link>
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
  image: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    resizeMode: "cover",
    aspectRatio: 16 / 9,
    marginVertical: 10,
  },
  tweetHeaderContainer: {
    flexDirection: "row",
  },
  username: {
    color: "grey",
    marginHorizontal: 5,
  },
  tweetFooterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    justifyContent: "space-between",
  },
});
