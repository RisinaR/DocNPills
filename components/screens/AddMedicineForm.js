import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import {
  TextInput,
  Button,
  Snackbar,
  ActivityIndicator,
} from "react-native-paper";

import { Select } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import db from "../../firebaseConfig";

const AddMedicineForm = ({ route, navigation }) => {
  const [validated, setvalidated] = useState(false);
  const [bname, setBrandName] = useState(null);
  const [mterm, setMedicalTerm] = useState(null);
  const [type, setType] = useState(null);
  const [stock, setStock] = useState(null);
  const [price, setPrice] = useState(null);
  const [dose, setDose] = useState(null);

  const [loading, setLoading] = useState(false);

  const [id, setId] = useState(null);
  const [name, setName] = useState(null);

  const [visibleError, setVisibleError] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);

  const refresh = route.params.params.refresh;
  const setRefresh = route.params.params.setRefresh;

  const onToggleSuccessSnackBar = () => {
    setVisibleSuccess(!visibleSuccess);
  };

  const onDismissSuccessSnackBar = () => {
    setVisibleSuccess(false);
    setRefresh(!refresh);
    navigation.navigate("DocNPills");
  };

  const onToggleErrorSnackBar = () => {
    setVisibleError(!visibleError);
  };

  const onDismissErrorSnackBar = () => {
    setVisibleError(false);
    setLoading(false);
  };

  const checkSubmit = async () => {
    setLoading(true);
    if (
      bname != null &&
      mterm != null &&
      type != null &&
      stock != null &&
      price != null &&
      dose != null
    ) {
      try {
        console.log("id", id, name);
        const docRef = await addDoc(collection(db, "medicines"), {
          brandName: bname,
          medicalTerm: mterm,
          price: price,
          qty: stock,
          type: type,
          dose: dose,
          pharmacyName: name,
          pharmacyId: id,
        });
        console.log("Document written with ID: ", docRef.id);
        setLoading(false);
        onToggleSuccessSnackBar();
      } catch (err) {
        console.error("Error adding document: ", err);
        setLoading(false);
        onToggleErrorSnackBar();
      }
    } else {
      alert("Please fill all the fields");
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        await AsyncStorage.getItem("id").then((data) => {
          setId(data);
        });
        await AsyncStorage.getItem("user").then((data) => {
          const user = JSON.parse(data);

          setName(user.name);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  return (
    <>
      <ScrollView style={styles.view}>
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 50, height: 50, marginLeft: "42%" }}
        />

        <SafeAreaView style={styles.form}>
          <TextInput
            label="Brand Name"
            placeholder="Enter Brand Name"
            value={bname}
            style={styles.input}
            onChangeText={(text) => setBrandName(text)}
            mode="outlined"
            outlineColor="black"
            activeOutlineColor="#1e90ff"
          />

          <TextInput
            label="Medical Term"
            placeholder="Enter Medical Term"
            value={mterm}
            style={styles.input}
            onChangeText={(text) => setMedicalTerm(text)}
            mode="outlined"
            outlineColor="black"
            activeOutlineColor="#1e90ff"
          />

          <TextInput
            label="Type"
            placeholder="Enter Type"
            value={type}
            style={styles.input}
            onChangeText={(text) => setType(text)}
            mode="outlined"
            outlineColor="black"
            activeOutlineColor="#1e90ff"
          />

          <TextInput
            label="Stock"
            placeholder="Enter Stock"
            value={stock}
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => setStock(text)}
            mode="outlined"
            outlineColor="black"
            activeOutlineColor="#1e90ff"
          />

          <TextInput
            label="Price"
            placeholder="LKR 0.00"
            value={price}
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => setPrice(text)}
            mode="outlined"
            outlineColor="black"
            activeOutlineColor="#1e90ff"
          />

          <TextInput
            label="Dose"
            placeholder="Enter Dose"
            value={dose}
            style={styles.input}
            onChangeText={(text) => setDose(text)}
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
              mode="contained"
              buttonColor="#1e90ff"
              style={styles.button}
              onPress={checkSubmit}
            >
              ADD
            </Button>
          )}
        </SafeAreaView>
      </ScrollView>

      <Snackbar
        visible={visibleError}
        onDismiss={onDismissErrorSnackBar}
        duration={2000}
        elevation={5}
      >
        Not Successful
      </Snackbar>
      <Snackbar
        visible={visibleSuccess}
        onDismiss={onDismissSuccessSnackBar}
        duration={2000}
        elevation={5}
      >
        Medicine Added Successfully
      </Snackbar>
    </>
  );
};
export default AddMedicineForm;

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
