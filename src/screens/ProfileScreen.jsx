import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {Avatar} from "react-native-paper";
import { ProfilePicture } from "../../assets/foto-profile.png";

const ProfileScreen = () => {
    const openLink = (url) => {
        Linking.openURL(url);
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Profile</Text>
                </View>
                <View style={styles.profileContainer}>
                    <Avatar.Image size={100} source={require('../../assets/foto-profile.png')} style={{ borderRadius: 50, overflow: 'hidden' }} />
                    <Text style={styles.name}>Vincent Chandra Trie Novan</Text>
                    <Text style={styles.location}>Malang, Indonesia</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Profile Details</Text>
                    <View style={styles.profileColumn}>
                        <Text style={styles.titleProfile}>About</Text>
                        <Text>Recent graduate from Universitas Brawijaya with a degree in Information Systems. Driven by a passion for innovation, I am dedicated to delivering cutting-edge digital solutions that enhance user experiences. Eager to contribute to a dynamic team and continuously learn in the tech industry. 🚀</Text>
                    </View>
                    <View style={styles.settingRow}>
                        <Text style={styles.titleProfile}>Place of Birth</Text>
                        <Text>Blitar, 3 November 2000</Text>
                    </View>
                    <View style={styles.settingRow}>
                        <Text style={styles.titleProfile}>Gender</Text>
                        <Text>Male</Text>
                    </View>
                    <View style={styles.settingRow}>
                        <Text style={styles.titleProfile}>Email</Text>
                        <Text>vincentchaandra@gmail.com</Text>
                    </View>
                    <View style={styles.settingRow}>
                        <Text style={styles.titleProfile}>Phone Number</Text>
                        <Text>081559643660</Text>
                    </View>
                    <View style={styles.profileColumn}>
                        <Text style={styles.titleProfile}>Address</Text>
                        <Text>Jl. Raya Candi V A No.392a, Karangbesuki, Kec. Sukun, Kota Malang, Jawa Timur 65149</Text>
                    </View>
                </View>
                <View style={styles.sectionSocialMedia}>
                    <Text style={styles.sectionTitle}>Social Media</Text>
                    <TouchableOpacity onPress={() => openLink('https://vincent-webspace.vercel.app/')}>
                        <Text style={styles.link}>My Own Website Portfolio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openLink('https://github.com/vchandra22')}>
                        <Text style={styles.link}>Github</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openLink('https://www.linkedin.com/in/vincent-chandra-trie-novan/')}>
                        <Text style={styles.link}>LinkedIn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openLink('https://instagram.com/vchandra.22')}>
                        <Text style={styles.link}>Instagram</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.footerText}>Terima Kasih</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor: '#fcfcfc'
    },
    header: { 
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fcfcfc',
        borderStyle: 'solid',
        borderColor: '#e8e8e8',
        borderBottomWidth: 0.5,
    },
    headerText: { 
        color: '#243048',
        fontSize: 20, 
        fontWeight: 'bold',
    },
    profileContainer: { 
        alignItems: 'center', 
        padding: 20,
        backgroundColor: '#fcfcfc',
        borderStyle: 'solid',
        borderColor: '#e8e8e8',
        borderBottomWidth: 0.5,
    },
    name: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginTop: 10 
    },
    location: { 
        color: 'gray' 
    },
    section: { 
        padding: 20, 
        backgroundColor: 'white', 
        marginVertical: 0,
        borderStyle: 'solid',
        borderColor: '#e8e8e8',
        borderBottomWidth: 0.5,
    },
    sectionSocialMedia: {
        padding: 20,
        backgroundColor: 'white',
        marginVertical: 0,
        borderStyle: 'solid',
        borderColor: '#e8e8e8',
        borderBottomWidth: 0.5,
    },
    titleProfile: {
        fontSize: 16,
        fontWeight: 'semibold',
    },
    sectionTitle: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        marginBottom: 10,
        color: '#243048'
    },
    profileColumn: {
        flexDirection: 'column',
        gap: 8,
        justifyContent: 'end',
        paddingVertical: 10
    },
    settingRow: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingVertical: 10 
    },
    link: { 
        color: '#6C47FF', 
        paddingVertical: 5 
    },
    footerText: {
        fontSize: 12,
        textAlign: 'center',
        color: '#c0c0c0',
        marginTop: 80,
        marginBottom: 150
    }
});

export default ProfileScreen;
