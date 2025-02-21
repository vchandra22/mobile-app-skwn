import {Text, View, StyleSheet} from "react-native";

const SettingsScreen = () => (
    <View style={styles.container}>
        <Text style={styles.text}>Settings Screen</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    },
});

export default SettingsScreen;