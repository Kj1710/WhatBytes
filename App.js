import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Phone from './src/components/Phone';
import Scan from './src/components/Scan';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Scan/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
