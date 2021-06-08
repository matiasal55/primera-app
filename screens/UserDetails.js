import React, { useEffect, useState } from 'react';
import { View, ScrollView, TextInput, Button, ActivityIndicator, Alert } from 'react-native';
import firebase from '../database/firebase';
import { formStyle } from '../styles/generalStyles';

const UserDetails = (props) => {
    const { id } = props.route.params;
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const getUserById = async (id) => {
        const dbRef = firebase.db.collection('users').doc(id);
        const doc = await dbRef.get();
        const user = doc.data();
        setUser(user);
        setLoading(false);
    };

    useEffect(() => {
        getUserById(id);
    }, []);

    const handleChangeText = (name, value) => {
        setUser({ ...user, [name]: value });
    };

    const updateUser = async () => {
        const dbRef = firebase.db.collection('users').doc(id);
        await dbRef.set(user);
        props.navigation.navigate('UserList');
    };

    const deleteUser = async () => {
        const dbRef = firebase.db.collection('users').doc(id);
        await dbRef.delete();
        props.navigation.navigate('UserList');
    };

    const confirmationAlert = () => {
        Alert.alert('Remove User', 'Are you sure?', [
            { text: 'Yes', onPress: () => deleteUser() },
            { text: 'No', onPress: () => console.log('Cancelado') },
        ]);
    };

    if (loading) {
        return (
            <View>
                <ActivityIndicator size='large' color='#9e9e9e' />
            </View>
        );
    }

    return (
        <ScrollView style={formStyle.container}>
            <View style={formStyle.inputGroup}>
                <TextInput placeholder='Name User' value={user.name} onChangeText={(value) => handleChangeText('name', value)} />
            </View>
            <View style={formStyle.inputGroup}>
                <TextInput placeholder='Email User' value={user.email} onChangeText={(value) => handleChangeText('email', value)} />
            </View>
            <View style={formStyle.inputGroup}>
                <TextInput placeholder='Phone User' value={user.phone} onChangeText={(value) => handleChangeText('phone', value)} />
            </View>
            <View>
                <Button title='Update User' onPress={updateUser} />
                <Button title='Delete User' color='red' onPress={confirmationAlert} />
            </View>
        </ScrollView>
    );
};

export default UserDetails;
