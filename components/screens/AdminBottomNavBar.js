import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import AboutUs from "./AboutUs";
import AdminDashBoard from "./AdminDashboard";
import ChannelingCentersView from "./ChannelingCentersView";
import PharmaciesView from "./PharmaciesView";
import AdminProfile from "./AdminProfile";

const adDashboard = "AdDashboard";
const searchChannelingCenter = "Channeling Centers";
const searchPharmacy = "Pharmacies";
const profile = "Profile";
const about = "About Us";

const Tab = createBottomTabNavigator();

const AdminBottomNavBar = () => {
  return (
    <Tab.Navigator
      initialRouteName={adDashboard}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let routerName = route.name;

          if (routerName === adDashboard) {
            iconName = focused ? "home" : "home-outline";
          } else if (routerName === searchPharmacy) {
            iconName = focused ? "medkit" : "medkit-outline";
          } else if (routerName === searchChannelingCenter) {
            iconName = focused ? "people" : "people-outline";
          } else if (routerName === about) {
            iconName = focused
              ? "information-circle"
              : "information-circle-outline";
          } else if (routerName === profile) {
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
      <Tab.Screen
        name={adDashboard}
        component={AdminDashBoard}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={searchChannelingCenter}
        component={ChannelingCentersView}
      />
      <Tab.Screen name={searchPharmacy} component={PharmaciesView} />
      <Tab.Screen name={about} component={AboutUs} />
      <Tab.Screen name={profile} component={AdminProfile} />
    </Tab.Navigator>
  );
};

export default AdminBottomNavBar;
