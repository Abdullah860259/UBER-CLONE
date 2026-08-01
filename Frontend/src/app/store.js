import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/user/user';
import { persistStore, persistReducer } from "redux-persist";
import storageModule from "redux-persist/lib/storage";
const storage = storageModule.default;


const persistConfig = {
    key: "root",
    storage
}

const persistedReducer = persistReducer(
    persistConfig,
    userReducer
)

export const store = configureStore({
    reducer: {
        user: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    "persist/PERSIST",
                    "persist/REHYDRATE",
                ],
            },
        }),
});

export const persistor = persistStore(store)