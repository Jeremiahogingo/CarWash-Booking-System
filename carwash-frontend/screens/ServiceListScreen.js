// screens/ServiceListScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Button,
    Alert,
    RefreshControl,
} from 'react-native';
import ServiceCard from '../components/ServiceCard';
import { fetchServices } from '../api/api';

const ServiceListScreen = ({ navigation }) => {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    /* ======================
       LOAD SERVICES
    ====================== */
    const loadServices = useCallback(async () => {
        try {
            setError(null);
            const data = await fetchServices();
            setServices(data);
        } catch (err) {
            console.error(err);
            setError('Failed to load car wash services. Please try again.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        loadServices();
    }, [loadServices]);

    /* ======================
       SERVICE SELECTION
    ====================== */
    const handleServiceSelect = (service) => {
        setSelectedService(
            service.id === selectedService?.id ? null : service
        );
    };

    /* ======================
       PROCEED TO BOOKING
    ====================== */
    const handleProceed = () => {
        if (!selectedService) {
            Alert.alert(
                'Selection Required',
                'Please select a car wash service to proceed.'
            );
            return;
        }

        navigation.navigate('Booking', {
            selectedService,
        });
    };

    /* ======================
       LOADING STATES
    ====================== */
    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={{ marginTop: 10 }}>
                    Loading services...
                </Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text style={styles.errorText}>{error}</Text>
                <Button title="Retry" onPress={loadServices} />
            </View>
        );
    }

    /* ======================
       MAIN UI
    ====================== */
    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                Available Car Wash Packages
            </Text>

            <FlatList
                data={services}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ServiceCard
                        service={item}
                        onSelect={handleServiceSelect}
                        isSelected={
                            item.id === selectedService?.id
                        }
                    />
                )}
                contentContainerStyle={{ paddingBottom: 120 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true);
                            loadServices();
                        }}
                    />
                }
            />

            <View style={styles.footer}>
                <Button
                    title={
                        selectedService
                            ? `Proceed with ${selectedService.name} – $${(
                                selectedService.price || 0
                            ).toFixed(2)}`
                            : 'Select a Service to Proceed'
                    }
                    onPress={handleProceed}
                    disabled={!selectedService}
                    color={
                        selectedService ? '#007AFF' : '#A9A9A9'
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 15,
        textAlign: 'center',
        color: '#333',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 15,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
});

export default ServiceListScreen;
