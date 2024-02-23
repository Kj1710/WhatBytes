import React, { useState } from 'react';
import { TextInput, Button, StyleSheet, View } from 'react-native';
import Scan from './Scan';

const Otp = (props) => {
  const [code, setCode] = useState('');
  const [verified, setVerified] = useState(false);

  async function confirmCode(confirm) {
    try {
      await confirm.confirm(code);
      console.log('code verified.');
      setVerified(true); 
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  return (
    <View style={styles.innerContainer}>
      {verified ? ( 
        <Scan />
      ) : (
        <>
          <TextInput
            style={styles.input}
            value={code}
            onChangeText={(text) => setCode(text)}
            placeholder="Enter OTP"
            placeholderTextColor="black"
          />
          <Button
            title="Confirm Code"
            onPress={() => confirmCode(props.confirm)}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    width: '80%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color:"black"
  },
});

export default Otp;
