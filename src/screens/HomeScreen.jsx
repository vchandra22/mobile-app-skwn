import React, { useEffect, useState } from 'react';
import {Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../services/axiosInstance';
import {SafeAreaView} from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

const HomeScreen = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        axiosInstance.get('/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.postContainer}
            onPress={() => navigation.navigate('DetailPost', { postId: item.id })}
        >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
            <View style={styles.containerIcon}>
                <TouchableOpacity style={styles.iconPost}>
                    <Ionicons size={24} name="heart-outline" style={styles.icon} />
                    <Text style={styles.body}>128 likes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconPost}>
                    <AntDesign size={24} name="sharealt" style={styles.icon} />
                    <Text style={styles.body}>28 repost</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconPost}>
                    <Feather size={24} name="bookmark" style={styles.icon} />
                    <Text style={styles.body}>Bookmark</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {loading ? <ActivityIndicator size="large" color="#1DA1F2" /> : (
                <FlatList
                    data={posts}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
    },
    containerIcon: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconPost: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 12,
        alignItems: 'center',
    },
    postContainer: {
        backgroundColor: '#fcfcfc',
        borderStyle: 'solid',
        borderColor: '#e8e8e8',
        borderWidth: 0.5,
        padding: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    body: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
});

export default HomeScreen;
