import { Image, View, StyleSheet, Pressable, Text } from "react-native";
import GradientText from "../components/ui/GradientText";
import Colors from "../constants/Colors";
import Card from "../components/ui/Card";
import { Ionicons } from "@expo/vector-icons";

function GameOverScreen({
  result,
  inputValues,
  playGameHandler,
  homeScreenHandler,
  level,
}) {
  const winner = result.winner;
  function backButtonHandler() {
    if (level === "levelOne") {
      playGameHandler(inputValues);
    } else if (level === "levelTwo") {
      playGameHandler(inputValues);
    }
  }
  return (
    <View style={styles.gameOverContainer}>
      <View style={styles.winImageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/winner.gif")}
        />
      </View>
      {winner !== "There is Draw" ? (
        <GradientText style={[styles.gradientText, { fontSize: 34 }]}>
          Winner Is {winner}
        </GradientText>
      ) : (
        <GradientText style={styles.gradientText}>"There Is Draw"</GradientText>
      )}
      <Card>
        <GradientText style={styles.gradientText}>
          {result.name1 + "'s"}
          {" " + "Score IS:" + " "}
          {result.score1}
        </GradientText>
        <GradientText style={styles.gradientText}>
          {result.name2 + "'s"}
          {" " + "Score IS:" + " "}
          {result.score2}
        </GradientText>
      </Card>
      <View style={styles.outerButtonContainer}>
        <Pressable
          style={styles.buttonInnerContainer}
          onPress={backButtonHandler}
        >
          <Ionicons
            name={"arrow-back-circle-outline"}
            size={30}
            color={Colors.labelColor}
          />
          <Text style={styles.text}>Back</Text>
        </Pressable>
      </View>
      <View style={styles.outerButtonContainer}>
        <Pressable
          style={styles.buttonInnerContainer}
          onPress={homeScreenHandler}
        >
          <Ionicons name={"exit-outline"} size={30} color={Colors.labelColor} />
          <Text style={styles.text}>Exit</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default GameOverScreen;

const styles = StyleSheet.create({
  gameOverContainer: {
    flex: 1,
  },
  gradientText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    fontStyle: "italic",
    padding: 8,
  },
  winImageContainer: {
    width: 350,
    height: 350,
    borderRadius: 175,
    borderColor: Colors.cardColor,
    borderWidth: 3,
    overflow: "hidden",
    margin: 24,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  outerButtonContainer: {
    marginHorizontal: 24,
    marginVertical: 4,
  },
  buttonInnerContainer: {
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 24,
    backgroundColor: Colors.cardColor,
    borderWidth: 4,
    borderColor: Colors.labelColor,
    overflow: "hidden",
  },
  text: {
    fontSize: 24,
    color: Colors.labelColor,
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
