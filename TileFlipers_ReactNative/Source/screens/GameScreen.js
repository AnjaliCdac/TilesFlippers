import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";
import Grid from "../components/ui/grid";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import GradientText from "../components/ui/GradientText";

function GameScreen({
  nextLevelHandler,
  inputValues,
  homeScreenHandler,
  gameOver,
  gameResult,
}) {
  const [activePlayer, setActivePlayer] = useState(inputValues.playerOne);
  const [markers, setMarkers] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  function nextLevelUserHandler() {
    nextLevelHandler(inputValues);
  }

  function markPositionHandler(position) {
    if (!markers[position]) {
      let temp = [...markers];
      temp[position] = activePlayer;
      setMarkers(temp);

      if (activePlayer === inputValues.playerOne) {
        setActivePlayer(inputValues.playerTwo);
      } else {
        setActivePlayer(inputValues.playerOne);
      }
    }
  }

  function resetHandler() {
    setMarkers([null, null, null, null, null, null, null, null, null]);
  }

  function calculateWinner(currentMarker) {
    let initWinOne = currentMarker[0];
    let initWinOneCount = 0;
    let initWinTwoCount = 0;
    let initWinTwo = currentMarker[0];
    for (i = 0; i < currentMarker.length; i++) {
      if (initWinOne !== currentMarker[i]) {
        initWinTwo = currentMarker[i];
      }
    }
    if (initWinOne !== initWinTwo) {
      const linesBonus = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < linesBonus.length; i++) {
        const [a, b, c] = linesBonus[i];
        if (
          currentMarker[a] === initWinOne &&
          currentMarker[a] === currentMarker[b] &&
          currentMarker[a] === currentMarker[c]
        ) {
          initWinOneCount = initWinOneCount + 5;
        } else if (
          currentMarker[a] === initWinTwo &&
          currentMarker[a] === currentMarker[b] &&
          currentMarker[a] === currentMarker[c]
        ) {
          initWinTwoCount = initWinTwoCount + 5;
        }
      }
      const lines = [
        [0, 1],
        [0, 3],
        [0, 4],
        [1, 2],
        [1, 4],
        [2, 5],
        [3, 4],
        [3, 6],
        [4, 5],
        [4, 7],
        [5, 8],
        [6, 7],
        [7, 8],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b] = lines[i];
        if (
          currentMarker[a] === initWinOne &&
          currentMarker[a] === currentMarker[b]
        ) {
          initWinOneCount = initWinOneCount + 1;
        } else if (
          currentMarker[a] === initWinTwo &&
          currentMarker[a] === currentMarker[b]
        ) {
          initWinTwoCount = initWinTwoCount + 1;
        }
      }
    }
    gameResult.name1 = initWinOne;
    gameResult.name2 = initWinTwo;
    gameResult.score1 = initWinOneCount;
    gameResult.score2 = initWinTwoCount;
    if (initWinOneCount > initWinTwoCount) {
      gameResult.winner = initWinOne;
      return gameResult;
    } else if (initWinOneCount < initWinTwoCount) {
      gameResult.winner = initWinTwo;
      return gameResult;
    } else {
      gameResult.winner = "There is Draw";
      return gameResult;
    }
  }

  useEffect(() => {
    if (!markers.includes(null)) {
      const result = calculateWinner(markers);
      if (
        result.winner === inputValues.playerOne ||
        result.winner === inputValues.playerTwo
      ) {
        gameOver(result, "levelOne");
      } else if (result.winner === "There is Draw") {
        gameOver(result, "levelOne");
      }
    }
  }, [markers]);

  function generateRandomNumber() {
    var randomnumber = Math.floor(Math.random() * 8 + 1);
    if (markers[randomnumber] === null) {
      return randomnumber;
    } else {
      return generateRandomNumber();
    }
  }

  useEffect(() => {
    if (markers.includes(null) && activePlayer === "Computer") {
      var randomnumber = generateRandomNumber();
      if (markers[randomnumber] === null) {
        markPositionHandler(randomnumber);
        <Grid
          icon={"heart"}
          color={
            markers[randomnumber] === inputValues.playerOne
              ? Colors.labelColor
              : markers[randomnumber] === "Computer"
              ? Colors.heartColor
              : "#a98ec9"
          }
        />;
      }
    }
  }, [markers, markPositionHandler, setActivePlayer, inputValues]);

  const grids = [];
  for (var i = 0; i < markers.length; i++) {
    grids.push(
      <View key={i}>
        <Grid
          icon={"heart"}
          color={
            markers[i] === inputValues.playerOne
              ? Colors.labelColor
              : markers[i] === inputValues.playerTwo
              ? Colors.heartColor
              : "#a98ec9"
          }
          borderRightWidth={
            i === 0 || i === 1 || i === 3 || i === 4 || i === 6 || i === 7
              ? 0
              : 6
          }
          borderBottomWidth={
            i === 0 || i === 1 || i === 2 || i === 3 || i === 4 || i === 5
              ? 0
              : 6
          }
          onPress={markPositionHandler.bind(this, i)}
          gridSize={3.25}
        />
      </View>
    );
  }

  return (
    <>
      <View
        style={[
          styles.playerInfo,
          {
            backgroundColor:
              activePlayer === inputValues.playerOne
                ? Colors.labelColor
                : Colors.heartColor,
          },
        ]}
      >
        <GradientText style={styles.gradientText}>
          Player {activePlayer}'s Turn
        </GradientText>
      </View>
      <View style={styles.gridConatiner}>{grids}</View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <View style={styles.buttonOuterContainer}>
          <Pressable
            android_ripple={{ color: Colors.rippleColor }}
            style={[
              styles.buttonInnerContainer,
              ({ pressed }) => {
                pressed ? styles.buttonPressed : null;
              },
            ]}
            onPress={resetHandler}
          >
            <Ionicons
              name={"reload-outline"}
              size={30}
              color={Colors.labelColor}
            />
            <Text style={styles.text}>Reply</Text>
          </Pressable>
        </View>
        <View style={styles.buttonOuterContainer}>
          <Pressable
            android_ripple={{ color: Colors.rippleColor }}
            onPress={nextLevelUserHandler}
            style={[
              styles.buttonInnerContainer,
              ({ pressed }) => {
                pressed ? styles.buttonPressed : null;
              },
            ]}
          >
            <Ionicons
              name={"arrow-forward-circle-outline"}
              size={30}
              color={Colors.labelColor}
            />
            <Text style={styles.text}>Next</Text>
          </Pressable>
        </View>
      </View>
      <Pressable style={styles.iconContainer} onPress={homeScreenHandler}>
        <Ionicons name={"exit-outline"} size={60} color={Colors.cardColor} />
      </Pressable>
    </>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  playerInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    paddingVertical: 20,
    marginTop: 40,
  },
  gridConatiner: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 60,
  },
  buttonOuterContainer: {
    marginTop: 8,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 24,
    backgroundColor: Colors.cardColor,
    borderWidth: 4,
    borderColor: Colors.labelColor,
  },
  buttonInnerContainer: {
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 24,
    color: Colors.labelColor,
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.5,
  },
  gradientText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    fontStyle: "italic",
    marginHorizontal: 24,
    padding: 8,
  },
});
