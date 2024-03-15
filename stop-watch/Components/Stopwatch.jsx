import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const Stopwatch = () => {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const maxTime = 10000;

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const startStopwatch = () => setIsRunning(true);
  const pauseStopwatch = () => setIsRunning(false);
  const resetStopwatch = () => {
    if (count <= maxTime) {
      setIsRunning(false);
      setCount(0);
    } else {
      alert("Maximum time reached. Cannot reset.");
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor(time % 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}:${
      milliseconds < 100 ? "0" : ""
    }${milliseconds < 10 ? "0" : ""}${milliseconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(count)}</Text>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={startStopwatch}>
          <Text style={styles.buttonText}>Start</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={pauseStopwatch}>
          <Text style={styles.buttonText}>Pause</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={resetStopwatch}>
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>
      <Text style={styles.maxtime}>Max-Time: 10:00</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  timer: {
    color: "white",
    fontSize: 48,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  maxtime: {
    color: "white",
    fontSize: 20,
    marginTop: 15,
  },
});

export default Stopwatch;
