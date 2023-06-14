import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";
import Grid from "../components/ui/grid";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import GradientText from "../components/ui/GradientText";

function GameScreenNext({
  inputValues,
  homeScreenHandler,
  playGameHandler,
  gameOver,
  gameResult,
}) {
  const [activePlayerNext, setActivePlayerNext] = useState(
    inputValues.playerOne
  );

  const [markersNext, setMarkersNext] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
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

  function backButtonHandler() {
    playGameHandler(inputValues);
  }

  function markPositionHandlerNext(position) {
    if (!markersNext[position]) {
      let temp = [...markersNext];
      temp[position] = activePlayerNext;
      setMarkersNext(temp);
      if (activePlayerNext === inputValues.playerOne) {
        setActivePlayerNext(inputValues.playerTwo);
      } else if (activePlayerNext === inputValues.playerTwo) {
        setActivePlayerNext(inputValues.playerOne);
      }
    }
  }

  function resetHandler() {
    setMarkersNext([
      null,
      null,
      null,
      null,
      null,
      null,
      null,
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
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
        [0, 5, 10, 15],
        [3, 6, 9, 12],
      ];
      for (let i = 0; i < linesBonus.length; i++) {
        const [a, b, c, d] = linesBonus[i];
        if (
          currentMarker[a] === initWinOne &&
          currentMarker[a] === currentMarker[b] &&
          currentMarker[a] === currentMarker[c] &&
          currentMarker[a] === currentMarker[d]
        ) {
          initWinOneCount = initWinOneCount + 5;
        } else if (
          currentMarker[a] === initWinTwo &&
          currentMarker[a] === currentMarker[b] &&
          currentMarker[a] === currentMarker[c] &&
          currentMarker[a] === currentMarker[d]
        ) {
          initWinTwoCount = initWinTwoCount + 5;
        }
      }
      const lines = [
        [0, 1],
        [0, 4],
        [1, 2],
        [1, 5],
        [2, 3],
        [2, 6],
        [3, 7],
        [4, 5],
        [4, 8],
        [5, 6],
        [5, 9],
        [6, 7],
        [6, 10],
        [7, 11],
        [8, 9],
        [8, 12],
        [9, 13],
        [9, 10],
        [10, 11],
        [10, 14],
        [11, 15],
        [12, 13],
        [13, 14],
        [14, 15],
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
    if (!markersNext.includes(null)) {
      const result = calculateWinner(markersNext);
      if (
        result.winner === inputValues.playerOne ||
        result.winner === inputValues.playerTwo
      ) {
        gameOver(result, "levelTwo");
      } else if (result.winner === "There is Draw") {
        gameOver(result, "levelTwo");
      }
    }
  }, [markersNext]);

  function generateRandomNumber() {
    var randomnumber = Math.floor(Math.random() * 15 + 1);
    if (markersNext[randomnumber] === null) {
      return randomnumber;
    } else {
      return generateRandomNumber();
    }
  }

  useEffect(() => {
    if (markersNext.includes(null) && activePlayerNext === "Computer") {
      var randomnumber = generateRandomNumber();
      if (markersNext[randomnumber] === null) {
        markPositionHandlerNext(randomnumber);
        <Grid
          icon={"heart"}
          color={
            markersNext[randomnumber] === inputValues.playerOne
              ? Colors.labelColor
              : markersNext[randomnumber] === "Computer"
              ? Colors.heartColor
              : "#a98ec9"
          }
        />;
      }
    }
  }, [markersNext, markPositionHandlerNext, setActivePlayerNext, inputValues]);

  const grids = [];
  for (var i = 0; i < markersNext.length; i++) {
    grids.push(
      <View key={i}>
        <Grid
          icon={"heart"}
          color={
            markersNext[i] === inputValues.playerOne
              ? Colors.labelColor
              : markersNext[i] === inputValues.playerTwo
              ? Colors.heartColor
              : "#a98ec9"
          }
          borderLeftWidth={
            i === 1 ||
            i === 2 ||
            i === 3 ||
            i === 5 ||
            i === 6 ||
            i === 7 ||
            i === 9 ||
            i === 10 ||
            i === 11 ||
            i === 13 ||
            i === 14 ||
            i === 15
              ? 0
              : 6
          }
          borderBottomWidth={
            i === 0 ||
            i === 1 ||
            i === 2 ||
            i === 3 ||
            i === 4 ||
            i === 5 ||
            i === 6 ||
            i === 7 ||
            i === 8 ||
            i === 9 ||
            i === 10 ||
            i === 11
              ? 0
              : 6
          }
          onPress={markPositionHandlerNext.bind(this, i)}
          gridSize={4.25}
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
              activePlayerNext === inputValues.playerOne
                ? Colors.labelColor
                : Colors.heartColor,
          },
        ]}
      >
        <GradientText style={styles.gradientText}>
          Player {activePlayerNext}'s Turn
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
      </View>

      <Pressable style={styles.iconContainer} onPress={homeScreenHandler}>
        <Ionicons name={"exit-outline"} size={60} color={Colors.cardColor} />
      </Pressable>
    </>
  );
}

export default GameScreenNext;

const styles = StyleSheet.create({
  playerInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    paddingVertical: 20,
    marginTop: 40,
  },
  playerText: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 1.2,
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
  buttonPressed: {
    opacity: 0.5,
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
  gradientText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    fontStyle: "italic",
    marginHorizontal: 24,
    padding: 8,
  },
});
