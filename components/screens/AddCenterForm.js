import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import {
  TextInput,
  Button,
  RadioButton,
  Text,
  Snackbar,
  ActivityIndicator,
} from "react-native-paper";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import db from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const AddCenterForm = ({ route, navigation }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [telephone, setTelephone] = useState(null);
  const [location, setLocation] = useState(null);
  const [openHours, setOpenHours] = useState(null);
  const [legacyValidation, setLegacyValidation] = useState(null);
  const [availabilityStatus, setAvailabilityStatus] = useState("Available");
  const [type, setType] = useState("Pharmacy Agent");
  const [password, setPassword] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [visible, setVisible] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const refresh = route.params.params.refresh;
  const setRefresh = route.params.params.setRefresh;

  const auth = getAuth();

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

  const onSignUpPressed = async () => {
    setLoading(true);
    if (
      name != null &&
      email != null &&
      telephone != null &&
      location != null &&
      openHours != null &&
      legacyValidation != null &&
      availabilityStatus != null &&
      type != null &&
      password != null
    ) {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          name: name,
          email: email,
          telephone: telephone,
          location: location,
          openHours: openHours,
          legacyValidation: legacyValidation,
          availabilityStatus: availabilityStatus,
          type: type,
          password: password,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (err) {
        console.error("Error adding document: ", e);
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("Registered with: ", user.email);
          onToggleSuccessSnackBar();
          setLoading(false);
        })
        .catch((error) => {
          setErrorMsg(error.message);
          onToggleSnackBar();
          setLoading(false);
        });
      setRefresh(!refresh);
    } else {
      alert("Please fill all the fields");
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.view}>
      <Image
        source={require("../../assets/logo.png")}
        style={{ width: 230, height: 230, marginLeft: "18%" }}
      />
      <SafeAreaView style={styles.form}>
        <TextInput
          label="Name"
          value={name}
          style={styles.input}
          onChangeText={(text) => setName(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />
        <TextInput
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
        />
        <TextInput
          label="Telephone"
          keyboardType="numeric"
          returnKeyType="next"
          value={telephone}
          style={styles.input}
          onChangeText={(text) => setTelephone(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />
        <TextInput
          label="Location"
          returnKeyType="next"
          value={location}
          style={styles.input}
          onChangeText={(text) => setLocation(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />
        <TextInput
          label="Open Hours"
          returnKeyType="next"
          value={openHours}
          style={styles.input}
          onChangeText={(text) => setOpenHours(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />
        <TextInput
          label="Legacy Validation"
          returnKeyType="next"
          value={legacyValidation}
          style={styles.input}
          onChangeText={(text) => setLegacyValidation(text)}
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

        <View style={styles.input}>
          <Text>User Type</Text>

          <RadioButton.Group
            onValueChange={(newValue) => setType(newValue)}
            value={type}
          >
            <View>
              <Text>Pharmacy Agent</Text>
              <RadioButton value="Pharmacy Agent" />
            </View>
            <View>
              <Text>Channeling Center Agent</Text>
              <RadioButton value="Channeling Center Agent" />
            </View>
          </RadioButton.Group>
        </View>
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password}
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />
        {loading ? (
          <ActivityIndicator animating={true} size="large" color={"#1e90ff"} />
        ) : (
          <Button
            mode="contained"
            style={{ backgroundColor: "#1e90ff", marginTop: 24 }}
            onPress={() => {
              onSignUpPressed(), navigation.navigate("AdminNavBar");
            }}
          >
            Register
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

export default AddCenterForm;

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
  root: {
    alignItems: "center",
    padding: 20,
  },
});
