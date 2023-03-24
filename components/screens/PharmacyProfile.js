import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { View, Image, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  Card,
  Title,
  Paragraph,
  IconButton,
  Dialog,
  Portal,
  Provider,
  Button,
  FAB,
} from "react-native-paper";

const PharmacyProfile = ({ navigation }) => {
  const [userdetails, setUserdetails] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [contact, setContact] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [openHours, setOpenHours] = React.useState(null);
  const [location, setLocation] = React.useState(null);

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => {
    setVisible(true);
  };
  const hideDialog = () => setVisible(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        await AsyncStorage.getItem("user").then((data) => {
          console.log("data", data);
          let user = JSON.parse(data);
          setName(user.name);

          setContact(user.telephone);
          setEmail(user.email);
          setOpenHours(user.openHours);
          setLocation(user.location);
        });
        await AsyncStorage.getItem("id").then((data) => {
          setId(data);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  const handlelogout = () => {
    AsyncStorage.removeItem("id");
    navigation.navigate("Welcome");
  };

  return (
    <>
      <View>
        <Image
          source={require("../../assets/medicine.webp")}
          style={{ width: "100%", height: 173 }}
        />

        <Card>
          <Card.Content>
            <Title style={{ textAlign: "center", fontWeight: "bold" }}>
              {name}
            </Title>
            <Button
              mode="contained"
              style={{
                backgroundColor: "#87cefa",
                borderRadius: 10,
                margin: 10,
              }}
              onPress={showDialog}
            >
              Log out
            </Button>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <Paragraph>
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color="#1e90ff"
              />
              {"    "}
              {id}
            </Paragraph>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <Paragraph>
              <Ionicons name="call-outline" size={20} color="#1e90ff" />
              {"    "}
              {contact}
            </Paragraph>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <Paragraph>
              <Ionicons name="mail-outline" size={20} color="#1e90ff" />
              {"    "}
              {email}
            </Paragraph>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <Paragraph>
              <Ionicons name="alarm-outline" size={20} color="#1e90ff" />
              {"    "}
              {openHours}
            </Paragraph>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <Paragraph>
              <Ionicons name="location-outline" size={20} color="#1e90ff" />
              {"    "}
              {location}
            </Paragraph>
          </Card.Content>
        </Card>
      </View>

      <Provider>
        <View>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Log Out</Dialog.Title>
              <Dialog.Content>
                <Paragraph>Are you sure want to sign out ?</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog} textColor={"#1e90ff"}>
                  {" "}
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    handlelogout(), hideDialog();
                  }}
                  textColor={"red"}
                >
                  Log out
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>
    </>
  );
};

export default PharmacyProfile;
