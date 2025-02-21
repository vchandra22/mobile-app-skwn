import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Svg, Path } from 'react-native-svg';

const Tab = createBottomTabNavigator();

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
                            {route.name === 'Settings' && (
                                <Path
                                    d="M19.43 12.98c.04-.32.07-.65.07-.98s-.03-.66-.07-.98l2.11-1.65a.5.5 0 00.12-.63l-2-3.46a.5.5 0 00-.58-.22l-2.49 1a6.96 6.96 0 00-1.6-.93l-.38-2.65A.5.5 0 0014 3h-4a.5.5 0 00-.5.44l-.38 2.65c-.55.24-1.07.54-1.6.93l-2.49-1a.5.5 0 00-.58.22l-2 3.46a.5.5 0 00.12.63l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65a.5.5 0 00-.12.63l2 3.46c.14.25.45.35.71.22l2.49-1c.49.39 1.05.7 1.6.93l.38 2.65a.5.5 0 00.5.44h4a.5.5 0 00.5-.44l.38-2.65c.55-.24 1.07-.54 1.6-.93l2.49 1a.5.5 0 00.71-.22l2-3.46a.5.5 0 00-.12-.63l-2.11-1.65zM12 15a3 3 0 110-6 3 3 0 010 6z"
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
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
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
