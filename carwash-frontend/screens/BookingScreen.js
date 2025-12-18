// screens/BookingScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView,
    Platform,
    ActivityIndicator
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createBooking } from '../api/api';

const BookingScreen = ({ route, navigation }) => {
    const { selectedService } = route.params;

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [mode, setMode] = useState('date');

    const [customerName, setCustomerName] = useState('');
    const [plateNumber, setPlateNumber] = useState('');
    const [vehicleType, setVehicleType] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);

    /* =====================
       DATE / TIME HANDLING
    ====================== */
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setMode(currentMode);
        setShowPicker(true);
    };

    /* =====================
       SUBMIT BOOKING
    ====================== */
    const handleBooking = async () => {
        if (!customerName || !plateNumber || !vehicleType) {
            Alert.alert(
                'Missing Information',
                'Please fill in all required fields.'
            );
            return;
        }

        setIsSubmitting(true);

        const bookingPayload = {
            service: {
                id: selectedService.id,
            },
            vehicle: {
                plateNumber,
                type: vehicleType,
            },
            bookingTime: date.toISOString(),
        };

        try {
            const booking = await createBooking(bookingPayload);

            navigation.reset({
                index: 0,
                routes: [
                    {
                        name: 'Confirmation',
                        params: { bookingDetails: booking },
                    },
                ],
            });

        } catch (error) {
            console.error(error);
            Alert.alert(
                'Booking Failed',
                'Unable to create booking. Please try again.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Complete Your Booking</Text>

            {/* =====================
               SERVICE SUMMARY
            ====================== */}
            <View style={styles.summaryContainer}>
                <Text style={styles.label}>Service</Text>
                <Text style={styles.value}>{selectedService.name}</Text>

                <Text style={styles.label}>Price</Text>
                <Text style={styles.price}>
                    ${selectedService.price.toFixed(2)}
                </Text>
            </View>

            {/* =====================
               DATE & TIME
            ====================== */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Select Appointment</Text>

                <View style={styles.dateTimeRow}>
                    <Button title="Select Date" onPress={() => showMode('date')} />
                    <Button title="Select Time" onPress={() => showMode('time')} />
                </View>

                <Text style={styles.selectedDateText}>
                    {date.toLocaleDateString()} at{' '}
                    {date.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </Text>

                {showPicker && (
                    <DateTimePicker
                        value={date}
                        mode={mode}
                        is24Hour
                        display="default"
                        onChange={onChange}
                        minimumDate={new Date()}
                    />
                )}
            </View>

            {/* =====================
               CUSTOMER DETAILS
            ====================== */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Your Details</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Your Name"
                    value={customerName}
                    onChangeText={setCustomerName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Vehicle Plate Number (e.g. KBD123)"
                    value={plateNumber}
                    onChangeText={setPlateNumber}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Vehicle Type (e.g. SUV, Sedan)"
                    value={vehicleType}
                    onChangeText={setVehicleType}
                />
            </View>

            {/* =====================
               SUBMIT BUTTON
            ====================== */}
            <View style={styles.footer}>
                <Button
                    title={isSubmitting ? 'Processing...' : 'Confirm Booking'}
                    onPress={handleBooking}
                    disabled={isSubmitting}
                />
                {isSubmitting && (
                    <ActivityIndicator
                        size="small"
                        color="#007AFF"
                        style={{ marginTop: 10 }}
                    />
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    summaryContainer: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#eee',
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    value: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#28a745',
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    dateTimeRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    selectedDateText: {
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 10,
        color: '#007AFF',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 5,
        marginBottom: 15,
        fontSize: 16,
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
    },
});

export default BookingScreen;
