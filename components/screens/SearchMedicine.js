import { collection, getDocs } from "firebase/firestore";
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

const SearchMedicine = () => {
  const [searchQuery, setSearchQuery] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [medicines, setMedicines] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [Pharmacy, setPharmacy] = React.useState(null);
  const containerStyle = {
    backgroundColor: "white",
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    width: "90%",
    borderRadius: 20,
    alignSelf: "center",
  };

  const viewPharmacy = async (name) => {
    const newList = [];
    const q = query(collection(db, "users"), where("name", "==", name));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        newList.push({ id: doc.id, ...doc.data() });
      });
      setPharmacy(newList);
      setVisible(true);
    }
  };

  const hideModal = () => {
    setVisible(false);
  };

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const getMedicines = async () => {
    setLoading(true);
    const newList = [];
    const querySnapshot = await getDocs(collection(db, "medicines"));

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        newList.push({ id: doc.id, ...doc.data() });
      });
      const results = newList.filter(
        (medicine) =>
          medicine.brandName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          medicine.medicalTerm.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setMedicines(results);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery !== null) {
      getMedicines();
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
          placeholder="Search Medicine Name"
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
            source={require("../../assets/medicine.webp")}
            style={styles.image}
          />
        </View>
      ) : loading ? (
        <ActivityIndicator
          animating={true}
          color={"#1e90ff"}
          style={{ marginTop: 20 }}
        />
      ) : medicines.length > 0 ? (
        <ScrollView>
          {medicines.map((medicine) => (
            <Card
              key={medicine.id}
              style={{
                backgroundColor: "#87cefa",
                margin: 10,
                borderRadius: 5,
                display: "flex",
              }}
              //onPress={() => viewPharmacy(medicine.pharmacyId)}
            >
              <Card.Content>
                <Title style={{ fontWeight: "bold" }}>
                  {medicine.pharmacyName}
                </Title>
                <Paragraph>Brand: {medicine.brandName}</Paragraph>
                <Paragraph>Medical Term: {medicine.medicalTerm}</Paragraph>
                <Paragraph>
                  Rs. {medicine.price} | {medicine.dose} | {medicine.type}
                </Paragraph>
                <Paragraph style={{ fontWeight: "bold" }}>
                  Available Stock :- {medicine.qty}
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
          <Text>Sorry... No Pharmacies Found!</Text>
        </View>
      )}
      {Pharmacy !== null ? (
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
                  source={require("../../assets/medicine.webp")}
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
                      {Pharmacy.name}
                    </Title>
                  </Card.Content>
                </Card>

                <Card>
                  <Card.Content>
                    <Paragraph>
                      <Ionicons name="card-outline" size={20} color="#1e90ff" />
                      {"    "}
                      {Pharmacy._id}
                    </Paragraph>
                  </Card.Content>
                </Card>

                <Card>
                  <Card.Content>
                    <Paragraph>
                      <Ionicons name="call-outline" size={20} color="#1e90ff" />
                      {"    "}
                      {Pharmacy.telephone}
                    </Paragraph>
                  </Card.Content>
                </Card>

                <Card>
                  <Card.Content>
                    <Paragraph>
                      <Ionicons name="mail-outline" size={20} color="#1e90ff" />
                      {"    "}
                      {Pharmacy.email}
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
                      Open Hours: {Pharmacy.openHours}
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
                      {Pharmacy.location}
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

export default SearchMedicine;
