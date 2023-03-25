import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Title } from "react-native-paper";

const PatientDashboard = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <Image
        source={require("../../assets/logoNoBG.png")}
        style={styles.image}
      />
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Title>Are You Looking For...</Title>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 20,
        }}
      >
        <Button
          icon="pill"
          textColor="white"
          backgroundColor={"#1e90ff"}
          borderRadius={5}
          mode="elevated"
          style={styles.button}
          onPress={() =>
            navigation.navigate("PatientNavBar", { screen: "Search Medicine" })
          }
        >
          Medicines
        </Button>
        <Button
          icon="doctor"
          textColor="white"
          backgroundColor={"#1e90ff"}
          borderRadius={5}
          size={50}
          mode="elevated"
          style={styles.button}
          onPress={() =>
            navigation.navigate("PatientNavBar", { screen: "Search Doctor" })
          }
        >
          Doctors
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
    width: "100%",
    height: "60%",
  },
});

export default PatientDashboard;
