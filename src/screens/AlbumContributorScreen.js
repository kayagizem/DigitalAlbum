import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';

import HeaderBar from '../components/HeaderBar';

import { useTheme } from '@react-navigation/native';
import UserView from '../components/UserView';
import { getAllContributors } from '../backend/firebase';

function AlbumContributorScreen({ route, navigation }) {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);

    const [members, setMembers] = useState([]);

    const onRefresh = React.useCallback(() => {
        setLoading(!loading);
    }, []);

    useEffect(async () => {
        setRefreshing(true);
        let members = await getAllContributors(route.params.albumId);
        setMembers(members);
        setRefreshing(false);
    }, [loading]);


    const renderItem = ({ item }) => (
        <UserView style={{ marginVertical: 4 }} username={item.username} profilePictureURI={item.profilePictureURI} nav={navigation} />
    );

    return (
        <View style={styles.screen}>
            <HeaderBar title="Members"
                leftButtonText="Back"
                onPressLeft={() => navigation.goBack()}
            />

            <View style={styles.content}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={members}
                    renderItem={renderItem}
                    keyExtractor={item => item.username}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View >
        </View>
    );
}

const createStyle = (colors) => StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 40,
        alignContent: 'center',
        backgroundColor: colors.backgroundColor,
    },
    content: {
        paddingHorizontal: 20,
        marginTop: 15,
    },
});

export default AlbumContributorScreen;