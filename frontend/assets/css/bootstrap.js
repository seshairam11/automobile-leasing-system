import { Dimensions, StyleSheet } from 'react-native';
const screenSize = Dimensions.get('window');

export const bootstrap = StyleSheet.create({

    container: { paddingHorizontal: 16 },
    row: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -8 },
    col1: { flexBasis: '8.33%', maxWidth: '8.33%' },
    col2: { flexBasis: '16.66%', maxWidth: '16.66%' },
    col3: { flexBasis: '25%', maxWidth: '25%' },
    col4: { flexBasis: '33.33%', maxWidth: '33.33%' },
    col5: { flexBasis: '41.66%', maxWidth: '41.66%' },
    col6: { flexBasis: '50%', maxWidth: '50%' },
    col7: { flexBasis: '58.33%', maxWidth: '58.33%' },
    col8: { flexBasis: '66.66%', maxWidth: '66.66%' },
    col9: { flexBasis: '75%', maxWidth: '75%' },
    col10: { flexBasis: '83.33%', maxWidth: '83.33%' },
    col11: { flexBasis: '91.66%', maxWidth: '91.66%' },
    col12: { flexBasis: '100%', maxWidth: '100%' },

    /* ✅ Flexbox */
    flex1: { flex: 1 },
    dNone: { display: 'none' },
    dFlex: { display: 'flex' },
    flexRow: { flexDirection: 'row' },
    flexColumn: { flexDirection: 'column' },
    justifyContentStart: { justifyContent: 'flex-start' },
    justifyContentEnd: { justifyContent: 'flex-end' },
    justifyContentCenter: { justifyContent: 'center' },
    justifyContentBetween: { justifyContent: 'space-between' },
    justifyContentAround: { justifyContent: 'space-around' },
    alignItemsStart: { alignItems: 'flex-start' },
    alignItemsEnd: { alignItems: 'flex-end' },
    alignItemsCenter: { alignItems: 'center' },

    /* ✅ Spacing (Padding & Margin) */
    p0: { padding: 0 },
    p1: { padding: 4 },
    p2: { padding: 8 },
    p3: { padding: 16 },
    p4: { padding: 24 },
    p5: { padding: 32 },
    m0: { margin: 0 },
    m1: { margin: 4 },
    m2: { margin: 8 },
    m3: { margin: 16 },
    m4: { margin: 24 },
    m5: { margin: 32 },
    mt1: { marginTop: 8 },
    mb1: { marginBottom: 8 },
    mvAuto: { marginVertical: "auto" },
    mhAuto: { marginHorizontal: "auto" },

    /* ✅ Background Colors */
    bgPrimary: { backgroundColor: '#007bff' },
    bgSecondary: { backgroundColor: '#6c757d' },
    bgSuccess: { backgroundColor: '#28a745' },
    bgDanger: { backgroundColor: '#dc3545' },
    bgWarning: { backgroundColor: '#ffc107' },
    bgInfo: { backgroundColor: '#17a2b8' },
    bgLight: { backgroundColor: '#f8f9fa' },
    bgDark: { backgroundColor: '#343a40' },
    bgWhite: { backgroundColor: '#ffffff' },
    bgBlack: { backgroundColor: '#000000' },

    bgPrimaryLight: {
        backgroundColor: "#cfe2ff", // Bootstrap bg-primary-light equivalent
    },
    bgSuccessLight: {
        backgroundColor: "#d1e7dd", // Bootstrap bg-success-light
    },
    bgDangerLight: {
        backgroundColor: "#f8d7da", // Bootstrap bg-danger-light
    },
    bgWarningLight: {
        backgroundColor: "#fff3cd", // Bootstrap bg-warning-light
    },
    bgInfoLight: {
        backgroundColor: "#cff4fc", // Bootstrap bg-info-light
    },

    /* ✅ Text */
    textWhite: { color: '#ffffff' },
    textBlack: { color: '#000000' },
    textPrimary: { color: '#007bff' },
    textSecondary: { color: '#6c757d' },
    textSuccess: { color: '#28a745' },
    textDanger: { color: '#dc3545' },
    textWarning: { color: '#ffc107' },
    textInfo: { color: '#17a2b8' },
    textLight: { color: '#f8f9fa' },
    textDark: { color: '#343a40' },
    textFade: { color: "#7e8299" },

    /* ✅ Borders */
    border: { borderWidth: 1, borderColor: '#dee2e6' },
    border0: { borderWidth: 0 },
    borderTop: { borderTopWidth: 1, borderColor: '#dee2e6' },
    borderBottom: { borderBottomWidth: 1, borderColor: '#dee2e6' },
    borderLeft: { borderLeftWidth: 1, borderColor: '#dee2e6' },
    borderRight: { borderRightWidth: 1, borderColor: '#dee2e6' },
    rounded: { borderRadius: 4 },
    roundedLg: { borderRadius: 8 },
    roundedXl: { borderRadius: 16 },
    borderDanger: { borderColor: "#dc3545" },
    borderSuccess: { borderColor: "#28a745" },


    /* ✅ Shadows */
    shadowSm: { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
    shadowMd: { shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 },
    shadowLg: { shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 },

    /* ✅ Opacity */
    opacity0: { opacity: 0 },
    opacity25: { opacity: 0.25 },
    opacity50: { opacity: 0.5 },
    opacity75: { opacity: 0.75 },
    opacity100: { opacity: 1 },

    /* ✅ Visibility */
    dNone: { display: 'none' },
    dFlex: { display: 'flex' },

    // Responsive Widths
    w100: { width: '100%' },
    w75: { width: '75%' },
    w50: { width: '50%' },
    w25: { width: '25%' },

    // Animation (Fade-in & Scale)
    fadeIn: { opacity: 0 }, // Use Animated API to change opacity
    scaleUp: { transform: [{ scale: 0.9 }] },


    // ✅ Translate (Move)
    translateMiddle: {
        transform: [{ translateX: -50 }, { translateY: -50 }],
    },
    translateMiddleX: {
        transform: [{ translateX: -50 }],
    },
    translateMiddleY: {
        transform: [{ translateY: -50 }],
    },

    // ✅ Scale (Resize)
    scale50: {
        transform: [{ scale: 0.5 }],
    },
    scale75: {
        transform: [{ scale: 0.75 }],
    },
    scale90: {
        transform: [{ scale: 0.9 }],
    },
    scale100: {
        transform: [{ scale: 1 }],
    },
    scale110: {
        transform: [{ scale: 1.1 }],
    },
    scale125: {
        transform: [{ scale: 1.25 }],
    },
    scale150: {
        transform: [{ scale: 1.5 }],
    },

    // ✅ Rotate
    rotate0: {
        transform: [{ rotate: '0deg' }],
    },
    rotate45: {
        transform: [{ rotate: '45deg' }],
    },
    rotate90: {
        transform: [{ rotate: '90deg' }],
    },
    rotate180: {
        transform: [{ rotate: '180deg' }],
    },

    // ✅ Skew
    skew0: {
        transform: [{ skewX: '0deg' }, { skewY: '0deg' }],
    },
    skew6: {
        transform: [{ skewX: '6deg' }, { skewY: '6deg' }],
    },
    skew12: {
        transform: [{ skewX: '12deg' }, { skewY: '12deg' }],
    },


    // ✅ Hide
    hideRight: {
        transform: [{ translateX: screenSize.width }],
    },
    hideLeft: {
        transform: [{ translateX: -100 }],
    },
    hideTop: {
        transform: [{ translateY: 100 }],
    },
    hideBottom: {
        transform: [{ translateY: -screenSize.height }],
    },
    hideVisibility: {
        backfaceVisibility: "hidden"
    },

    // ✅ show
    transformShow: {
        transform: "none",
    },
    showVisibility: {
        backfaceVisibility: "visible"
    },

    //Offcanvas & Modals
    offcanvas: {
        zIndex: 3000,
        position: 'absolute',
        top: 0,
        width: '75%',
        height: '100%',
        backgroundColor: '#e6e6e6',
        transform: [{ translateX: 300 }],
    },
    offcanvasEnd: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: screenSize.height + 60,
        width: 300, // Adjust width as needed
        backgroundColor: '#051123', // Change as needed
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        transform: [{ translateX: -screenSize.width }], // Initially off-screen (right side)
    },
    offcanvasShow: {
        transform: [{ translateX: 0 }],
    },
    modalBody: {
        flex: 1,
        padding: 20,
        backgroundColor: '#081526',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
    },

    //Tables 
    table: {
        borderWidth: 1,
        borderColor: '#ddd',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    tableCell: {
        flex: 1,
        padding: 8,
    },

    //Navbar & Menus
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    navItem: {
        marginHorizontal: 10,
    },
    // Buttons & Forms
    textCenter: { textAlign: 'center' },
    textUppercase: { textTransform: 'uppercase' },
    textLowercase: { textTransform: 'lowercase' },
    fwBold: { fontWeight: 'bold' },
    textPrimary: { color: '#007bff' },
    textDanger: { color: '#dc3545' },
    textMuted: { color: '#6c757d' },


    //Positioning
    positionRelative: { position: 'relative' },
    positionAbsolute: { position: 'absolute' },
    positionFixed: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
    top0: { top: 0 },
    bottom0: { bottom: 0 },
    left0: { left: 0 },
    right0: { right: 0 },

    //fontsize
    h1: { fontSize: 32, fontWeight: 'bold' },
    h2: { fontSize: 28, fontWeight: 'bold' },
    h3: { fontSize: 24, fontWeight: 'bold' },
    h4: { fontSize: 20, fontWeight: 'bold' },
    h5: { fontSize: 18, fontWeight: 'bold' },
    h6: { fontSize: 16, fontWeight: 'bold' },

    /* ✅ Base Button Styles */
    btn: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },

    /* ✅ Button Variants */
    btnPrimary: { backgroundColor: '#007bff' }, // Bootstrap Primary Blue
    btnSecondary: { backgroundColor: '#6c757d' },
    btnSuccess: { backgroundColor: '#28a745' },
    btnDanger: { backgroundColor: '#dc3545' },
    btnWarning: { backgroundColor: '#ffc107' },
    btnInfo: { backgroundColor: '#17a2b8' },
    btnLight: { backgroundColor: '#f8f9fa' },
    btnDark: { backgroundColor: '#343a40' },

    btnDangerLight: {
        backgroundColor: "#ffeae5",
        borderColor: "#ffeae5",
        color: "#ff562f"
    },
    btnSuccessLight: {
        backgroundColor: "#d1f5f0",
        borderColor: "#d1f5f0",
        color: "#04a08b"
    },

    /* ✅ Button Sizes */
    btnLg: { paddingVertical: 14, paddingHorizontal: 20, fontSize: 18 },
    btnSm: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        fontSize: 14.8,
        lineHeight: 21.6
    },

    /* ✅ Button Text Colors */
    btnTextLight: { color: '#fff' }, // White text for dark backgrounds
    btnTextDark: { color: '#000' }, // Black text for light backgrounds

    /* ✅ Button Borders */
    btnOutline: { borderWidth: 1, borderColor: '#ccc', backgroundColor: 'transparent' },

    /* ✅ Disabled Button */
    btnDisabled: { opacity: 0.65 },

    //boxshodow
    noShadow: {
        boxShadow: "none"
    },
    // Height Classes
    h25: { height: "25" },
    h50: { height: "50" },
    h75: { height: "75" },
    h100: { height: "100" },

    // Width Classes 
    w25: { width: "25" },
    w50: { width: "50" },
    w75: { width: "75" },
    w100: { width: "100" },

    // Line Height Classes
    lh10: { lineHeight: 10 },
    lh20: { lineHeight: 20 },
    lh30: { lineHeight: 30 },
    lh40: { lineHeight: 40 },
    lh50: { lineHeight: 50 },
    lh60: { lineHeight: 60 },
    lh75: { lineHeight: 75 },
    lh100: { lineHeight: 100 },

    fs32: { fontSize: 32 },  // Equivalent to Bootstrap fs-1
    fs28: { fontSize: 28 },  // Equivalent to Bootstrap fs-2
    fs24: { fontSize: 24 },  // Equivalent to Bootstrap fs-3
    fs20: { fontSize: 20 },  // Equivalent to Bootstrap fs-4
    fs16: { fontSize: 16 },  // Equivalent to Bootstrap fs-5
    fs14: { fontSize: 14 },  // Equivalent to Bootstrap fs-6

    // Custom additional sizes
    fs12: { fontSize: 12 },
    fs10: { fontSize: 10 },


    fw100: { fontWeight: '100' },       // Equivalent to fw-thin
    fw200: { fontWeight: '200' }, // Equivalent to fw-extralight
    fw300: { fontWeight: '300' },      // Equivalent to fw-light
    fw400: { fontWeight: '400' },     // Equivalent to fw-normal
    fw500: { fontWeight: '500' },     // Equivalent to fw-medium
    fw600: { fontWeight: '600' },   // Equivalent to fw-semibold
    fw700: { fontWeight: '700' },       // Equivalent to fw-bold
    fw800: { fontWeight: '800' },  // Equivalent to fw-extrabold
    fw900: { fontWeight: '900' },
});

