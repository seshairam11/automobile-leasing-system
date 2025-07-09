import * as Clipboard from "expo-clipboard";
import { Dimensions, Image, Text, TouchableOpacity, Pressable, View, Animated } from 'react-native';
import { styles } from '../assets/css/style';
import { bootstrap } from '../assets/css/bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LocalButton from './LocalButton';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setlogininfo } from '../brewStore/AppState';
import { StatusBar } from 'expo-status-bar';

export default function Header() {
    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [startLoader, setStartLoader] = useState(true);
    const [visibleBackDrop, setVisibleBackDrop] = useState(false);
    const [visibleProfile, setVisibleProfile] = useState(false);
    const [screenSize, setScreenSize] = useState(Dimensions.get('window'));

    const opacity = useRef(new Animated.Value(0)).current;
    const ctlAttribute = useRef([]);
    const navigation = useNavigation();
    const appState = useSelector((state) => state.appstate.login_info);
    const dispatch = useDispatch();

    function initControl() {
        let ctl_array = [
            {
                /*Ctl: X : 0*/
                arrayindex: 0,
                theme: {
                    id: "profileCross",
                    style: [bootstrap.btnSm, bootstrap.btn, bootstrap.btnDangerLight, bootstrap.noShadow],
                    disable: false,
                    labelText: null,
                },
                icon: {
                    setIcon: true,
                    name: "close",
                    size: 14,
                    color: "#ff562f",
                }
            },
            {
                /*Ctl: logout : 1*/
                arrayindex: 1,
                theme: {
                    id: "logout",
                    style: [bootstrap.btnSm, bootstrap.btn, bootstrap.btnSuccessLight, bootstrap.mt1],
                    disable: false,
                    labelText: "Logout",
                    labelTextStyle: [{ color: "#04a08b" }]
                },
                icon: {
                    setIcon: true,
                    name: "logout",
                    size: 19,
                    color: "#04a08b",
                }
            },
        ]
        ctlAttribute.current = ctl_array;
        setStartRender(true);
        setStartInit(false);
    }
    async function copyIt(copy) {
        await Clipboard.setStringAsync(copy);
    }
    function handlePress(id) {
        console.log(id);
        switch (id) {
            case 'map':
                navigation.navigate('home');
                break;
            case 'tracking':
                navigation.navigate('trackvehicle');
                setVisibleBackDrop(false);
                setVisibleProfile(false);
                break;
            case 'deletetrack':
                navigation.navigate('deletetrack');
                setVisibleBackDrop(false);
                setVisibleProfile(false);
                break;
            case 'requestTracking':
                navigation.navigate('requesttrack');
                setVisibleBackDrop(false);
                setVisibleProfile(false);
                break;
            case 'add-device':
                navigation.navigate('orderiot');
                break;
            case 'profile':
                setVisibleBackDrop(true);
                setVisibleProfile(true);
                break;
            case 'profileCross':
            case 'backDrop':
                console.log("backDrop")
                setVisibleBackDrop(false);
                setVisibleProfile(false);
                break;
            case "logout":
                dispatch(setlogininfo({}));
                navigation.navigate('entry');
                setVisibleBackDrop(false);
                setVisibleProfile(false);
                break;
            case "myprofile":
                navigation.navigate('myprofile');
                setVisibleBackDrop(false);
                setVisibleProfile(false);
                break;
            case 'addlocation':
                navigation.navigate('addLocation');
                setVisibleBackDrop(false);
                setVisibleProfile(false);
                break;
            case 'settings':
                navigation.navigate('settings');
                setVisibleBackDrop(false);
                setVisibleProfile(false);
                break;
            default:
                break;
        }
    }
    useEffect(() => {
        const updateSize = () => {
            setScreenSize(Dimensions.get('window')); // Always get latest window size
        };
        const subscription = Dimensions.addEventListener('change', updateSize);
        return () => subscription?.remove(); // Clean up listener
    }, []);

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: visibleBackDrop ? 1 : 0, // 1 for visibleBackDrop, 0 for hidden
            duration: 150, // 150ms
            useNativeDriver: true, // Optimize animation
        }).start();
    }, [visibleBackDrop]);

    useEffect(() => {
        if (startInit === true) {
            initControl();
        } else {
            // if (isLoadingApi) {
            //     switch (apiKey) {
            //         case "LOGIN":
            //             fnLoginResult();
            //             break;
            //     }
            // }
        }

    }, [startInit]);
    return (
        (startRender && (
            <View>
                {/* Header Container */}
                <View style={styles.header}>
                    {/* Left Section - map Button */}
                    <View style={styles.headerLeft}>
                        <TouchableOpacity style={styles.iconContainer} onPress={() => handlePress('map')}>
                            <MaterialIcons name="map" size={30} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Center Section - Logo */}
                    <View style={styles.headerImageContainer}>
                        <Image source={require('../assets/img/logo.jpg')} style={styles.headerImage} />
                    </View>

                    {/* Right Section - Notification & Profile */}
                    <View style={styles.headerRight}>
                        {appState.userType == "Provider" ?
                            <TouchableOpacity style={styles.iconContainerRight} onPress={() => handlePress('add-device')}>
                                <MaterialIcons name="add" size={15} color="white" />
                                <Text style={{ color: "white", marginRight: 5, fontSize: 10 }}>Device</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.iconContainer} onPress={() => handlePress('notifications')}>
                                <MaterialIcons name="notifications" size={30} color="white" />
                            </TouchableOpacity>
                        }
                        <View style={{ height: 50, marginRight: 15 }}>
                            <TouchableOpacity style={styles.profile} onPress={() => handlePress('profile')}>
                                <Image source={require('../assets/img/profile.png')} style={styles.profileImg} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Backdrop with Animated Opacity */}
                {
                    visibleBackDrop && (
                        <Animated.View style={[{
                            width: screenSize.width,
                            height: screenSize.height + 60,
                            opacity
                        }, styles.backDrop]}>
                            <Pressable style={{ flex: 1 }} onPress={() => handlePress("backDrop")} />
                        </Animated.View>
                    )
                }
                <View style={[bootstrap.offcanvas, bootstrap.offcanvasEnd, styles.canvasSearch, visibleProfile ? bootstrap.transformShow : bootstrap.hideRight]}>
                    <View style={[bootstrap.modalBody, styles.p30, { marginTop: 20 }]}>
                        <View style={[bootstrap.dFlex, bootstrap.alignItemsCenter, styles.mb15, bootstrap.justifyContentBetween, bootstrap.flexRow]}>
                            <Text style={[bootstrap.h4, bootstrap.m0, { color: "white" }]}>User Profile</Text>
                            <LocalButton
                                ctl_Attribute={ctlAttribute.current[0]}
                                handlePress={handlePress}
                            />
                        </View>
                        <View style={[bootstrap.dFlex, bootstrap.flexRow]}>
                            <Image source={require('../assets/img/profile.png')} style={{ width: 135, height: 135, borderRadius: 20, resizeMode: "contain" }} />
                            <View style={{ paddingLeft: 20, marginTop: 20 }}>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <Text style={[bootstrap.m0, bootstrap.h5, { color: "white" }]}>
                                        {appState.userName}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => copyIt(appState._id)}
                                    >
                                        <Image
                                            source={require('../assets/img/copy.png')}
                                            style={{ width: 20, height: 20, backgroundColor: "white", borderRadius: 1, borderRadius: 5, resizeMode: "contain", marginTop: 5, marginLeft: 10 }} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ marginTop: 2, marginBottom: 20, color: "#7e8299" }}>
                                    {appState.userType}
                                </Text>
                                <LocalButton
                                    ctl_Attribute={ctlAttribute.current[1]}
                                    handlePress={handlePress}
                                />
                            </View>
                        </View>
                        <View style={{ marginVertical: 15 }}></View>
                        <TouchableOpacity style={[bootstrap.dFlex, bootstrap.flexRow]} onPress={() => handlePress("myprofile")}>
                            <View style={[bootstrap.dFlex, bootstrap.alignItemsCenter, bootstrap.flexRow, styles.mb30]}>
                                <View style={[styles.me15, bootstrap.bgPrimaryLight, bootstrap.w75, bootstrap.h75, bootstrap.lh60, bootstrap.textCenter, { borderRadius: 5 }]}>
                                    <MaterialIcons name='person' size={60} style={{ padding: 7 }} color={"#0052cc"} />
                                </View>
                                <View style={[bootstrap.dFlex, bootstrap.fw500]}>
                                    <Text style={[{ color: "white" }, bootstrap.mb1, bootstrap.fs16]}>
                                        My Profile
                                    </Text>
                                    <Text style={bootstrap.textFade}>Account settings and more</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {appState.userType == "Provider" &&
                            <>
                                < TouchableOpacity style={[bootstrap.dFlex, bootstrap.flexRow]} onPress={() => handlePress("addlocation")}>
                                    <View style={[bootstrap.dFlex, bootstrap.alignItemsCenter, bootstrap.flexRow, styles.mb30]}>
                                        <View style={[styles.me15, bootstrap.bgDangerLight, bootstrap.w75, bootstrap.h75, bootstrap.lh60, bootstrap.textCenter, { borderRadius: 5 }]}>
                                            <MaterialIcons name='add-location' size={55} style={{ padding: 12 }} color={"#ff562f"} />
                                        </View>
                                        <View style={[bootstrap.dFlex, bootstrap.fw500]}>
                                            <Text style={[{ color: "white" }, bootstrap.mb1, bootstrap.fs16]}>
                                                Add Loaction
                                            </Text>
                                            <Text style={bootstrap.textFade}>Add location of Rental Area</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                < TouchableOpacity style={[bootstrap.dFlex, bootstrap.flexRow]} onPress={() => handlePress("tracking")}>
                                    <View style={[bootstrap.dFlex, bootstrap.alignItemsCenter, bootstrap.flexRow, styles.mb30]}>
                                        <View style={[styles.me15, bootstrap.bgPrimaryLight, bootstrap.w75, bootstrap.h75, bootstrap.lh60, bootstrap.textCenter, { borderRadius: 5 }]}>
                                            <MaterialIcons name='my-location' size={50} style={{ padding: 12 }} color={"#0052cc"} />
                                        </View>
                                        <View style={[bootstrap.dFlex, bootstrap.fw500]}>
                                            <Text style={[{ color: "white" }, bootstrap.mb1, bootstrap.fs16]}>
                                                Track Vehicle
                                            </Text>
                                            <Text style={bootstrap.textFade}>Find the Vehicle</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                < TouchableOpacity style={[bootstrap.dFlex, bootstrap.flexRow]} onPress={() => handlePress("deletetrack")}>
                                    <View style={[bootstrap.dFlex, bootstrap.alignItemsCenter, bootstrap.flexRow, styles.mb30]}>
                                        <View style={[styles.me15, bootstrap.bgDangerLight, bootstrap.w75, bootstrap.h75, bootstrap.lh60, bootstrap.textCenter, { borderRadius: 5 }]}>
                                            <MaterialIcons name='delete' size={55} style={{ padding: 12 }} color={"#ff562f"} />
                                        </View>
                                        <View style={[bootstrap.dFlex, bootstrap.fw500]}>
                                            <Text style={[{ color: "white" }, bootstrap.mb1, bootstrap.fs16]}>
                                                Delete Tracking
                                            </Text>
                                            <Text style={bootstrap.textFade}>End the Renter Tracking</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </>
                        }
                        {appState.userType == "Renter" &&
                            < TouchableOpacity style={[bootstrap.dFlex, bootstrap.flexRow]} onPress={() => handlePress("requestTracking")}>
                                <View style={[bootstrap.dFlex, bootstrap.alignItemsCenter, bootstrap.flexRow, styles.mb30]}>
                                    <View style={[styles.me15, bootstrap.bgPrimaryLight, bootstrap.w75, bootstrap.h75, bootstrap.lh60, bootstrap.textCenter, { borderRadius: 5 }]}>
                                        <MaterialIcons name='my-location' size={50} style={{ padding: 12 }} color={"#0052cc"} />
                                    </View>
                                    <View style={[bootstrap.dFlex, bootstrap.fw500]}>
                                        <Text style={[{ color: "white" }, bootstrap.mb1, bootstrap.fs16]}>
                                            Request Tracking
                                        </Text>
                                        <Text style={bootstrap.textFade}>Requset from Provider</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>}
                        <TouchableOpacity style={[bootstrap.dFlex, bootstrap.flexRow]} onPress={() => handlePress("settings")}>

                            <View style={[bootstrap.dFlex, bootstrap.alignItemsCenter, bootstrap.flexRow, styles.mb30]}>
                                <View style={[styles.me15, bootstrap.bgSuccessLight, bootstrap.w75, bootstrap.h75, bootstrap.lh60, bootstrap.textCenter, { borderRadius: 5 }]}>
                                    <MaterialIcons name='settings-suggest' size={50} style={{ padding: 12 }} color={"#04a08b"} />
                                </View>
                                <View style={[bootstrap.dFlex, bootstrap.fw500]}>
                                    <Text style={[{ color: "white" }, bootstrap.mb1, bootstrap.fs16]}>
                                        Settings
                                    </Text>
                                    <Text style={bootstrap.textFade}>Accout Settings</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[bootstrap.dFlex, bootstrap.flexRow]} onPress={() => handlePress("")}>
                            <View style={[bootstrap.dFlex, bootstrap.alignItemsCenter, bootstrap.flexRow, styles.mb30]}>
                                <View style={[styles.me15, bootstrap.bgPrimaryLight, bootstrap.w75, bootstrap.h75, bootstrap.lh60, bootstrap.textCenter, { borderRadius: 5 }]}>
                                    <MaterialIcons name='info' size={50} style={{ padding: 12 }} color={"#0052cc"} />
                                </View>
                                <View style={[bootstrap.dFlex, bootstrap.fw500]}>
                                    <Text style={[{ color: "white" }, bootstrap.mb1, bootstrap.fs16]}>
                                        About
                                    </Text>
                                    <Text style={bootstrap.textFade}>Automobile Leasing..</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        ))

    );
}
