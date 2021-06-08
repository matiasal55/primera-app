import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { styles } from '../styles/generalStyles';

const Spinner = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color='#9e9e9e' />
        </View>
    );
};

export default Spinner;
