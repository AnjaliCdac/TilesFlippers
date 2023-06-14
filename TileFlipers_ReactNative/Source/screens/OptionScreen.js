import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Image,
  BackHandler,
} from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import GradientText from "../components/ui/GradientText";

function OptionScreen({ startScreenHandler, instructionHandler }) {
  function exitHandler() {
    BackHandler.exitApp();
  }

  return (
    <View style={styles.rootConatiner}>
      <View style={styles.winImageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/frontImage.png")}
        />
      </View>
      <View style={styles.optionView}>
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={startScreenHandler.bind(this, "friends")}
            android_ripple={{ color: Colors.rippleColor }}
            style={[
              {
                paddingVertical: 2,
                paddingHorizontal: 2,
              },
              ({ pressed }) => {
                pressed ? styles.buttonPressed : null;
              },
            ]}
          >
            <Text style={styles.text}>Play With Friends</Text>
          </Pressable>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            onPress={startScreenHandler.bind(this, "computer")}
            android_ripple={{ color: Colors.rippleColor }}
            style={[
              {
                paddingVertical: 2,
                paddingHorizontal: 2,
              },
              ({ pressed }) => {
                pressed ? styles.buttonPressed : null;
              },
            ]}
          >
            <Text style={styles.text}>Play With Computer</Text>
          </Pressable>
        </View>
      </View>
      <Pressable style={styles.textContainer} onPress={instructionHandler}>
        <GradientText style={styles.gradientText}>How To Play?</GradientText>
      </Pressable>

      <Pressable style={styles.iconContainer} onPress={exitHandler}>
        <Ionicons name={"exit-outline"} size={60} color={Colors.cardColor} />
      </Pressable>
    </View>
  );
}

export default OptionScreen;

const styles = StyleSheet.create({
  rootConatiner: {
    flex: 3,
    marginTop: 80,
  },
  optionView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonContainer: {
    width: 150,
    height: 100,
    borderRadius: 8,
    backgroundColor: Colors.cardColor,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    borderWidth: 4,
    borderColor: Colors.labelColor,
    overflow: "hidden",
  },
  text: {
    fontSize: 24,
    fontStyle: "italic",
    fontWeight: "bold",
    color: Colors.labelColor,
  },
  winImageContainer: {
    flex: 1.5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "70%",
    height: "70%",
  },
  buttonPressed: {
    opacity: 0.5,
    overflow: "hidden",
  },
  iconContainer: {
    flex: 0.3,
    alignItems: "center",
  },
  gradientText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    fontStyle: "italic",
    marginHorizontal: 24,
    padding: 8,
  },
  textContainer: {
    flex: 0.2,
  },
});
