import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Button,
  Text,
  TextInput,
  Textarea,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("gege@mail-api.com");
  const [password, setPassword] = useState("pas");
  const [description, setDescription] = useState("Your Welcome!");
  const [userName, setUserName] = useState("gege");
  const [confirmPassword, setConfirmPassword] = useState("pas");
  //requette au serveur appe de cette fonction dans onpress de l'ecran signin

  const fetchSignUp = async () => {
    console.log(`de fetchSignIn ${password} ${email}`);
    try {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/sign_up",
        {
          password: password,
          email: email,
          description: description,
          userName: userName,
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
      console.log(error);
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
          <Text style={styles.titre}>Sign up</Text>
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
          <View style={styles.underline}>
            <TextInput
              name="username"
              style={styles.textinput}
              placeholder="username"
              value={userName} //"nono@airbnb-api.com"
              onChangeText={(setusername) => {
                console.log(setusername);
                setUserName(setusername);
              }}
            />
          </View>
          <View style={styles.textarea}>
            <TextInput
              name="description"
              style={styles.textinputarea}
              placeholder="Describe yourself in a few words..."
              value={description} //"nono@airbnb-api.com"
              onChangeText={(settext) => {
                console.log(settext);
                setdescription(settext);
              }}
            />
          </View>
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
          <View style={styles.underline}>
            <TextInput
              name="confirmpassword"
              style={styles.textinput}
              placeholder="confirm password"
              value={confirmPassword} //"pass"
              secureTextEntry={true}
              onChangeText={(setconfirmpassword) => {
                console.log(setconfirmpassword);
                setConfirmPassword(setconfirmpassword);
              }}
            />
          </View>
        </View>
        <View style={styles.center}>
          <Text style={styles.msgtext}>please fill all fields</Text>
          <TouchableOpacity
            style={[styles.button, styles.center]}
            onPress={async () => {
              fetchSignUp;
              const userToken = token;
              setToken(userToken);
            }}
          >
            <Text style={styles.textbutton}>Sign up</Text>
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
    marginVertical: 10,

    fontSize: 15,
    lineHeight: 25,
  },
  textinputarea: {
    fontSize: 15,
    // lineHeight: 25,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  textarea: {
    height: 80,
    borderWidth: 2,
    borderColor: "#F3BBBF",
    marginVertical: 20,
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

// title="Sign up"
// onPress={async () => {
//   const userToken = "secret-token";
//   setToken(userToken);
// }}
