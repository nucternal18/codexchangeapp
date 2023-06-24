import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSearchParams } from "expo-router";
import { fetchTweet } from "../../../../../utils/fetchData";
import { TweetType } from "../../../../../types";

export default function TweetScreen() {
  const [tweet, setTweet] = React.useState<TweetType | null>(null);
  const { id } = useSearchParams();

  React.useEffect(() => {
    const fetchTweetData = async () => {
      const data = await fetchTweet(id as string);
      setTweet(data);
    };
    fetchTweetData();
  }, []);

  if (!tweet) {
    return (
      <View style={styles.container}>
        <Text>Tweet not found</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>{tweet?.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});