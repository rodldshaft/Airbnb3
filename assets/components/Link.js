import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { useState } from "react";
import axios from "axios";
const Link = ({ password, email }) => {
  // useNavigation permet de créer une variable qui va nous permettre de naviguer même si on n'est pas dans l'enfant d'un stack screen
  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSignIn = async () => {
    const response = await axios.post(
      "https://express-airbnb-api.herokuapp.com/user/log_in",
      {
        password: password,
      },
      { email: email }
    );
    if (response.data) {
      console.log("data");
    }
  };
  fetchSignIn();

  return <View></View>;
};

export default Link;
