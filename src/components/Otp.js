import React, { useState } from 'react';
import { TextInput, Button, StyleSheet , View } from 'react-native';
import qr from './qr';

const Otp = (props) => {
  const [code, setCode] = useState('');

  async function confirmCode(confirm) {
    try {
      await confirm.confirm(code);
      console.log('code verifed.');
      <qr/>
    } catch (error) {
      console.log('Invalid code.');
      <qr/>
    }
  }

  return (
    <View style={styles.innerContainer}>
      <TextInput
        style={styles.input}
        value={code}
        onChangeText={(text) => setCode(text)}
        placeholder="Enter OTP"
      />
      <Button title="Confirm Code" onPress={() => confirmCode(props.confirm)} />
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
  },
});

export default Otp;
