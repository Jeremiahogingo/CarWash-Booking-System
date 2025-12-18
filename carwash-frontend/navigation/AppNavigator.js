// navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Screens
import ServiceListScreen from '../screens/ServiceListScreen';
import BookingScreen from '../screens/BookingScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import RatingScreen from '../screens/RatingScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="ServiceList"
                screenOptions={{
                    headerStyle: { backgroundColor: '#007AFF' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            >
                <Stack.Screen
                    name="ServiceList"
                    component={ServiceListScreen}
                    options={{ title: 'Car Wash Services' }}
                />
                <Stack.Screen
                    name="Booking"
                    component={BookingScreen}
                    options={{ title: 'Book Appointment' }}
                />
                <Stack.Screen
                    name="Confirmation"
                    component={ConfirmationScreen}
                    options={{ title: 'Booking Confirmed', headerLeft: () => null }} // Hide back button
                />
                <Stack.Screen
                    name="Rating"
                    component={RatingScreen}
                    options={{ title: 'Rate Service', headerLeft: () => null }} // Hide back button
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;