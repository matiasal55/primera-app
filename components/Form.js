import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { formStyle } from '../styles/generalStyles';

const Form = (props) => {
    const { getUser, values } = props;
    const [user, setUser] = useState(values || {});

    const handleChangeText = (name, value) => {
        setUser({ ...user, [name]: value });
        getUser(name, value);
    };

    return (
        <>
            <View style={formStyle.inputGroup}>
                <TextInput placeholder='Name User' value={user.name} onChangeText={(value) => handleChangeText('name', value)} />
            </View>
            <View style={formStyle.inputGroup}>
                <TextInput placeholder='Email User' value={user.email} onChangeText={(value) => handleChangeText('email', value)} />
            </View>
            <View style={formStyle.inputGroup}>
                <TextInput placeholder='Phone User' value={user.phone} onChangeText={(value) => handleChangeText('phone', value)} />
            </View>
        </>
    );
};

export default Form;
