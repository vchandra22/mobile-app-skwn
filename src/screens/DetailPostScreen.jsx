import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import axiosInstance from '../services/axiosInstance';
import { Ionicons, } from "react-native-vector-icons";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";

const DetailPostScreen = ({ route }) => {
    const { postId } = route.params;
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                const [postResponse, commentsResponse] = await Promise.all([
                    axiosInstance.get(`/posts/${postId}`),
                    axiosInstance.get(`/posts/${postId}/comments`)
                ]);
                setPost(postResponse.data);
                setComments(commentsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPostAndComments();
    }, [postId]);

    if (loading) {
        return <ActivityIndicator size="large" color="#1DA1F2" style={styles.loader} />;
    }

    if (!post) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Post not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.border}>
                <View style={styles.titlePost}>
                    <Text style={styles.title}>{post.title}</Text>
                    <TouchableOpacity>
                        <Entypo size={16} name="dots-three-vertical" style={styles.icon} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.body}>{post.body}</Text>
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
            </View>
            <Text style={styles.commentsTitle}>Comments</Text>
            {comments.length === 0 ? (
                <Text style={styles.noComments}>No comments available</Text>
            ) : (
                <FlatList
                    data={comments}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.commentContainer}>
                            <Text style={styles.commentAuthor}>{item.name}</Text>
                            <Text style={styles.commentBody}>{item.body}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdfdfd',
    },
    titlePost: {
        flexDirection: 'row',
        alignItems: 'start',
        justifyContent: 'space-between',
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
        marginTop: 20,
        alignItems: 'center',
    },
    border: {
        borderStyle: 'solid',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        padding: 20
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    body: {
        fontSize: 16,
        color: '#555',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
    commentsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 12,
        marginLeft: 0,
        paddingHorizontal: 20
    },
    noComments: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginTop: 10,
        paddingHorizontal: 20
    },
    commentContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderStyle: 'solid',
        borderColor: '#e8e8e8',
        borderBottomWidth: 1,
        
    },
    commentAuthor: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    commentBody: {
        fontSize: 14,
        color: '#333',
        marginTop: 2,
    },
});

export default DetailPostScreen;
