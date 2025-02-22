import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DetailPostScreen from '../screens/DetailPostScreen';
import { Svg, Path } from 'react-native-svg';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeMain" component={HomeScreen} />
        <Stack.Screen name="DetailPost" component={DetailPostScreen} options={{ headerShown: true, title: 'Detail Post' }} />
    </Stack.Navigator>
);

const FloatingTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.tabBarContainer}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel ?? route.name;
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={onPress}
                        style={[styles.tabButton, isFocused && styles.activeTab]}
                    >
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            {route.name === 'Home' && (
                                <Path
                                    d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z"
                                    fill={isFocused ? '#243048' : '#95a5a6'}
                                />
                            )}
                            {route.name === 'Profile' && (
                                <Path
                                    d="M12 12c2.7 0 4.88-2.18 4.88-4.88S14.7 2.25 12 2.25 7.12 4.43 7.12 7.12 9.3 12 12 12zM3 21.75c0-3.32 2.68-6 6-6h6c3.32 0 6 2.68 6 6v1.5H3v-1.5z"
                                    fill={isFocused ? '#243048' : '#95a5a6'}
                                />
                            )}
                        </Svg>
                        <Text style={[styles.tabLabel, isFocused && styles.activeLabel]}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const BottomTabNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBar={(props) => <FloatingTabBar {...props} />}
                screenOptions={{ headerShown: false }}
            >
                <Tab.Screen name="Home" component={HomeStack} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
    tabBarContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
        borderRadius: 25,
        paddingVertical: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#e8e8e8',
    },
    tabButton: {
        alignItems: 'center',
        flex: 1,
        paddingVertical: 5,
        color: '#243048',
    },
    activeTab: {
        borderBottomWidth: 0,
    },
    tabLabel: {
        fontSize: 12,
        color: '#95a5a6',
    },
    activeLabel: {
        color: '#243048',
    },
});
