import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import Phone from './src/components/Phone';


const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Phone/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
