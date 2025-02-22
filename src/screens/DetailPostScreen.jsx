import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import axiosInstance from '../services/axiosInstance';
import { Ionicons, Feather, Entypo, AntDesign } from "react-native-vector-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const DetailPostScreen = ({ route }) => {
    const { postId } = route.params;
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [reposted, setReposted] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [repostCount, setRepostCount] = useState(0);

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

    const handleLike = () => {
        setLiked(!liked);
        setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    };
    
    const handleRepost = () => {
        setReposted(!reposted);
        setRepostCount(reposted ? repostCount -1 : repostCount + 1);
    }
    
    const handleBookmarked = () => {
        setBookmarked(!bookmarked);
    }

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
                    <TouchableOpacity style={styles.iconPost} onPress={handleLike}>
                        <Ionicons
                            size={24}
                            name={liked ? "heart" : "heart-outline"}
                            style={[styles.icon, liked && { color: 'red' }]}
                        />
                        <Text style={styles.body}>{likesCount} likes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconPost} onPress={handleRepost}>
                        <AntDesign 
                            size={24} 
                            name={reposted ? "sharealt" : "sharealt"}
                            style={[styles.icon, reposted && { color: 'green' }]}
                        />
                        <Text style={styles.body}>{repostCount} repost</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconPost} onPress={handleBookmarked}>
                        <FontAwesome 
                            size={24} 
                            name={bookmarked ? "bookmark" : "bookmark-o"}
                            style={[styles.icon, bookmarked && { color: 'orange' }]} 
                        />
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
        backgroundColor: '#fcfcfc',
        paddingBottom: 100
    },
    titlePost: {
        flexDirection: 'row',
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
        borderBottomWidth: 1,
        borderColor: '#e8e8e8',
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
