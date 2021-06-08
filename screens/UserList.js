import React, { useEffect, useState } from 'react';
import { Text, ScrollView, Button } from 'react-native';
import firebase from '../database/firebase';
import { ListItem, Avatar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spinner from '../components/Spinner';

const UserList = (props) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

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
            setLoading(false);
        });
    }, []);

    if (loading) return <Spinner />;

    return (
        <ScrollView>
            <SafeAreaView>
                <Button title='Create User' onPress={() => props.navigation.navigate('CreateUser')} />
                {users.length > 0 ? (
                    users.map((user) => {
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
                    })
                ) : (
                    <Text>No hay usuarios</Text>
                )}
            </SafeAreaView>
        </ScrollView>
    );
};

export default UserList;
