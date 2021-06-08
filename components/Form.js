import React from 'react';
import { View, TextInput } from 'react-native';
import { formStyle } from '../styles/styles';

const Form = (props) => {
    const { getUser, values } = props;

    const handleChangeText = (name, value) => {
        getUser(name, value);
    };

    return (
        <>
            <View style={formStyle.inputGroup}>
                <TextInput placeholder='Name User' value={values.name} onChangeText={(value) => handleChangeText('name', value)} />
            </View>
            <View style={formStyle.inputGroup}>
                <TextInput placeholder='Email User' value={values.email} onChangeText={(value) => handleChangeText('email', value)} />
            </View>
            <View style={formStyle.inputGroup}>
                <TextInput placeholder='Phone User' value={values.phone} onChangeText={(value) => handleChangeText('phone', value)} />
            </View>
        </>
    );
};

export default Form;
