import { doc, updateDoc } from "firebase/firestore";
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
  Snackbar,
  ActivityIndicator,
} from "react-native-paper";
import db from "../../firebaseConfig";

const UpdateMedicineForm = ({ route, navigation }) => {
  const medicine = route.params.params.medicine;

  const refresh = route.params.params.refresh;
  const setRefresh = route.params.params.setRefresh;

  const [validated, setvalidated] = useState(false);
  const [bname, setBrandName] = useState(medicine.brandName);
  const [mterm, setMedicalTerm] = useState(medicine.medicalTerm);
  const [type, setType] = useState(medicine.type);
  const [stock, setStock] = useState(medicine.qty);
  const [price, setPrice] = useState(medicine.price);
  const [dose, setDose] = useState(medicine.dose);

  const [loading, setLoading] = useState(false);

  const [visibleError, setVisibleError] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);

  const onToggleSuccessSnackBar = () => {
    setVisibleSuccess(!visibleSuccess);
  };

  const onDismissSuccessSnackBar = () => {
    setVisibleSuccess(false);
    navigation.navigate("DocNPills");
  };

  const onToggleErrorSnackBar = () => {
    setVisibleError(!visibleError);
  };

  const onDismissErrorSnackBar = () => {
    setVisibleError(false);
    setLoading(false);
  };

  const handleUpdate = async () => {
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
        await updateDoc(doc(db, "medicines", (doc.id = medicine.id)), {
          brandName: bname,
          medicalTerm: mterm,
          price: price,
          qty: stock,
          type: type,
          dose: dose,
        });
        console.log("Document updated ");
        onToggleSuccessSnackBar();
      } catch (e) {
        console.error("Error Updating Document: ", e);
        onToggleErrorSnackBar();
      }
      setLoading(false);
      setRefresh(!refresh);
    } else {
      alert("Please fill all the fields");
    }
  };

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
              onPress={handleUpdate}
              mode="contained"
              buttonColor="#1e90ff"
              style={styles.button}
            >
              SAVE CHANGES
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
        Medicine Updated Successfully
      </Snackbar>
    </>
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

export default UpdateMedicineForm;
