import React, { useEffect } from "react";
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
} from "react-native-paper";
import db from "../../firebaseConfig";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

const ChannelingCentersView = ({ navigation }) => {
  const [centers, setCenters] = React.useState([]);
  const [deleteCenter, setDeleteCenter] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [userdetails, setUserdetails] = React.useState(null);
  const [refresh, setRefresh] = React.useState(false);

  const showDialog = () => {
    setVisible(true);
  };
  const hideDialog = () => setVisible(false);

  useEffect(() => {
    const getCenters = async () => {
      setLoading(true);
      const newList = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          newList.push({ id: doc.id, ...doc.data() });
        });
        setCenters(newList);
        setLoading(false);
      }
    };
    console.log("userdetails", centers);

    getCenters();
  }, [refresh]);

  const deleteChCenter = async (id) => {
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
          {centers
            .filter((userType) => userType.type == "Channeling Center Agent")
            .map((center) => (
              <Card
                key={center.id}
                style={{
                  backgroundColor: "#87cefa",
                  margin: 10,
                  borderRadius: 5,
                  display: "flex",
                }}
              >
                <Card.Content>
                  <Title style={{ fontWeight: "bold" }}>{center.name}</Title>
                  <Paragraph>{center.location}</Paragraph>
                  <Paragraph>{center.openHours}</Paragraph>
                  <Paragraph>{center.availabilityStatus}</Paragraph>
                  <Paragraph>{center.telephone}</Paragraph>
                </Card.Content>
                <Card.Actions>
                  <FAB
                    icon="pencil"
                    color={"#1e90ff"}
                    size="small"
                    variant="surface"
                    onPress={() => {
                      navigation.navigate("Update Channeling Center", {
                        params: { center, refresh, setRefresh },
                      });
                    }}
                  />
                  <FAB
                    icon="delete"
                    color={"#1e90ff"}
                    size="small"
                    variant="surface"
                    onPress={() => {
                      // showDialog(), setDeleteCenter(center.id);
                      deleteChCenter(center.id);
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
              <Dialog.Title>Delete Center</Dialog.Title>
              <Dialog.Content>
                <Paragraph>Are you sure want to delete this center ?</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog} textColor={"#1e90ff"}>
                  {" "}
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    deleteChCenter(), hideDialog();
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

export default ChannelingCentersView;
