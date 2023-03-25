import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/screens/Login";
import SignIn from "./components/screens/SignIn";
import AddCenterForm from "./components/screens/AddCenterForm";
import Welcome from "./components/screens/Welcome";
import AdminBottomNavBar from "./components/screens/AdminBottomNavBar";
import ChannelingCentersView from "./components/screens/ChannelingCentersView";
import PharmaciesView from "./components/screens/PharmaciesView";
import UpdateChannelingCenter from "./components/screens/UpdateChannelingCenter";
import UpdatePharmacy from "./components/screens/UpdatePharmacy";
import AddMedicineForm from "./components/screens/AddMedicineForm";
import UpdateMedicineForm from "./components/screens/UpdateMedicineForm";
import ChannelingCenterBottomNavBar from "./components/screens/ChannelingCenterBottomNavBar";
import PharmacyBottomNavBar from "./components/screens/PharmacyBottomNavBar";
import ChannelingCenterHome from "./components/screens/ChannelingCenterHome";
import Doctors from "./components/screens/Doctors";
import AddDoctorForm from "./components/screens/AddDoctorForm";
import UpdateDoctorForm from "./components/screens/UpdateDoctorForm";
import PatientBottomNavBar from "./components/screens/PatientBottomNavBar";
import PatientUpdateForm from "./components/screens/PatientUpdateForm";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={Login}
        />
        <Stack.Screen name="SignUp" component={SignIn} />

        <Stack.Screen name="AddCenter" component={AddCenterForm} />
        <Stack.Screen
          name="AdminNavBar"
          component={AdminBottomNavBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="View Channeling Centers"
          component={ChannelingCentersView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="View pharmacy"
          component={PharmaciesView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Update Channeling Center"
          component={UpdateChannelingCenter}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Update Pharmacy"
          component={UpdatePharmacy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Add Medicine"
          component={AddMedicineForm}
          options={{ headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Update Medicine"
          component={UpdateMedicineForm}
          options={{ headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="ChCenterNavbar"
          component={ChannelingCenterBottomNavBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DocNPills"
          component={PharmacyBottomNavBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={ChannelingCenterHome}
          options={{ headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Doctors"
          component={Doctors}
          options={{ headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Add Doctor"
          component={AddDoctorForm}
          options={{ headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Update Doctor"
          component={UpdateDoctorForm}
          options={{ headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="PatientNavBar"
          component={PatientBottomNavBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Update Patient"
          component={PatientUpdateForm}
          options={{ headerTitleAlign: "center" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
