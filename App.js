import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/screens/Login";
import SignIn from "./components/screens/SignIn";
import Home from "./components/screens/Home";
import AddCenterForm from "./components/screens/AddCenterForm";
import Welcome from "./components/screens/Welcome";
import AdminBottomNavBar from "./components/screens/AdminBottomNavBar";
import ChannelingCentersView from "./components/screens/ChannelingCentersView";
import PharmaciesView from "./components/screens/PharmaciesView";
import UpdateChannelingCenter from "./components/screens/UpdateChannelingCenter";
import UpdatePharmacy from "./components/screens/UpdatePharmacy";

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
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}