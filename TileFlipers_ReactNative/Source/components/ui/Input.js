import { View, Text, TextInput, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

function Input({ label, textInputConfig }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...textInputConfig} style={styles.text} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.labelColor,
    marginBottom: 4,
  },
  text: {
    borderWidth: 4,
    color: Colors.labelColor,
    fontSize: 24,
    borderColor: Colors.labelColor,
    borderRadius: 6,
    padding: 6,
  },
});
