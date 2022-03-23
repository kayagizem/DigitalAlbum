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
    headerProfileTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        flex: 6,
    },
    headerTitle: {
        fontSize: 36,
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 6,
    },
    textContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 15,
    },
    linkText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#5AA2B1',
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
        flexDirection: 'row',
        paddingTop: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: '#073D48',
        height: 155,
    },
    profileLeftBlock: {
        flex: 5,
        paddingLeft: 5
    },
    profilePicture: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderColor: '#4D4D4D',
        borderWidth: 2,
    },
    profileName: {
        marginTop: 10,
        fontSize: 16,
        color: '#073D48',
        fontWeight: 'bold',
    },
    profileBioBlock: {
        flex: 8
    },
    profileId: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#073D48',
    },
    profileBio: {
        fontSize: 14,
        color: '#073D48',
    }
});