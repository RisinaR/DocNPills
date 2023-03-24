import React, { useState } from "react";
import {
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  TextInput,
  Button,
  RadioButton,
  Text,
  Snackbar,
  ActivityIndicator,
} from "react-native-paper";
import Header from "../Assets/Header";
import db from "../../firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";

const UpdatePharmacy = ({ route, navigation }) => {
  const center = route.params.params.pharmacy;
  console.log("center", center);
  const [name, setName] = useState(center.name);
  const [email, setEmail] = useState(center.email);
  const [telephone, setTelephone] = useState(center.telephone);
  const [location, setLocation] = useState(center.location);
  const [openHours, setOpenHours] = useState(center.openHours);
  const [availabilityStatus, setAvailabilityStatus] = useState(
    center.availabilityStatus
  );
  const [errorMsg, setErrorMsg] = useState(null);
  const [visible, setVisible] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const refresh = route.params.params.refresh;
  const setRefresh = route.params.params.setRefresh;

  const onToggleSuccessSnackBar = () => {
    setVisibleSuccess(!visibleSuccess);
  };

  const onDismissSuccessSnackBar = () => {
    setVisibleSuccess(false);
    setRefresh(!refresh);
  };

  const onToggleSnackBar = () => {
    setVisible(!visible);
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "users", (doc.id = center.id)), {
        name: name,
        email: email,
        telephone: telephone,
        location: location,
        openHours: openHours,
        availabilityStatus: availabilityStatus,
      });
      console.log("Document updated ");
      onToggleSuccessSnackBar();
      setLoading(false);
    } catch (e) {
      console.error("Error Updating Document: ", e);
      setErrorMsg(e.message);
      onToggleSnackBar();
      setLoading(false);
    }
    setRefresh(!refresh);
  };

  return (
    <ScrollView style={styles.view}>
      <Image
        source={require("../../assets/logo.png")}
        style={{ width: 230, height: 230, marginLeft: "18%" }}
      />
      <SafeAreaView style={styles.form}>
        <Header>Update Agents</Header>
        <TextInput
          label="Name"
          value={name}
          style={styles.input}
          onChangeText={(text) => setName(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />
        {/* <TextInput
          label="Email"
          value={email}
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        /> */}
        <TextInput
          label="Telephone"
          value={telephone}
          style={styles.input}
          onChangeText={(text) => setTelephone(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />
        <TextInput
          label="Location"
          value={location}
          style={styles.input}
          onChangeText={(text) => setLocation(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />
        <TextInput
          label="Open Hours"
          value={openHours}
          style={styles.input}
          onChangeText={(text) => setOpenHours(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <View style={styles.input}>
          <Text>Availability Status</Text>

          <RadioButton.Group
            onValueChange={(newValue) => setAvailabilityStatus(newValue)}
            value={availabilityStatus}
          >
            <View>
              <Text>Available</Text>
              <RadioButton value="Available" />
            </View>
            <View>
              <Text>Not Available</Text>
              <RadioButton value="NotAvailable" />
            </View>
          </RadioButton.Group>
        </View>

        {/* <TextInput
          label="Availability Status"
          value={availabilityStatus}
          style={styles.input}
          onChangeText={(text) => setAvailabilityStatus(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        /> */}
        {loading ? (
          <ActivityIndicator animating={true} size="large" color={"#1e90ff"} />
        ) : (
          <Button
            onPress={() => {
              handleUpdate(), navigation.navigate("AdminNavBar");
            }}
            mode="contained"
            buttonColor="#1e90ff"
            style={styles.button}
          >
            Save Changes
          </Button>
        )}
      </SafeAreaView>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={2000}
        elevation={5}
      >
        {errorMsg}
      </Snackbar>
      <Snackbar
        visible={visibleSuccess}
        onDismiss={onDismissSuccessSnackBar}
        duration={2000}
        action={{ label: "Login", onPress: () => navigation.replace("Login") }}
        elevation={5}
      >
        Registered Successfully
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 12,
    backgroundColor: "white",
  },
  button: {
    margin: 12,
    borderRadius: 5,
  },
  label: {
    fontWeight: "bold",
    padding: 5,
  },
  view: {
    backgroundColor: "white",
    padding: 10,
  },
  form: {
    padding: 5,
  },
});

export default UpdatePharmacy;
