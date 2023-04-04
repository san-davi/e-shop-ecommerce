import { configureStore, combineReducers} from "@reduxjs/toolkit"
import authReducer from './FeaturesOrSlice/authSlice'
import filterSlice from "./FeaturesOrSlice/filterSlice"
import productReducer from './FeaturesOrSlice/productSlice'
import cartReducer from './FeaturesOrSlice/cartSlice'
import checkoutReducer from './FeaturesOrSlice/checkoutSlice'
import orderReducer from "./FeaturesOrSlice/orderSlice"



const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    // SEARCH REDUCER?FLITER
    filter: filterSlice,
    // cart REDUCER
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer

})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default store