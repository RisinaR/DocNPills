import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  View,
  Platform,
  Image,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import db from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const AddDoctorForm = ({ route, navigation }) => {
  //const [value, setValue] = React.useState(dayjs('2018-01-01T00:00:00.000Z'));
  const [validated, setvalidated] = useState(false);
  const [dname, setDoctorName] = useState(null);
  const [splze, setSpecialization] = useState(null);
  const [adate, setDates] = useState(null);
  const [fee, setFee] = useState(null);
  const [limit, setLimit] = useState(null);
  const [time, setTime] = useState(null);
  const [mode, setMode] = useState("time");
  const [show, setShow] = useState(false);
  const [text, setText] = useState(" ");
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);

  const refresh = route.params.params.refresh;
  const setRefresh = route.params.params.setRefresh;

  const checkSubmit = async () => {
    if (
      dname != null &&
      splze != null &&
      time != null &&
      fee != null &&
      limit != null
    ) {
      try {
        const docRef = await addDoc(collection(db, "doctors"), {
          name: dname,
          specialization: splze,
          availableDate: adate,
          arrivalTime: time,
          channelingFee: fee,
          noofPatients: limit,
          channelingCenterName: name,
          channelingCenterId: id,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (err) {
        console.error("Error adding document: ", err);
      }
      setRefresh(!refresh);
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
    <ScrollView style={styles.view}>
      <Image
        source={require("../../assets/logo.png")}
        style={{ width: 50, height: 50, marginLeft: "42%" }}
      />
      <SafeAreaView style={styles.form}>
        <TextInput
          label="Doctor Name"
          placeholder="Enter Doctor Name"
          value={dname}
          style={styles.input}
          onChangeText={(text) => setDoctorName(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <TextInput
          label="Specialization"
          placeholder="Enter Doctor's Specialization"
          value={splze}
          style={styles.input}
          onChangeText={(text) => setSpecialization(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <TextInput
          label="Available Date"
          placeholder="Enter Available Date"
          value={adate}
          style={styles.input}
          onChangeText={(text) => setDates(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <TextInput
          label="Arrival Time"
          placeholder="Select Arrival Time"
          value={time}
          style={styles.input}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
          onChangeText={(selectedtime) => setTime(selectedtime)}
        />

        <TextInput
          label="Channeling Fee"
          placeholder="LKR 0.00"
          value={fee}
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => setFee(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <TextInput
          label="No of Patients"
          placeholder="Enter Daily patients checking limit"
          value={limit}
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => setLimit(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <Button
          mode="contained"
          buttonColor="#1e90ff"
          style={styles.button}
          onPress={() => {
            checkSubmit(), navigation.navigate("ChCenterNavbar");
          }}
        >
          ADD
        </Button>
      </SafeAreaView>
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

export default AddDoctorForm;
