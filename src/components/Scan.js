import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useCameraDevice, useCameraPermission , useCodeScanner ,Camera}  from 'react-native-vision-camera';

const Scan = () => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  useEffect(() => {
    requestPermission();
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes[0].value} codes!`);
    },
  });
  if (device == null) {
    return (
      <View>
        <Text>Device NOt Found</Text>
      </View>
    );
  }
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      codeScanner={codeScanner}
    />
  );
};

export default Scan;

const styles = StyleSheet.create({});
