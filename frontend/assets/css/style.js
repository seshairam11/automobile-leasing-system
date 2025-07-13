import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    header: {
        height: 70,
        backgroundColor: "#01050D",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-end",
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: "#49732C"
    },
    headerImage: {
        width: 140,
        height: 55,
        resizeMode: 'contain'
    },
    headerImageContainer: {
        marginLeft: 50
    },

    headerRight: {
        display: "flex",
        flexDirection: "row",
        marginLeft: "auto"
    },
    headerLeft: {
        marginRight: "auto"
    },
    iconContainer: {
        height: 50,
        width: 50,
        justifyContent: 'center',  // Align icon vertically
        alignItems: 'center',  // Align icon horizontally
        backgroundColor: 'transparent',
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 5,
        display: "flex",
        flexDirection: "row"
    },
    iconContainerRight: {
        height: 35,
        width: 65,
        justifyContent: 'center',  // Align icon vertically
        alignItems: 'center',  // Align icon horizontally
        backgroundColor: '#49732C',
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 5,
        marginTop: 4,
        marginRight: 10,
        borderRadius:30,
        display: "flex",
        flexDirection: "row"
    },
    profileImg: {
        width: 50,
        height:50,
        resizeMode: 'contain',
        borderRadius: 50 / 2,
    },
    backDrop: {
        position: "absolute",
        flex: 1,
        top: 0,
        left: 0,
        zIndex: 2000,
        backgroundColor: "#00000080"
    },
    canvasSearch: {
        maxWidth: 320,
    },
    p30: {
        padding: 30,
    },
    mb15: {
        marginBottom: 15,
    },
    me15: {
        marginRight: 15
    },
    mb30: {
        marginBottom: 30,
    },
    pb30: {
        paddingBottom: 30,
    },
    btnPrimary: {
        backgroundColor: "#e4e3f9"
    },
})