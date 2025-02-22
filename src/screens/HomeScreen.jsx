import React, { useEffect, useState } from 'react';
import { Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../services/axiosInstance';
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "react-native-vector-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const HomeScreen = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        axiosInstance.get('/posts')
            .then(response => {
                const updatedPosts = response.data.map(post => ({
                    ...post,
                    bookmarked: false,
                    liked: post.liked ?? false,
                    likesCount: post.likesCount ?? 0, // Pastikan default 0
                }));
                setPosts(updatedPosts);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleLike = (postId) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === postId
                    ? {
                        ...post,
                        liked: !post.liked,
                        likesCount: (post.likesCount ?? 0) + (post.liked ? -1 : 1) // Pastikan likesCount valid
                    }
                    : post
            )
        );
    };

    const handleRepost = (postId) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === postId
                    ? {
                        ...post,
                        reposted: !post.reposted,
                        repostedCount: (post.repostedCount ?? 0) + (post.reposted ? -1 : 1)
                    }
                    : post
            )
        );
    };

    const handleBookmarked = (postId) => {
        setPosts(prevPosts => prevPosts.map(post =>
            post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post
        ));
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.postContainer}
            onPress={() => navigation.navigate('DetailPost', { postId: item.id })}
        >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
            <View style={styles.containerIcon}>
                <TouchableOpacity style={styles.iconPost} onPress={() => handleLike(item.id)}>
                    <Ionicons
                        size={24}
                        name={item.liked ? "heart" : "heart-outline"}
                        style={[styles.icon, item.liked && { color: 'red' }]}
                    />
                    <Text style={styles.body}>{item.likesCount ?? 0} likes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconPost} onPress={() => handleRepost(item.id)}>
                    <AntDesign 
                        size={24} 
                        name={item.reposted ? "sharealt" : "sharealt"} 
                        style={[styles.icon, item.reposted && { color: 'green' }]}
                    />
                    <Text style={styles.body}>{item.repostedCount ?? 0} repost</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconPost} onPress={() => handleBookmarked(item.id)}>
                    <FontAwesome
                        size={24}
                        name={item.bookmarked ? "bookmark" : "bookmark-o"}
                        style={[styles.icon, item.bookmarked && { color: 'orange' }]}
                    />
                    <Text style={styles.body}>Bookmark</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Home</Text>
            </View>
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
    header: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fcfcfc',
    },
    headerText: {
        color: '#243048',
        fontSize: 20,
        fontWeight: 'bold'
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
    icon: {
        color: '#333',
    }
});

export default HomeScreen;
