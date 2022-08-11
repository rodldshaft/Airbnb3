import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { useEffect, useState } from "react";
import IsLoadingwait from "../assets/components/IsLoadingwait";
import {
  Button,
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
export default function HomeScreen() {
  const navigation = useNavigation();
  const renderItem = ({ item }) => <Item title={item.title} />;

  const [lease, setLease] = useState();
  const [leaseIsLoading, setLeaseIsLoading] = useState(true);
  const showlease = () => {
    useEffect(() => {
      try {
        const fetchLease = async () => {
          const response = await axios.get(
            "https://express-airbnb-api.herokuapp.com/rooms"
          );
          setLease(response.data);
          setLeaseIsLoading(false);
          // console.log(response.data);
        };
        fetchLease();
      } catch (error) {
        console.log(error.message);
      }
    }, [lease]);
  };
  showlease();
  return leaseIsLoading === true ? (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    // <Text>"chargement en cours"</Text>

    <SafeAreaView style={styles.container}>
      <FlatList
        data={lease}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

{
  /* <View>
      <Text>Welcome!</Text>
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />
      
    </View> */
}
