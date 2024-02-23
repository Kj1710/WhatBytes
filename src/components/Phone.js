import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Otp from './Otp';

const Phone = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirm, setConfirm] = useState(null);

  async function signInWithPhoneNumber() {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.log('Error:', error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {confirm ? (
          <Otp confirm={confirm} />
        ) : (
          <>
            <Text style={{fontSize: 26, marginBottom: 20}}>
              Phone Authentication
            </Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={text => setPhoneNumber(text)}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
            <Button
              title="Phone Number Sign In"
              onPress={() => signInWithPhoneNumber()}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  innerContainer: {
    width: '80%',
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default Phone;
