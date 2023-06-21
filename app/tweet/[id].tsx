import { StyleSheet, View, Text } from "react-native";
import { useSearchParams } from "expo-router";
import tweets from "../../assets/data/tweets";

export default function TweetScreen() {
  const { id } = useSearchParams();


  const tweet = tweets.find((tweet) => tweet.id === id);

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