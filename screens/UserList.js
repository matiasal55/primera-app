import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, Button } from 'react-native';
import { styles } from '../styles/generalStyles';
import firebase from '../database/firebase';
import { ListItem, Avatar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserList = (props) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        firebase.db.collection('users').onSnapshot((querySnapshot) => {
            const users = [];
            querySnapshot.docs.forEach((doc) => {
                const { name, email, phone } = doc.data();
                users.push({
                    id: doc.id,
                    name,
                    email,
                    phone,
                });
            });
            setUsers(users);
        });
    }, []);

    return (
        <ScrollView>
            <SafeAreaView>
                <Button title='Create User' onPress={() => props.navigation.navigate('CreateUser')} />
                {users.map((user) => {
                    return (
                        <ListItem key={user.id} onPress={() => props.navigation.navigate('UserDetails', { id: user.id })}>
                            <ListItem.Chevron />
                            <Avatar source={{ uri: 'https://picsum.photos/200' }} rounded />
                            <ListItem.Content>
                                <ListItem.Title>{user.name}</ListItem.Title>
                                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    );
                })}
            </SafeAreaView>
        </ScrollView>
    );
};

export default UserList;
