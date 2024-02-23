import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { useCameraDevice, useCameraPermission, useCodeScanner, Camera } from 'react-native-vision-camera';
import WebView from 'react-native-webview';

const Scan = () => {
    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraDevice('back');
    const [scannedLink, setScannedLink] = useState('');
    const [showCamera, setShowCamera] = useState(false);
    const [linkDetected, setLinkDetected] = useState(false);

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
                setScannedLink(scannedLink);
                handleNavigateToURLInWebView();
            }
        },
    });

    const handleScanQRCode = () => {
        setShowCamera(true);
    };

    if (device == null) {
        return (
            <View>
                <Text>Device Not Found</Text>
            </View>
        );
    }

    return (
        <View style={StyleSheet.absoluteFill}>
            {showCamera && (
                <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={true}
                    codeScanner={codeScanner}
                />
            )}
            {!showCamera && !linkDetected && (
                <TouchableOpacity style={styles.button} onPress={handleScanQRCode}>
                    <Text style={styles.buttonText}>Scan QR Code</Text>
                </TouchableOpacity>
            )}
            {linkDetected && (
                <WebView
                    source={{ uri: scannedLink }}
                    style={StyleSheet.absoluteFill}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default Scan;
