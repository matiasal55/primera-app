import React, { useState } from 'react';
import { View, ScrollView, TextInput, Button } from 'react-native';
import { formStyle } from '../styles/styles';
import firebase from '../database/firebase';
import Spinner from '../components/Spinner';
import Form from '../components/Form';

const CreateUser = (props) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChangeText = (name, value) => {
        setUser({ ...user, [name]: value });
    };

    const saveNewUser = async () => {
        if (user.name === '') alert('Please provide a name');
        else {
            setLoading(true);
            await firebase.db
                .collection('users')
                .add(user)
                .then((res) => props.navigation.navigate('UserList'))
                .catch((err) => alert('Hubo un error'));
        }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <ScrollView style={formStyle.container} keyboardShouldPersistTaps={'handled'}>
            <Form values={user} getUser={handleChangeText} />
            <View>
                <Button title='Save User' onPress={saveNewUser} />
            </View>
        </ScrollView>
    );
};

export default CreateUser;
