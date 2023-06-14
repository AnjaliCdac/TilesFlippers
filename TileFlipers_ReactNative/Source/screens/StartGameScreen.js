import { View, Pressable, StyleSheet, Text, Alert } from "react-native";
import { useState } from "react";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Colors from "../constants/Colors";
import GradientText from "../components/ui/GradientText";
import { Ionicons } from "@expo/vector-icons";

function StartGameScreen({ playGameHandler, gameMode, homeScreenHandler }) {
  const [inputValues, setInputValues] = useState({
    playerOne: "",
    playerTwo: "",
  });
  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputValues((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  function startGameHandler() {
    const playerOneIsValid = inputValues.playerOne.trim().length > 0;
    const playerTwoIsValid = inputValues.playerTwo.trim().length > 0;
    if (!playerOneIsValid && playerTwoIsValid) {
      Alert.alert("Invalid Input", "Please enter player one details");
      return;
    } else if (!playerTwoIsValid && playerOneIsValid) {
      Alert.alert("Invalid Input", "Please enter second player details");
      return;
    } else if (!playerOneIsValid && !playerTwoIsValid) {
      Alert.alert("Invalid Input", "please enter details for both player");
      return;
    }
    playGameHandler(inputValues);
  }
  let card = (
    <Card>
      <Input
        label={"Player1:"}
        textInputConfig={{
          onChangeText: inputChangeHandler.bind(this, "playerOne"),
          value: inputValues.playerOne,
          maxLength: 40,
          placeholder: "Player Name",
          placeholderTextColor: Colors.placeHolderTextColor,
        }}
      />
      <Text style={[styles.text, { textAlign: "center" }]}>VS</Text>
      <Input
        label={"Player2:"}
        textInputConfig={{
          onChangeText: inputChangeHandler.bind(this, "playerTwo"),
          value: inputValues.playerTwo,
          maxLength: 40,
          placeholder: "Player Name",
          placeholderTextColor: Colors.placeHolderTextColor,
        }}
      />
    </Card>
  );
  if (gameMode === "computer") {
    card = (
      <Card>
        <Input
          label={"Player1:"}
          textInputConfig={{
            onChangeText: inputChangeHandler.bind(this, "playerOne"),
            value: inputValues.playerOne,
            maxLength: 40,
            placeholder: "Player Name",
            placeholderTextColor: Colors.placeHolderTextColor,
          }}
        />
        <Text
          style={[
            styles.text,
            { textAlign: "center", marginTop: 6, color: Colors.borderColor },
          ]}
        >
          VS:
        </Text>
        <Input
          label={"Player2:"}
          textInputConfig={{
            value: (inputValues.playerTwo = "Computer"),
            maxLength: 40,
            placeholderTextColor: Colors.placeHolderTextColor,
            careHidden: true,
          }}
        />
      </Card>
    );
  }
  return (
    <>
      <GradientText style={styles.gradientText}>TILES FLIPPERS</GradientText>
      <View style={styles.iconContainer}>
        <Ionicons name={"heart"} size={80} color={Colors.labelColor} />
        <Ionicons name={"heart"} size={80} color={Colors.heartColor} />
      </View>
      {card}
      <View style={styles.buttonOuterContainer}>
        <Pressable
          android_ripple={{ color: Colors.rippleColor }}
          onPress={startGameHandler}
          style={[
            {
              flexDirection: "row",
              paddingVertical: 8,
              paddingHorizontal: 120,
            },
            ({ pressed }) => {
              pressed ? styles.buttonPressed : null;
            },
          ]}
        >
          <Ionicons
            name={"caret-forward-outline"}
            size={30}
            color={Colors.labelColor}
          />
          <Text style={styles.text}>Play</Text>
        </Pressable>
      </View>
      <View style={styles.buttonOuterContainer}>
        <Pressable
          android_ripple={{ color: Colors.rippleColor }}
          onPress={homeScreenHandler}
          style={[
            {
              flexDirection: "row",
              paddingVertical: 8,
              paddingHorizontal: 120,
            },
            ({ pressed }) => {
              pressed ? styles.buttonPressed : null;
            },
          ]}
        >
          <Ionicons name={"home"} size={30} color={Colors.labelColor} />
          <Text style={styles.text}>Back</Text>
        </Pressable>
      </View>
    </>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: Colors.labelColor,
    flexDirection: "row",
    overflow: "hidden",
    borderRadius: 24,
    marginVertical: 8,
    marginHorizontal: 24,
    backgroundColor: Colors.cardColor,
    elevation: 2,
  },
  text: {
    fontSize: 24,
    color: Colors.labelColor,
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  gradientText: {
    fontSize: 34,
    marginTop: 60,
    fontWeight: "bold",
    textAlign: "center",
    fontStyle: "italic",
    marginHorizontal: 24,
    padding: 8,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.5,
    overflow: "hidden",
  },
});
