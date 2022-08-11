import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import "../assets/css/styles.css";
export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("nono@airbnb-api.com");
  const [password, setPassword] = useState("pas");

  //requette au serveur appe de cette fonction dans onpress de l'ecran signin

  const fetchSignIn = async () => {
    console.log(`de fetchSignIn ${password} ${email}`);
    try {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        {
          password: password,
          email: email,
        }
      );

      if (response.data.token) {
        console.log("token");

        setToken(response.data.token);
        // console.log(response.data.token);

        // await AsyncStorage.setItem("userToken", response.data.token);
        // const token = await AsyncStorage.getItem("token");
        // console.log(token);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.backscreen}>
      <View style={styles.organization}>
        <View style={styles.head}>
          <Image
            style={[styles.logo, styles.center]}
            source={require("../assets/img/logo.png")}
          />
          <Text style={styles.titre}>Sign in</Text>
        </View>
        <View>
          <View style={styles.underline}>
            <TextInput
              name="email"
              style={styles.textinput}
              placeholder="email"
              value={email} //"nono@airbnb-api.com"
              onChangeText={(setemail) => {
                console.log(setemail);
                setEmail(setemail);
              }}
            />
          </View>

          {/* <Text>Password: </Text> */}
          <View style={styles.underline}>
            <TextInput
              name="password"
              style={styles.textinput}
              placeholder="password"
              value={password} //"pass"
              secureTextEntry={true}
              onChangeText={(setpassword) => {
                console.log(setpassword);
                setPassword(setpassword);
              }}
            />
          </View>
        </View>
        <View style={styles.center}>
          <Text style={styles.msgtext}>please fill all fields</Text>
          <TouchableOpacity
            style={[styles.button, styles.center]}
            onPress={async () => {
              fetchSignIn;
              // const userToken =
              //   "r9GVadnOLBJxySHvgobNj0estURjI5xKHIHVRtPkmwxqOuC56WGiIvdKACrpzDV1"; //"r9GVadnOLBJxySHvgobNj0estURjI5xKHIHVRtPkmwxqOuC56WGiIvdKACrpzDV1";

              // setToken(userToken);
            }}
          >
            <Text style={styles.textbutton}>Sign in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.textbutton2}>No account ? Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  backscreen: {
    flex: 1,
    backgroundColor: "white",
  },
  organization: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: 30,
  },
  head: {
    // width: 190,
    height: 190,
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 90,
    height: 90,
    // justifyContent: "center",
  },
  titre: {
    width: 90,
    fontSize: 25,
    textAlign: "center",
    fontWeight: "500",
    marginTop: 40,
    color: "#717171",
  },
  underline: {
    height: 40,
    marginVertical: 10,
    // borderColor:"red",
    borderBottomWidth: 2,
    borderBottomColor: "#F3BBBF",
  },
  textinput: {
    fontSize: 15,
    lineHeight: 25,
  },
  button: {
    width: 200,
    height: 60,
    borderRadius: 30,
    borderColor: "#E66362",
    borderWidth: 3,
  },
  textbutton: {
    fontSize: 20,
    textAlign: "center",
    color: "#686969",
  },
  textbutton2: {
    // fontSize: 20,
    textAlign: "center",
    color: "#686969",
    marginTop: 20,
  },
  msgtext: {
    marginBottom: 15,
    color: "#E66362",
  },
});
