import React, { useState } from 'react';
import { View, StyleSheet, TextInput, FlatList } from 'react-native';

import { useTheme } from '@react-navigation/native';

import UserView from '../components/UserView';

import HeaderBar from '../components/HeaderBar';
import { searchAlbums, searchUsers } from '../backend/firebase';
import AlbumSearchView from '../components/AlbumSearchView';

function SearchScreen({ navigation }) {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    const [input, setInput] = useState("");
    const [searchData, setSearchData] = useState([]);

    const renderUsers = ({ item }) => (
        <UserView style={{ marginVertical: 4 }} username={item.username} profilePictureURI={item.profilePictureURI} nav={navigation} />
    );

    const renderAlbums = ({ item }) => (
        <AlbumSearchView style={{ marginVertical: 4 }} albumId={item.albumId} albumCoverURI={item.albumCoverURI} nav={navigation} albumType={item.albumType} />
    );

    return (
        <View style={styles.screen}>
            <HeaderBar
                title="Search"
            />

            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    placeholder='Search'
                    placeholderTextColor={colors.placeholder}
                    autoCapitalize="none"
                    onChangeText={async (input) => {
                        setInput(input);
                        let searchData = {}
                        if (input[0] == "@") {
                            searchData = await searchUsers(input.substring(1));
                        } else {
                            searchData = await searchAlbums(input);
                        }
                        setSearchData(searchData);
                    }}
                />

                {(input[0] == "@")
                    ? (
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={searchData}
                            renderItem={renderUsers}
                            keyExtractor={item => item.username}
                        />
                    ) : (
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={searchData}
                            renderItem={renderAlbums}
                            keyExtractor={item => item.albumId}
                        />
                    )}
            </View >
        </View>
    );
}

const createStyle = (colors) => StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 40,
        alignContent: 'center',
        backgroundColor: colors.background,
    },
    content: {
        paddingHorizontal: 20,
        marginTop: 15,
    },
    linkText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.link,
        marginTop: 10,
    },
    textContainer: {
        alignItems: 'center'
    },
    input: {
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
        paddingLeft: 15,
        borderRadius: 15,
        borderColor: colors.border,
        backgroundColor: colors.input,
        color: colors.text,
    },
});

export default SearchScreen;