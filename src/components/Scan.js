import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, Linking} from 'react-native';
import {
  useCameraPermission,
  useCameraDevice,
  Camera,
} from 'react-native-vision-camera';

const Scan = () => {
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const handleCameraPermission = async () => {
      if (!hasPermission) {
        const status = await requestPermission();

        if (status !== 'granted') {
          // Permission denied
          Linking.openSettings(); 
          alert(
            'Camera permission is required to scan QR codes. Please grant permission in app settings.',
          );
        }
      }
      console.log('Next Page');
    };

    handleCameraPermission();
  }, []);

  const handleBarcodesDetected = ({barcodes}) => {
    if (barcodes.length && !scanned) {
      setScanned(true);
      setData(barcodes[0].data); 
    }
  };

  const handlePressOpenLink = () => {
    if (data) {
      Linking.openURL(data); 
    } else {
      alert('No QR code was scanned.');
    }
  };

  return (
    <View style={styles.container}>
  {hasPermission ? (
    <View style={styles.cameraView}>
      {scanned ? (
        <View>
          <Button title="Open Link" onPress={handlePressOpenLink} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
          />
          <Button
            title="Click to Scan QR Code"
            onPress={() => {
             
              setScanned(true); // Assuming this function updates 'scanned' state
            }}
          />
        </View>
      )}
    </View>
  ) : (
    <View style={styles.permissionView}>
      <Text>Camera permission is required to scan QR codes.</Text>
      <Button title="Request Permission" onPress={requestPermission} />
    </View>
  )}
</View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraView: {
    
  },
  permissionView: {
    alignItems: 'center',
  },
});

export default Scan;
