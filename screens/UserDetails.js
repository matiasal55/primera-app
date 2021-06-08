import React, { useEffect, useState } from 'react';
import { View, ScrollView, TextInput, Button, ActivityIndicator, Alert } from 'react-native';
import Form from '../components/Form';
import Spinner from '../components/Spinner';
import firebase from '../database/firebase';
import { formStyle } from '../styles/styles';

const UserDetails = (props) => {
    const { id } = props.route.params;
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const getDbRef = () => {
        const dbRef = firebase.db.collection('users').doc(id);
        return dbRef;
    };

    const getUserById = async () => {
        const dbRef = getDbRef();
        const doc = await dbRef.get();
        const user = doc.data();
        setUser(user);
        setLoading(false);
    };

    useEffect(() => {
        getUserById();
    }, []);

    const handleChangeText = (name, value) => {
        setUser({ ...user, [name]: value });
    };

    const updateUser = async () => {
        setLoading(true);
        const dbRef = getDbRef();
        await dbRef.set(user);
        props.navigation.navigate('UserList');
    };

    const deleteUser = async () => {
        setLoading(true);
        const dbRef = getDbRef();
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
        return <Spinner />;
    }

    return (
        <ScrollView style={formStyle.container} keyboardShouldPersistTaps={'handled'}>
            <Form values={user} getUser={handleChangeText} />
            <View>
                <Button title='Update User' onPress={updateUser} />
                <Button title='Delete User' color='red' onPress={confirmationAlert} />
            </View>
        </ScrollView>
    );
};

export default UserDetails;
