import { StyleSheet, Pressable, TextInput } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Text, View } from "../../components/Themed";
import { MonoText } from "../../components/StyledText";
import { loginOrSignupUser } from "../../lib/auth";

export default function Login() {
  const [email, setEmail] = React.useState<string>("");
  const router = useRouter();

  const handleSignIn = React.useCallback(async () => {
    try {
      await loginOrSignupUser({ email: email });
      router.push({ pathname: "/(auth)/authenticate", params: { email } });
    } catch (error: any) {
        console.warn("error: ", error.message)
    }
  }, [email]);
  
  return (
    <View style={styles.container}>
      <MonoText style={styles.label}>Sign In or Create an account</MonoText>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        textContentType="emailAddress"
        autoCapitalize="none"
      />
      <Pressable style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    padding: 24,
  },
  label: {
    fontSize: 20,
    marginVertical: 5,
    color: "grey",
  },
  error: {
    marginVertical: 5,
    color: "red",
  },
  input: {
    fontSize: 20,
    marginVertical: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "grey",
    borderRadius: 10,
    padding: 10,
  },
  button: {
    marginVertical: 5,
    backgroundColor: "#050A12",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
