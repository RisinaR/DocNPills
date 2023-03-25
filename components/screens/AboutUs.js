import React from "react";
import { View, Image } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Linking } from "react-native";

const AboutUs = () => {
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <Image
        source={require("../../assets/about.jpg")}
        style={{ width: "100%", height: 280 }}
      />

      <Card>
        <Card.Content>
          <Title style={{ textAlign: "center", fontWeight: "bold" }}>
            Doc N Pills
          </Title>
          <Paragraph style={{ textAlign: "center" }}>
            Find the best doctors in Sri Lanka and the pharmacies that availble
            the medicines you want without wasting your valuable time and money.
          </Paragraph>
          <Paragraph style={{ textAlign: "center" }}>
            You can contact us at anytime through the below mentioned platforms.
          </Paragraph>
          <Paragraph style={{ textAlign: "center", fontWeight: "bold" }}>
            We are available for you 24x7
          </Paragraph>
          <Paragraph style={{ textAlign: "center", fontWeight: "bold" }}>
            Copyright {new Date().getFullYear()} © DCRC. All Rights Reserved.
          </Paragraph>
        </Card.Content>
      </Card>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: "3%",
          padding: 18,
          backgroundColor: "whitesmoke",
        }}
      >
        <Ionicons
          name="logo-facebook"
          size={30}
          color="blue"
          onPress={() => {
            Linking.openURL("https://www.facebook.com/");
          }}
        />
        <Ionicons
          name="logo-instagram"
          size={30}
          color="#8a3ab9"
          onPress={() => {
            Linking.openURL("https://www.instagram.com/");
          }}
        />
        <Ionicons
          name="logo-twitter"
          size={30}
          color="#00acee"
          onPress={() => {
            Linking.openURL("https://twitter.com/?lang=en");
          }}
        />
        <Ionicons
          name="logo-whatsapp"
          size={30}
          color="green"
          onPress={() => {
            Linking.openURL("https://www.whatsapp.com/");
          }}
        />
        <Ionicons
          name="mail-outline"
          size={30}
          color="red"
          onPress={() => {
            Linking.openURL("mailto:chaminduhansana5@gmail.com");
          }}
        />
      </View>
    </View>
  );
};

export default AboutUs;
