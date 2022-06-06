import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, FlatList, RefreshControl } from 'react-native';

import { useTheme } from '@react-navigation/native';

import HeaderBar from '../components/HeaderBar';
import { addComment, getAllComments } from '../backend/firebase';
import GeneralButton from '../components/GeneralButton';

import { useStateValue } from '../StateProvider';
import CommentView from '../components/CommentView';

function CommentScreen({ navigation, route }) {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    const [input, setInput] = useState("");
    const [comments, setComments] = useState([]);

    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);

    const [state, dispatch] = useStateValue();

    const onRefresh = React.useCallback(() => {
        setLoading(!loading);
    }, []);

    useEffect(async () => {
        let comments = await getAllComments(route.params.postId);
        comments = comments.sort((a, b) => b.dateCreated - a.dateCreated);
        setComments(comments);
    }, [loading]);

    const renderComments = ({ item }) => (
        <CommentView style={{ marginVertical: 4, marginHorizontal: 20 }} username={item.username} nav={navigation} comment={item.comment} />
    );

    return (
        <View style={styles.screen}>
            <HeaderBar
                title="Comments"
                isId
                leftButtonText="Back"
                onPressLeft={() => navigation.goBack()}
            />

            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    placeholder='Comment'
                    placeholderTextColor={colors.placeholder}
                    autoCapitalize="none"
                    onChangeText={async (input) => {
                        setInput(input);
                    }}
                />
                <GeneralButton
                    text="Comment"
                    style={{ width: '100%' }}
                    onPress={() => {
                        const data = {
                            postId: route.params.postId,
                            username: state.userData.username,
                            comment: input
                        }
                        addComment(data);
                        setLoading(!loading)
                    }}
                />
            </View >

            <FlatList
                style={{ marginBottom: 5 }}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                data={comments}
                renderItem={renderComments}
                keyExtractor={item => item.dateCreated}
                refreshControl={
                    < RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
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
        marginBottom: 10,
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

export default CommentScreen;