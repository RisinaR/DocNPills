import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import PharmacyHome from "./PharmacyHome";
import Medicines from "./Medicines";
import PharmacyProfile from "./PharmacyProfile";
import AboutUs from "./AboutUs";

const home = "Home";
const medicines = "Medicines";
const profile = "Profile";
const about = "About Us";

const Tab = createBottomTabNavigator();

const PharmacyBottomNavBar = () => {
  return (
    <Tab.Navigator
      initialRouteName={home}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === home) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === medicines) {
            iconName = focused ? "medkit" : "medkit-outline";
          } else if (rn === about) {
            iconName = focused
              ? "information-circle"
              : "information-circle-outline";
          } else if (rn === profile) {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      BottomNavigationBarOptions={{
        activeTintColor: "#1e90ff",
        inactiveTintColor: "grey",
        labelStyle: { paddingBottom: 10, fontSize: 10 },
        style: { padding: 10, height: 70 },
      }}
    >
      <Tab.Screen name={home} component={PharmacyHome} options={{ headerTitleAlign:'center' }}/>
      <Tab.Screen name={medicines} component={Medicines} options={{ headerTitleAlign:'center' }}/>
      <Tab.Screen name={about} component={AboutUs} options={{ headerTitleAlign:'center' }}/>
      <Tab.Screen name={profile} component={PharmacyProfile} options={{ headerTitleAlign:'center' }}/>
    </Tab.Navigator>
  );
};

export default PharmacyBottomNavBar;
