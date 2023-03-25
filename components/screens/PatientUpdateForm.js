import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  TextInput,
  Button,
  Snackbar,
  ActivityIndicator,
} from "react-native-paper";
import db from "../../firebaseConfig";

const PatientUpdateForm = ({ navigation, route }) => {
  const [newname, setName] = useState(route.params.params.name);
  const [newemail, setEmail] = useState(route.params.params.email);
  const [newmobile, setMobile] = useState(route.params.params.mobile);
  const [newaddress, setAddress] = useState(route.params.params.address);
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
    navigation.navigate("PatientNavBar", { screen: "Profile" });
  };

  const onToggleSnackBar = () => {
    setVisible(!visible);
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "users", (doc.id = route.params.params.id)), {
        name: newname,
        email: newemail,
        mobile: newmobile,
        address: newaddress,
      });
      console.log("Document updated ");
      const q = query(collection(db, "users"), where("email", "==", newemail));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        AsyncStorage.setItem("user", JSON.stringify(doc.data()));
        AsyncStorage.setItem("id", doc.id);
      });
      onToggleSuccessSnackBar();
      setLoading(false);
    } catch (e) {
      console.error("Error Updating Document: ", e);
      onToggleSnackBar();
      setLoading(false);
    }

    setRefresh(!refresh);
  };

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <Image
        source={require("../../assets/logoNoBG.png")}
        style={{
          height: 120,
          width: "40%",
          alignSelf: "center",
          marginTop: 10,
        }}
      />
      <SafeAreaView style={styles.form}>
        <TextInput
          label="Name"
          placeholder="Enter Your Name"
          value={newname}
          style={styles.input}
          onChangeText={(text) => setName(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <TextInput
          label="Email Address"
          placeholder="Enter Your Email"
          value={newemail}
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
          disabled
        />

        <TextInput
          label="Mobile Number"
          placeholder="Enter Your Mobile Number"
          value={newmobile}
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => setMobile(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <TextInput
          label="Address"
          placeholder="Enter Your Residential Address"
          value={newaddress}
          style={styles.input}
          onChangeText={(text) => setAddress(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />
        {loading ? (
          <ActivityIndicator
            animating={true}
            size="large"
            color={"#1e90ff"}
            // style={{ marginTop: "50%" }}
          />
        ) : (
          <Button
            onPress={handleSubmit}
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
        Profile Not Updated
      </Snackbar>
      <Snackbar
        visible={visibleSuccess}
        onDismiss={onDismissSuccessSnackBar}
        duration={2000}
        elevation={5}
      >
        Profile Update Successfully
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 15,
    width: "90%",
    alignSelf: "center",
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
    height: "100%",
  },
  form: {
    padding: 5,
    height: "100%",
  },
});

export default PatientUpdateForm;
