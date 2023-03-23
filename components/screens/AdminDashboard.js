import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Title } from "react-native-paper";

const AdminDashboard = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <Image
        source={require("../../assets/logoNoBG.png")}
        style={styles.image}
      />
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Title>Continue with ...</Title>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 20,
        }}
      >
        <Button
          icon="stethoscope"
          textColor="white"
          backgroundColor={"#1e90ff"}
          borderRadius={5}
          mode="elevated"
          style={styles.button}
          onPress={() =>
            navigation.navigate("AdminNavBar", { screen: "Channeling Centers" })
          }
        >
          Centers
        </Button>
        <Button
          icon="pill"
          textColor="white"
          backgroundColor={"#1e90ff"}
          borderRadius={5}
          size={50}
          mode="elevated"
          style={styles.button}
          onPress={() =>
            navigation.navigate("AdminNavBar", { screen: "Pharmacies" })
          }
        >
          Pharmacies
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "40%",
    paddingTop: 50,
    paddingBottom: 50,
    color: "white",
    backgroundColor: "#1e90ff",
  },
  image: {
    width: 350,
    height: 350,
    marginTop: 50,
  },
});

export default AdminDashboard;
