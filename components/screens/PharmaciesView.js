import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Searchbar } from "react-native-paper";
import {
  Card,
  Title,
  Paragraph,
  IconButton,
  Dialog,
  Portal,
  Provider,
  Button,
  FAB,
  ActivityIndicator,
  Snackbar,
} from "react-native-paper";
import db from "../../firebaseConfig";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

const PharmaciesView = ({ navigation }) => {
  const [pharmacies, setPharmacies] = useState([]);
  const [deletePharmacy, setDeletePharmacy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [userdetails, setUserdetails] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [visibleError, setVisibleError] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);

  const onToggleSuccessSnackBar = () => {
    setVisibleSuccess(!visibleSuccess);
  };

  const onDismissSuccessSnackBar = () => {
    setVisibleSuccess(false);
  };

  const onToggleErrorSnackBar = () => {
    setVisibleError(!visibleError);
  };

  const onDismissErrorSnackBar = () => {
    setVisibleError(false);
  };

  const showDialog = () => {
    setVisible(true);
  };
  const hideDialog = () => setVisible(false);

  useEffect(() => {
    const getPharmacies = async () => {
      setLoading(true);
      const newList = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          newList.push({ id: doc.id, ...doc.data() });
        });
        setPharmacies(newList);
        setLoading(false);
      }
    };
    console.log("userdetails", pharmacies);

    getPharmacies();
  }, [refresh]);

  const deletePharmacyUser = async (id) => {
    console.log("dele", deletePharmacy);
    try {
      await deleteDoc(doc(db, "users", (doc.id = id)));
      console.log("Document Deleted");
    } catch (e) {
      console.error("Error Deleting Document: ", e);
    }
    setRefresh(!refresh);
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator
          animating={true}
          color={"#1e90ff"}
          style={{ marginTop: 20 }}
        />
      ) : (
        <ScrollView>
          {pharmacies
            .filter((userType) => userType.type === "Pharmacy Agent")
            .map((pharmacy) => (
              <Card
                key={pharmacy.id}
                style={{
                  backgroundColor: "#87cefa",
                  margin: 10,
                  borderRadius: 5,
                  display: "flex",
                }}
              >
                {console.log("pharmacy", pharmacy)}
                <Card.Content>
                  <Title style={{ fontWeight: "bold" }}>{pharmacy.name}</Title>
                  <Paragraph>{pharmacy.location}</Paragraph>
                  <Paragraph>{pharmacy.openHours}</Paragraph>
                  <Paragraph>{pharmacy.availabilityStatus}</Paragraph>
                  <Paragraph>{pharmacy.telephone}</Paragraph>
                </Card.Content>
                <Card.Actions>
                  <FAB
                    icon="pencil"
                    color={"#1e90ff"}
                    size="small"
                    variant="surface"
                    onPress={() => {
                      navigation.navigate("Update Pharmacy", {
                        params: { pharmacy, refresh, setRefresh },
                      });
                    }}
                  />
                  <FAB
                    icon="delete"
                    color={"#1e90ff"}
                    size="small"
                    variant="surface"
                    onPress={() => {
                      // showDialog(), setDeletePharmacy(pharmacy.id);
                      deletePharmacyUser(pharmacy.id);
                    }}
                  />
                </Card.Actions>
              </Card>
            ))}
        </ScrollView>
      )}

      <Provider>
        <View>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Delete Pharmacy</Dialog.Title>
              <Dialog.Content>
                <Paragraph>
                  Are you sure want to delete this pharmacy ?
                </Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog} textColor={"#1e90ff"}>
                  {" "}
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    deletePharmacyUser(), hideDialog();
                  }}
                  textColor={"red"}
                >
                  Delete
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>

      <View style={{ marginLeft: "75%", marginBottom: "1%" }}>
        <IconButton
          icon="plus"
          iconColor={"white"}
          size={40}
          backgroundColor={"#1e90ff"}
          borderRadius={10}
          onPress={() => {
            navigation.navigate("AddCenter", {
              params: { refresh, setRefresh },
            });
          }}
        />
      </View>
    </>
  );
};

export default PharmaciesView;
