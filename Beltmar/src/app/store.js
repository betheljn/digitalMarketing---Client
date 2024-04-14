import { configureStore } from "@reduxjs/toolkit";
import { beltmarApi } from "../api/beltmarApi";
import articlesReducer from "../slice/articlesSlice"
import beltmarReducer from "../slice/beltmarSlice"
import clientsReducer from "../slice/clientsSlice"
import companyDataReducer from "../slice/companyDataSlice"
import imageUploadReducer from "../slice/imageUploadSlice"
import projectsReducer from "../slice/projectsSlice"

export const store = configureStore({
    reducer: {
        [beltmarApi.reducerPath]: beltmarApi.reducer,
        articles: articlesReducer,
        auth: beltmarReducer,
        clients: clientsReducer,
        companyData: companyDataReducer,
        imageUpload: imageUploadReducer,
        projects: projectsReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(beltmarApi.middleware)
});

export default store;