import React from "react";
import { View, Image, Text } from "react-native";
import { Button } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

const ChannelingCenterHome = ({ navigation }) => {
  return (
    <View>
      <Image
        source={require("../../assets/logo.png")}
        style={{ width: "100%", height: 360, marginTop: 40 }}
      />

      <View style={{ backgroundColor: "white", height: 250 }}>
        <Button
          mode="contained"
          style={{
            borderRadius: 10,
            marginTop: 100,
            backgroundColor: "#1e90ff",
            marginLeft: 10,
            marginRight: 10,
          }}
          onPress={() => navigation.navigate("Doctors")}
        >
          Doctors{"  "}
          <Ionicons name="navigate" size={15} color="white" />
        </Button>
      </View>
    </View>
  );
};

export default ChannelingCenterHome;
