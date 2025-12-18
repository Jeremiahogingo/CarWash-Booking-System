// components/ServiceCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ServiceCard = ({ service, onSelect, isSelected }) => (
    <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => onSelect(service)}
        activeOpacity={0.7}
    >
        <View style={styles.headerRow}>
            <Text style={styles.name}>{service.name}</Text>
            <Text style={styles.price}>${service.price ? service.price.toFixed(2) : '0.00'}</Text>
        </View>

        <Text style={styles.description}>{service.description}</Text>

        {isSelected && (
            <View style={styles.selectedContainer}>
                <Text style={styles.selectedText}>✓ Selected</Text>
            </View>
        )}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 4,
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 3,
        borderWidth: 1,
        borderColor: '#eee',
    },
    selectedCard: {
        borderColor: '#007AFF',
        borderWidth: 2,
        backgroundColor: '#f0f8ff', // Light blue tint
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
    },
    price: {
        fontSize: 18,
        fontWeight: '700',
        color: '#28a745',
    },
    description: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    selectedContainer: {
        marginTop: 12,
        alignItems: 'flex-end',
    },
    selectedText: {
        color: '#007AFF',
        fontWeight: 'bold',
        fontSize: 14,
    }
});

export default ServiceCard;