import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    ActivityIndicator,
    Alert
} from 'react-native';
import { confirmBooking } from '../api/api';

const ConfirmationScreen = ({ route, navigation }) => {
    const { bookingDetails } = route.params;
    const [booking, setBooking] = useState(bookingDetails);
    const [isConfirming, setIsConfirming] = useState(false);

    /* =====================
       CONFIRM BOOKING
    ====================== */
    const handleConfirm = async () => {
        setIsConfirming(true);
        try {
            const confirmed = await confirmBooking(booking.id);
            setBooking(confirmed);
        } catch (error) {
            console.error(error);
            Alert.alert(
                'Error',
                'Unable to confirm booking. Please try again.'
            );
        } finally {
            setIsConfirming(false);
        }
    };

    useEffect(() => {
        // Auto-confirm if backend supports it
        if (!booking.status || booking.status === 'PENDING') {
            handleConfirm();
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.successIcon}>✅</Text>
                <Text style={styles.title}>Booking Confirmed!</Text>

                <View style={styles.details}>
                    <Text style={styles.label}>Booking ID</Text>
                    <Text style={styles.value}>#{booking.id}</Text>

                    <Text style={styles.label}>Service</Text>
                    <Text style={styles.value}>{booking.service?.name}</Text>

                    <Text style={styles.label}>Vehicle</Text>
                    <Text style={styles.value}>
                        {booking.vehicle?.plateNumber} ({booking.vehicle?.type})
                    </Text>

                    <Text style={styles.label}>Date & Time</Text>
                    <Text style={styles.value}>
                        {new Date(booking.bookingTime).toLocaleString()}
                    </Text>

                    {booking.status && (
                        <>
                            <Text style={styles.label}>Status</Text>
                            <Text style={styles.value}>{booking.status}</Text>
                        </>
                    )}
                </View>

                {isConfirming && (
                    <ActivityIndicator
                        size="small"
                        color="#007AFF"
                        style={{ marginTop: 15 }}
                    />
                )}
            </View>

            <Text style={styles.infoText}>
                Your booking has been successfully created.
            </Text>

            <View style={styles.buttonContainer}>
                <Button
                    title="Finish Service & Rate"
                    onPress={() =>
                        navigation.navigate('Rating', {
                            bookingId: booking.id,
                        })
                    }
                    color="#007AFF"
                />

                <View style={{ marginTop: 10 }}>
                    <Button
                        title="Back to Services"
                        onPress={() =>
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'ServiceList' }],
                            })
                        }
                        color="#666"
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    successIcon: {
        fontSize: 50,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    details: {
        width: '100%',
        alignItems: 'flex-start',
    },
    label: {
        fontSize: 14,
        color: '#888',
        marginTop: 10,
    },
    value: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    infoText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
        marginBottom: 30,
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
});

export default ConfirmationScreen;
