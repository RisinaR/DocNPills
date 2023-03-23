import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Background from "../Assets/Background";
import Header from "../Assets/Header";
import Logo from "../Assets/Logo";
import Button from "../Assets/Button";

const Welcome = ({ navigation }) => {
  return (
    <Background>
      <Logo />
      <Header>Welcome!</Header>
      <Button
        mode="contained"
        style={{ backgroundColor: "#1e90ff" }}
        onPress={() => navigation.push("SignUp")}
      >
        Get Started
      </Button>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 3,
          marginLeft: 5,
          marginRight: 5,
        }}
      />

      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("Login")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: "#1e90ff",
  },
});

export default Welcome;
