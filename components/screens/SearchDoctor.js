import { async } from "@firebase/util";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import {
  Searchbar,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  Text,
  Modal,
  Portal,
  Provider,
  IconButton,
} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import db from "../../firebaseConfig";

const SearchDoctor = () => {
  const [searchQuery, setSearchQuery] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [docotors, setDoctors] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [channelingCenter, setChannelingCenter] = React.useState(null);
  const containerStyle = {
    backgroundColor: "white",
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    width: "90%",
    borderRadius: 20,
    alignSelf: "center",
  };

  const viewChannelingCenter = async (name) => {
    const newList = [];
    const q = query(collection(db, "users"), where("name", "==", name));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        newList.push({ id: doc.id, ...doc.data() });
      });
      setChannelingCenter(newList);
      setVisible(true);
    }
  };

  const hideModal = () => {
    setVisible(false);
  };

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const getDoctors = async () => {
    setLoading(true);
    const newList = [];
    const querySnapshot = await getDocs(collection(db, "doctors"));

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        newList.push({ id: doc.id, ...doc.data() });
      });
      const results = newList.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDoctors(results);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery !== null) {
      getDoctors();
    }
  }, [searchQuery]);
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "#87cefa",
          paddingBottom: 20,
          paddingTop: 10,
        }}
      >
        <Searchbar
          placeholder="Search Doctor Name"
          onChangeText={(searhTerm) => {
            onChangeSearch(searhTerm);
          }}
          value={searchQuery}
          elevation={5}
          style={{
            backgroundColor: "white",
            width: "94%",
            marginTop: 10,
          }}
        />
      </View>
      {searchQuery === "" || searchQuery === null ? (
        <View
          style={{
            marginTop: 20,
          }}
        >
          <Image
            source={require("../../assets/channeling.jpeg")}
            style={styles.image}
          />
        </View>
      ) : loading ? (
        <ActivityIndicator
          animating={true}
          color={"#1e90ff"}
          style={{ marginTop: 20 }}
        />
      ) : docotors.length > 0 ? (
        <ScrollView>
          {docotors.map((doctor) => (
            <Card
              key={doctor.id}
              style={{
                backgroundColor: "#87cefa",
                margin: 10,
                borderRadius: 5,
                display: "flex",
              }}
              //onPress={() => viewChannelingCenter(doctor.channelingCenterName)}
            >
              <Card.Content>
                <Title style={{ fontWeight: "bold" }}>
                  {doctor.channelingCenterName}
                </Title>
                <Paragraph>
                  {doctor.name} - {doctor.specialization}
                </Paragraph>
                <Paragraph>
                  {doctor.availableDate} | {doctor.availableTime}
                </Paragraph>
                <Paragraph>
                  Channeling Fee - Rs. {doctor.channelingFee}
                </Paragraph>
                <Paragraph style={{ fontWeight: "bold" }}>
                  No. of Patients per day :- {doctor.noofPatients}
                </Paragraph>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      ) : (
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text>Sorry... No Channeling Centers Found!</Text>
        </View>
      )}
      {channelingCenter !== null ? (
        <Provider>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}
            >
              <View>
                <IconButton
                  icon="close"
                  onPress={hideModal}
                  style={{ alignSelf: "flex-end" }}
                />
                <Image
                  source={require("../../assets/channeling.jpeg")}
                  style={{
                    width: "100%",
                    height: 173,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />

                <Card>
                  <Card.Content>
                    <Title style={{ textAlign: "center", fontWeight: "bold" }}>
                      {channelingCenter.name}
                    </Title>
                  </Card.Content>
                </Card>

                <Card>
                  <Card.Content>
                    <Paragraph>
                      <Ionicons name="card-outline" size={20} color="#1e90ff" />
                      {"    "}
                      {channelingCenter._id}
                    </Paragraph>
                  </Card.Content>
                </Card>

                <Card>
                  <Card.Content>
                    <Paragraph>
                      <Ionicons name="call-outline" size={20} color="#1e90ff" />
                      {"    "}
                      {channelingCenter.telephone}
                    </Paragraph>
                  </Card.Content>
                </Card>

                <Card>
                  <Card.Content>
                    <Paragraph>
                      <Ionicons name="mail-outline" size={20} color="#1e90ff" />
                      {"    "}
                      {channelingCenter.email}
                    </Paragraph>
                  </Card.Content>
                </Card>

                <Card>
                  <Card.Content>
                    <Paragraph>
                      <Ionicons
                        name="alarm-outline"
                        size={20}
                        color="#1e90ff"
                      />
                      {"    "}
                      Open Hours: {channelingCenter.openHours}
                    </Paragraph>
                  </Card.Content>
                </Card>

                <Card>
                  <Card.Content>
                    <Paragraph>
                      <Ionicons
                        name="location-outline"
                        size={20}
                        color="#1e90ff"
                      />
                      {"    "}
                      {channelingCenter.location}
                    </Paragraph>
                  </Card.Content>
                </Card>
              </View>
            </Modal>
          </Portal>
        </Provider>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "90%",
    height: 200,
    marginLeft: "5%",
    marginRight: "5%",
    borderRadius: 20,
  },
});

export default SearchDoctor;
