import { configureStore, combineReducers } from '@reduxjs/toolkit'
import cartReducer from './reducers/cart';
import userReducer from './reducers/user';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer
})

const persistConfig = {
  key: "shoppingcart",
  whitelist: ["cart", "user"], 
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ 
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;