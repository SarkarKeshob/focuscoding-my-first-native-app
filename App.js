import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Focus from './src/features/focus/Focus';
import { colors } from './src/utils/colors';
import Timer from './src/features/timer/Timer';
import FocusHistory from './src/features/focus/FocusHistory';
import {AsyncStorage} from '@react-native-async-storage/async-storage';

// You can import supported modules from npm

// or any files within the Snack

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);
  const addFocusHistoryWithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, {key:(focusHistory.length+1), subject, status }]);
  };
  const onClearHistory = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory=async ()=>{
    try{
      await AsyncStorage.setItem('focusHistory',(JSON.stringify(focusHistory)))
    }
    catch(e){
      console.log(e)
    }
  }
  const loadFocusHistory=async()=>{
    try{
      const history=await AsyncStorage.getItem('focusHistory');
      if(history&& JSON.parse(history).length>0){
        setFocusHistory(JSON.parse(history));
      }
      else{
        setFocusHistory([]);
      }
    }
    catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    saveFocusHistory()
  },[focusHistory])

  useEffect(()=>{
    loadFocusHistory()
  },[])
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          setFocusSubject={setFocusSubject}
          handleFocusHistory={addFocusHistoryWithStatus}
        />
      ) : (
        <View style={styles.focusContainer}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory
            onClearHistory={onClearHistory}
            focusHistory={focusHistory}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  focusContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
