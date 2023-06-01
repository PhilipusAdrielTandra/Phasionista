import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  authenticated: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "login": {
      return { ...state, authenticated: true };
    }
    case "signup": {
      return { ...state, authenticated: true };
    }
    case "logout": {
      return { ...state, authenticated: false };
    }
    default: {
      return state;
    }
  }
};

const persistConfig = {
  key: "authStore",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const authStore = configureStore({
  reducer: { authen: persistedAuthReducer },
});

export const persistor = persistStore(authStore);