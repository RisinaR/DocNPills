import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View, Alert } from "react-native";
import { Text, ActivityIndicator, Snackbar } from "react-native-paper";
import Background from "../Assets/Background";
import Logo from "../Assets/Logo";
import Header from "../Assets/Header";
import Button from "../Assets/Button";
import TextInput from "../Assets/TextInput";
import BackButton from "../Assets/BackButton";
import { theme } from "../core/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import db from "../../firebaseConfig";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [visibleError, setVisibleError] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [userData, setUserData] = useState(null);

  //const navigation = useNavigation;
  const auth = getAuth();

  const onToggleSuccessSnackBar = () => {
    setVisibleSuccess(!visibleSuccess);
  };

  const onDismissSuccessSnackBar = () => {
    console.log("userData", userData.type);
    setVisibleSuccess(false);
    if (userData.type == "Pharmacy Agent") {
      navigation.push("DocNPills");
    } else if (userData.type == "Channeling Center Agent") {
      navigation.push("ChCenterNavbar");
    } else if (userData.type == "Patient") {
      navigation.push("PatientNavBar");
    } else if (userData.type == "System Admin") {
      navigation.push("AdminNavBar");
    } else {
      alert(" You have to signup first ");
    }
  };

  const onToggleErrorSnackBar = () => {
    setVisibleError(!visibleError);
  };

  const onDismissErrorSnackBar = () => {
    setVisibleError(false);
    setLoading(false);
  };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       navigation.replace("AdminNavBar");
  //     }
  //   });
  //   return unsubscribe;
  // }, []);

  const handleLogin = async () => {
    setLoading(true);
    if (email.length == 0 || password.length == 0) {
      alert("Please fill all the fields");
      setLoading(false);
    } else {
      await signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredentials) => {
          const user = userCredentials.user;
          console.log("Logged in with:", user);
          const q = query(
            collection(db, "users"),
            where("email", "==", user.email)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            AsyncStorage.setItem("user", JSON.stringify(doc.data()));
            AsyncStorage.setItem("id", doc.id);
            setUserData(doc.data());
          });
          setLoading(false);

          onToggleSuccessSnackBar();
        })
        .catch((error) => {
          setErrorMsg(error.message);
          onToggleErrorSnackBar();
        });
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={(text) => setEmail(text)}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        mode="outlined"
        outlineColor="black"
        activeOutlineColor="#1e90ff"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={(text) => setPassword(text)}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry={true}
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
          style={{ backgroundColor: "#1e90ff" }}
          onPress={handleLogin}
        >
          Login
        </Button>
      )}
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("SignUp")}>
          <Text style={styles.link}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <Snackbar
        visible={visibleError}
        onDismiss={onDismissErrorSnackBar}
        duration={2000}
        elevation={5}
      >
        {errorMsg}
      </Snackbar>
      <Snackbar
        visible={visibleSuccess}
        onDismiss={onDismissSuccessSnackBar}
        duration={2000}
        elevation={5}
      >
        Login Successfully. Redirecting...
      </Snackbar>
    </Background>
  );
};

export default Login;

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
