import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserList from './screens/UserList';
import CreateUser from './screens/CreateUser';
import UserDetails from './screens/UserDetails';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='UserList' component={UserList} />
                <Stack.Screen name='CreateUser' component={CreateUser} />
                <Stack.Screen name='UserDetails' component={UserDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
