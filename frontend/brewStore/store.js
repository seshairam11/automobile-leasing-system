import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AppStateReducer from "./AppState";
import AsyncStorage from "@react-native-async-storage/async-storage";  // Use AsyncStorage
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage: AsyncStorage, // Use AsyncStorage instead of storage
};

const rootReducer = combineReducers({
  appstate: AppStateReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store); // Persistor for rehydration
export default store;
