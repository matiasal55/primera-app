import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { styles } from '../styles/generalStyles';

const UserList = () => {
    return (
        <View style={styles.container}>
            <Text>User List</Text>
            <StatusBar style='auto' />
        </View>
    );
};

export default UserList;
