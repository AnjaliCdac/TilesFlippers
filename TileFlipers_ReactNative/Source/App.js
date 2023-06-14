import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, ImageBackground } from "react-native";
import GameScreen from "./screens/GameScreen";
import GameScreenNext from "./screens/GameScreenNext";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "./constants/Colors";
import StartGameScreen from "./screens/StartGameScreen";
import OptionScreen from "./screens/OptionScreen";
import GameOverScreen from "./screens/GameOverScreen";
import Instructionscreen from "./screens/InstructionScreen";

export default function App() {
  const [isShowStartScreen, setShowStartScreen] = useState(false);
  const [nextLevel, setNextLevel] = useState(false);
  const [initLevel, setInitialLevel] = useState(false);
  const [inputValues, setInputValues] = useState({
    playerOne: "",
    playerTwo: "",
  });
  const [isShowHomeScreen, setShowHomeScreen] = useState(false);
  const [gameMode, setGameMode] = useState("");
  const [isGameOverLevelOne, setIsGameOverLevelOne] = useState(false);
  const [isGameOverLevelTwo, setIsGameOverLevelTwo] = useState(false);
  const [gameResult, setGameResult] = useState({
    name1: "",
    score1: null,
    name2: "",
    score2: null,
    winner: "",
  });
  const [level, setLevel] = useState("");
  const [instruction, settInstruction] = useState(false);

  function nextLevelHandler(inputValues) {
    setInputValues(inputValues);
    setInitialLevel(false);
    setShowHomeScreen(false);
    setNextLevel(true);
  }

  function playGameHandler(inputValues) {
    setInputValues(inputValues);
    setShowHomeScreen(false);
    setShowStartScreen(false);
    setNextLevel(false);
    setInitialLevel(true);
  }

  function startScreenHandler(gameMode) {
    setShowHomeScreen(false);
    setGameMode(gameMode);
    setShowStartScreen(true);
  }

  function homeScreenHandler() {
    setShowStartScreen(false);
    setInitialLevel(false);
    setNextLevel(false);
    setIsGameOverLevelOne(false);
    setIsGameOverLevelTwo(false);
    settInstruction(false);
    setShowHomeScreen(true);
  }

  function gameOverLevelOneHandler(result, level) {
    setShowStartScreen(false);
    setInitialLevel(false);
    setNextLevel(false);
    setShowHomeScreen(false);
    setGameResult(result);
    setLevel(level);
    setIsGameOverLevelOne(true);
  }

  function gameOverLevelTwoHandler(result, level) {
    setShowStartScreen(false);
    setInitialLevel(false);
    setNextLevel(false);
    setShowHomeScreen(false);
    setIsGameOverLevelOne(false);
    setGameResult(result);
    setLevel(level);
    setIsGameOverLevelTwo(true);
  }

  function instructionHandler() {
    setShowStartScreen(false);
    setInitialLevel(false);
    setNextLevel(false);
    setShowHomeScreen(false);
    setIsGameOverLevelOne(false);
    setIsGameOverLevelTwo(false);
    settInstruction(true);
  }

  let screen = (
    <OptionScreen
      startScreenHandler={startScreenHandler}
      instructionHandler={instructionHandler}
    />
  );

  if (isShowStartScreen) {
    screen = (
      <StartGameScreen
        playGameHandler={playGameHandler}
        gameMode={gameMode}
        homeScreenHandler={homeScreenHandler}
      />
    );
  } else if (initLevel) {
    screen = (
      <GameScreen
        nextLevelHandler={nextLevelHandler}
        inputValues={inputValues}
        homeScreenHandler={homeScreenHandler}
        gameOver={gameOverLevelOneHandler}
        gameResult={gameResult}
      />
    );
  } else if (nextLevel) {
    screen = (
      <GameScreenNext
        inputValues={inputValues}
        homeScreenHandler={homeScreenHandler}
        playGameHandler={playGameHandler}
        gameOver={gameOverLevelTwoHandler}
        gameResult={gameResult}
      />
    );
  } else if (isShowHomeScreen) {
    screen = (
      <OptionScreen
        startScreenHandler={startScreenHandler}
        instructionHandler={instructionHandler}
      />
    );
  } else if (isGameOverLevelOne) {
    screen = (
      <GameOverScreen
        result={gameResult}
        inputValues={inputValues}
        playGameHandler={playGameHandler}
        homeScreenHandler={homeScreenHandler}
        level={level}
      />
    );
  } else if (isGameOverLevelTwo) {
    screen = (
      <GameOverScreen
        result={gameResult}
        inputValues={inputValues}
        playGameHandler={nextLevelHandler}
        homeScreenHandler={homeScreenHandler}
        level={level}
      />
    );
  } else if (instruction) {
    screen = <Instructionscreen homeScreenHandler={homeScreenHandler} />;
  }
  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        style={styles.rootContainer}
        colors={[Colors.cardColor, Colors.labelColor]}
      >
        <ImageBackground
          source={require("./assets/images/hearts.jpg")}
          resizeMode="cover"
          style={styles.rootContainer}
          imageStyle={styles.imageBackground}
        >
          <SafeAreaView style={styles.rootContainer}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  imageBackground: {
    opacity: 0.25,
  },
});
