import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, RefreshControl, StyleSheet } from 'react-native';

import HeaderBar from '../components/HeaderBar';

import { useTheme } from '@react-navigation/native';
import { useStateValue } from '../StateProvider';
import AlbumHomeView from '../components/AlbumHomeView';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function HomeScreen({ navigation }) {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    const [state, dispatch] = useStateValue();

    const [refreshing, setRefreshing] = useState(true);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        dispatch({
            type: 'reloadState',
            payload: !state.reload
        });
        wait(1000).then(() => setRefreshing(false));
    }, []);

    useEffect(async () => {
        setRefreshing(false);
    }, []);

    const renderItems = ({ item }) => {
        return (
            <AlbumHomeView
                albumId={item}
                nav={navigation} />
        )
    };

    if (refreshing) {
        return (
            <View style={styles.screen}>
                <HeaderBar title="Home"
                />
            </View >
        );
    }
    return (
        <View style={styles.screen}>
            <HeaderBar title="Home"
            />
            <FlatList
                data={state.userFollowedAlbums}
                renderItem={renderItems}
                keyExtractor={item => item}
                refreshControl={
                    < RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </View >
    );
}

const createStyle = (colors) => StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 40,
        alignContent: 'center',
        backgroundColor: colors.background,
    },
});

export default HomeScreen;