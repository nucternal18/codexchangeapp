import React from "react";
import { StyleSheet, Image, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
import { formatDistance, subDays } from "date-fns";

import { Text, View } from "./Themed";
import { TweetType } from "../types";
import IconButton from "./IconButton";

type TweetProps = {
  tweet: TweetType;
};

export default function Tweet({ tweet }: TweetProps) {
  return (
    <View style={styles.container}>
      <Link href={`/(feed)/tweet/${tweet.id}`} asChild>
        <Pressable style={styles.tweetContainer}>
          <Image
            style={styles.userImage}
            source={{ uri: tweet.author?.image }}
          />
          <View style={styles.mainContainer}>
            <View style={styles.tweetHeaderContainer}>
              <Text style={styles.name}>{tweet.author?.name}</Text>
              <Text style={styles.username}>{tweet.author?.username}</Text>
              <Text style={styles.createdAt}>
                {formatDistance(
                  subDays(new Date(tweet?.createdAt as string), 0),
                  new Date(),
                  {
                    addSuffix: true,
                  }
                )}
              </Text>
              <Entypo
                name={"dots-three-horizontal"}
                size={16}
                color={"grey"}
                style={{ marginLeft: "auto" }}
              />
            </View>
            <Text style={styles.content}>{tweet.content}</Text>

            {!!tweet.image && tweet.image !== null && (
              <Image style={styles.image} source={{ uri: tweet.image }} />
            )}
          </View>
        </Pressable>
      </Link>
      {/* Tweet Footer */}
      <View style={styles.tweetFooterContainer}>
        {/* Comment IconButton */}
        <IconButton
          iconName={"comment"}
          text={tweet.numberOfComments as number}
          onPress={() => console.log("Comment")}
        />
        {/* Retweet IconButton */}
        <IconButton
          iconName={"retweet"}
          text={tweet.numberOfRetweets as number}
          onPress={() => console.log("Retweet")}
        />
        {/* Heart IconButton */}
        <IconButton
          iconName={"heart"}
          text={tweet.numberOfLikes as number}
          onPress={() => console.log("Heart")}
        />
        {/* Chart IconButton */}
        <IconButton
          iconName={"chart"}
          text={tweet.impressions as number}
          onPress={() => console.log("Impressions")}
        />
        {/* Share IconButton */}
        <IconButton
          iconName={"share-apple"}
          onPress={() => console.log("Share")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "grey",
  },
  tweetContainer: {
    flexDirection: "row",
    marginVertical: 10,
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
  createdAt: {
    color: "grey",
    marginHorizontal: 5,
  },
  tweetFooterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "space-around",
  },
});
