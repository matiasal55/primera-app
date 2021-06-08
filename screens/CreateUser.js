import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, TextInput, Button } from 'react-native';
import { formStyle } from '../styles/generalStyles';
import firebase from '../database/firebase';

const CreateUser = (props) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const handleChangeText = (name, value) => {
        setUser({ ...user, [name]: value });
    };

    const saveNewUser = async () => {
        if (user.name === '') alert('Please provide a name');
        else {
            await firebase.db
                .collection('users')
                .add(user)
                .then((res) => props.navigation.navigate('UserList'))
                .catch((err) => alert('Hubo un error'));
        }
    };

    return (
        <ScrollView style={formStyle.container}>
            <View style={formStyle.inputGroup}>
                <TextInput placeholder='Name User' onChangeText={(value) => handleChangeText('name', value)} />
            </View>
            <View style={formStyle.inputGroup}>
                <TextInput placeholder='Email User' onChangeText={(value) => handleChangeText('email', value)} />
            </View>
            <View style={formStyle.inputGroup}>
                <TextInput placeholder='Phone User' onChangeText={(value) => handleChangeText('phone', value)} />
            </View>
            <View>
                <Button title='Save User' onPress={saveNewUser} />
            </View>
        </ScrollView>
    );
};

export default CreateUser;
