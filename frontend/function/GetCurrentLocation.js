import * as Location from "expo-location";

let locationSubscription = null; // Store subscription globally

// Function to start live tracking and return lat/lng
export const startLiveTracking = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            // Request location permission
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission denied");
                return reject("Permission denied");
            }

            // Start tracking location
            locationSubscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 3000, // Update every 3 seconds
                    distanceInterval: 5, // Update when user moves 5 meters
                },
                (location) => {
                    const { latitude, longitude } = location.coords;
                    console.log("Updated Location:", latitude, longitude);

                    // Resolve the Promise with lat & lng
                    resolve({ latitude, longitude });
                }
            );
        } catch (error) {
            console.error("Live tracking error:", error);
            reject(error);
        }
    });
};

// Function to stop tracking
export const stopLiveTracking = () => {
    if (locationSubscription) {
        locationSubscription.remove();
        locationSubscription = null;
        console.log("Tracking stopped");
    }
};
