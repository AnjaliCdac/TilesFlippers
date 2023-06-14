import { View, Text, Pressable, StyleSheet } from "react-native";
import GradientText from "../components/ui/GradientText";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
function Instructionscreen({ homeScreenHandler }) {
  return (
    <>
      <View style={styles.outerConatiner}>
        <GradientText style={styles.gradientText}>
          1. Try to cover vertical, horizontal or digonal axis with same colour
          heart(will give 5 points).
        </GradientText>
        <GradientText style={styles.gradientText}>
          2. Covering of common axis b/w same colour will also increase your
          points(will give 1 point).
        </GradientText>
        <GradientText style={styles.gradientText}>
          3. One who will get more points will win.
        </GradientText>
        <GradientText style={styles.gradientText}>
          4. Vertical/Digonal/Horizontal whole line cover will get 5 points.
        </GradientText>
        <GradientText style={styles.gradientText}>
          5. Common line coverage b/w same colour will give 1 point.
        </GradientText>
        <View style={styles.outerButtonContainer}>
          <Pressable
            style={styles.buttonInnerContainer}
            onPress={homeScreenHandler}
          >
            <Ionicons
              name={"arrow-back-circle-outline"}
              size={30}
              color={Colors.labelColor}
            />
            <Text style={styles.text}>Back</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

export default Instructionscreen;

const styles = StyleSheet.create({
  gradientText: {
    fontSize: 24,
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
    fontStyle: "italic",
    padding: 8,
  },
  outerConatiner: {
    marginTop: 40,
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
