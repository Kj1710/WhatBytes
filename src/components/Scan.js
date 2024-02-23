import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useCameraDevice, useCameraPermission, useCodeScanner, Camera } from 'react-native-vision-camera';
import WebView from 'react-native-webview';

const Scan = () => {
    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraDevice('back');
    const [linkDetected, setLinkDetected] = useState(false);
    const [scannedLink, setScannedLink] = useState('');

    useEffect(() => {
        requestPermission();
    }, []);

    const handleNavigateToURLInWebView = () => {
        setLinkDetected(true);
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
                            text: 'No',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        {
                            text: 'Yes', onPress: () => {
                                console.log("Pressed Yes")
                                setScannedLink(scannedLink);
                                handleNavigateToURLInWebView();
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
        <View style={StyleSheet.absoluteFill}>
            <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                codeScanner={codeScanner}
            />
            {linkDetected && (
                <WebView
                    source={{ uri: scannedLink }}
                    style={StyleSheet.absoluteFill}
                />
            )}
        </View>
    );
};

export default Scan;

const styles = StyleSheet.create({});
