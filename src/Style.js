import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 50,
        alignContent: 'center',
        backgroundColor: '#ffffff',
    },
    content: {
        paddingHorizontal: 20,
        marginTop: 15,
    },
    headerBar: {
        paddingHorizontal: 25,
        paddingVertical: 15,
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: '#073D48',
        height: 80
    },
    headerLeftBox: {
        alignItems: 'flex-start',
        marginTop: 10,
        flex: 2,
    },
    headerRightBox: {
        alignItems: 'flex-end',
        marginTop: 10,
        flex: 2,
    },
    headerText: {
        color: '#073D48',
        fontSize: 17,
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 36,
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 6,
    },
    linkText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#5AA2B1',
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
        borderColor: '#cfcfcf',
        backgroundColor: '#efefef',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 45,
        backgroundColor: '#5AA2B1',
        padding: 16,
        marginTop: 10,
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        letterSpacing: 0.25,

    },
    profileBlock: {
        flexDirection: 'column',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: '#073D48',
        maxHeight: 230
    },
    profilePicture: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderColor: '#4D4D4D',
        borderWidth: 2,
    },
    profileName: {
        fontSize: 16,
        color: '#073D48',
        fontWeight: 'bold',
        marginTop: 15,
    },
    profileId: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#073D48',
        textAlign: 'center',
        flex: 6,
    },
    profileBio: {
        fontSize: 14,
        color: '#073D48',
        marginTop: 5,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#073D48',
        padding: 10,
        paddingHorizontal: 20,
        margin: 2
    },
    profileButtonText: {
        fontSize: 14,
        color: '#ffffff',
    },
    profileButtonContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
    },
    albumView: {
        margin: 5,
    }
});