import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { submitRating } from '../api/api';

const RatingScreen = ({ route, navigation }) => {
    const { bookingId } = route.params;
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    /* ======================
       STAR COMPONENT
    ====================== */
    const Star = ({ filled, onPress }) => (
        <TouchableOpacity onPress={onPress} disabled={isSubmitting}>
            <Text
                style={[
                    styles.star,
                    { color: filled ? '#FFD700' : '#ccc' },
                ]}
            >
                ★
            </Text>
        </TouchableOpacity>
    );

    /* ======================
       SUBMIT RATING
    ====================== */
    const handleRatingSubmit = async () => {
        if (rating === 0) {
            Alert.alert('Rating Required', 'Please select a star rating.');
            return;
        }

        setIsSubmitting(true);
        try {
            await submitRating(bookingId, rating);

            Alert.alert(
                'Thank You!',
                'Your feedback has been submitted successfully.',
                [
                    {
                        text: 'OK',
                        onPress: () =>
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'ServiceList' }],
                            }),
                    },
                ]
            );
        } catch (error) {
            console.error(error);
            Alert.alert(
                'Error',
                'Could not submit rating. Please try again.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Rate Your Experience</Text>
            <Text style={styles.subHeader}>
                Booking #{bookingId}
            </Text>

            <View style={styles.starContainer}>
                {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                        key={value}
                        filled={value <= rating}
                        onPress={() => setRating(value)}
                    />
                ))}
            </View>

            <Text style={styles.ratingText}>
                {rating > 0
                    ? `${rating} out of 5 Stars`
                    : 'Please select a rating'}
            </Text>

            {/* Optional comments (future-ready) */}
            <TextInput
                style={styles.input}
                placeholder="Optional feedback (not saved yet)"
                multiline
                numberOfLines={4}
                value={comments}
                onChangeText={setComments}
                editable={!isSubmitting}
            />

            {isSubmitting ? (
                <ActivityIndicator
                    size="small"
                    color="#007AFF"
                />
            ) : (
                <Button
                    title="Submit Rating"
                    onPress={handleRatingSubmit}
                    disabled={rating === 0}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subHeader: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    starContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    star: {
        fontSize: 50,
        marginHorizontal: 5,
    },
    ratingText: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 30,
        height: 25,
        color: '#333',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 15,
        minHeight: 100,
        textAlignVertical: 'top',
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
        fontSize: 16,
    },
});

export default RatingScreen;
