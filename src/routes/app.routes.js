import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../pages/SignIn';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='SignIn'
                component={SignIn}
                options={{
                    title: 'Faça o login'
                }}
            />
        </Stack.Navigator>
    );
}