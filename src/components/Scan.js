import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useCameraDevice, useCameraPermission, useCodeScanner, Camera } from 'react-native-vision-camera';
import WebView from 'react-native-webview';

const Scan = () => {
    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraDevice('back');
    const [linkDetected, setLinkDetected] = useState(false);

    useEffect(() => {
        requestPermission();
    }, []);

    const navigateToURLInWebView = (url) => {
       
        return (
            <WebView
                source={{ uri: url }}
                style={{ flex: 1 }}
            />
        );
    };

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: codes => {
            if (!linkDetected) {
                const scannedLink = codes[0].value;
                Alert.alert(
                    'Scanned Link',
                    `Do you want to navigate to this link?\n${scannedLink}`,
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        {
                            text: 'OK', onPress: () => {
                                setLinkDetected(true);
                                navigateToURLInWebView(scannedLink);
                            }
                        },
                    ],
                    { cancelable: false },
                );
            }
        },
    });

    if (device == null) {
        return (
            <View>
                <Text>Device Not Found</Text>
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
