import React from "react";
import {
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  View,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../firebaseConfig";

const UpdateDoctorForm = ({ route, navigation }) => {
  const doctor = route.params.params.doctor;
  const refresh = route.params.params.refresh;
  const setRefresh = route.params.params.setRefresh;
  const [validated, setvalidated] = useState(false);
  const [dname, setDoctorName] = useState(doctor.name);
  const [splze, setSpecialization] = useState(doctor.specialization);
  const [adate, setDate] = useState(doctor.availableDate);
  // const [atime, setTime] = useState(doctor.availableTime);
  const [fee, setFee] = useState(doctor.channelingFee);
  const [limit, setLimit] = useState(doctor.noofPatients);

  const [utime, setTime] = useState(doctor.arrivalTime);
  const [atime, setTime1] = useState(new Date());
  const [mode, setMode] = useState("time");
  const [show, setShow] = useState(false);
  //const [text, setText] = useState(' ');

  const handleUpdate = async () => {
    if (
      dname != null &&
      splze != null &&
      utime != null &&
      fee != null &&
      limit != null
    ) {
      try {
        await updateDoc(doc(db, "doctors", (doc.id = doctor.id)), {
          name: dname,
          specialization: splze,
          availableDate: adate,
          arrivalTime: utime,
          channelingFee: fee,
          noofPatients: limit,
        });
        console.log("Document updated ");
      } catch (e) {
        console.error("Error Updating Document: ", e);
      }
      setRefresh(!refresh);
    } else {
      alert("Please fill all the fields");
    }
  };

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
          onChangeText={(text) => setDate(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <TextInput
          label="Arrival Time"
          placeholder="Select Arrival Time"
          value={utime}
          style={styles.input}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
          onChange={(selectedtime) => setTime(selectedtime)}
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
          onPress={() => {
            handleUpdate(), navigation.navigate("ChCenterNavbar");
          }}
          mode="contained"
          buttonColor="#1e90ff"
          style={styles.button}
        >
          SAVE CHANGES
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

export default UpdateDoctorForm;
