import { View, Pressable, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const windowsWidth = Dimensions.get("window").width;

function Grid({
  icon,
  color,
  borderRightWidth,
  borderBottomWidth,
  borderTopWidth,
  borderLeftWidth,
  onPress,
  gridSize,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.cell,
        {
          borderRightWidth: borderRightWidth,
          borderBottomWidth: borderBottomWidth,
          borderTopWidth: borderTopWidth,
          borderLeftWidth: borderLeftWidth,
          height: windowsWidth / gridSize,
          width: windowsWidth / gridSize,
        },
      ]}
    >
      <Ionicons name={icon} size={80} color={color} />
    </Pressable>
  );
}

export default Grid;

const styles = StyleSheet.create({
  cell: {
    height: 100,
    width: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 6,
    backgroundColor: Colors.cardColor,
    borderColor: Colors.borderColor,
    borderRadius: 6,
  },
});
