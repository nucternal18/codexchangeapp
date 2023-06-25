import { StyleSheet, Pressable, TextInput } from "react-native";
import React from "react";
import { useSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Text, View } from "../../components/Themed";
import { MonoText } from "../../components/StyledText";
import { confirmUser } from "../../lib/auth";
import { useAuth } from "../../context/auth";

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export default function Authenticate() {
  const [oneTimeCode, setOneTimeCode] = React.useState<string>("");
  const { setToken } = useAuth();
  const { email } = useSearchParams();

  const handleConfirm = React.useCallback(async () => {
    try {
      const response = await confirmUser({
        email: email as string,
        oneTimeCode,
      });
      setToken(response.accessToken);
      await save("token", JSON.stringify(response.accessToken));
      setOneTimeCode("");
    } catch (error: any) {
      console.warn("error: ", error.message);
    }
  }, [oneTimeCode, email]);
  return (
    <View style={styles.container}>
      <MonoText style={styles.label}>Confirm your email</MonoText>
      <TextInput
        placeholder="One Time Code"
        style={styles.input}
        value={oneTimeCode}
        onChangeText={setOneTimeCode}
        textContentType="oneTimeCode"
        autoCapitalize="none"
        keyboardType="number-pad"
      />
      <Pressable style={styles.button} onPress={handleConfirm}>
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
