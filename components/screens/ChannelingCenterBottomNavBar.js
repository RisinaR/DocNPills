import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import ChannelingCenterHome from "./ChannelingCenterHome";
import Doctors from "./Doctors";
import ChannelingCenterProfile from "./ChannelingCenterProfile";
import AboutUs from "./AboutUs";

const home = "Home";
const doctors = "Doctors";
const profile = "Profile";
const about = "About Us";

const Tab = createBottomTabNavigator();

const ChannelingCenterBottomNavBar = () => {
  return (
    <Tab.Navigator
      initialRouteName={home}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === home) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === doctors) {
            iconName = focused ? "people" : "people-outline";
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
      <Tab.Screen name={home} component={ChannelingCenterHome} />
      <Tab.Screen name={doctors} component={Doctors} />
      <Tab.Screen name={about} component={AboutUs} />
      <Tab.Screen name={profile} component={ChannelingCenterProfile} />
    </Tab.Navigator>
  );
};

export default ChannelingCenterBottomNavBar;
