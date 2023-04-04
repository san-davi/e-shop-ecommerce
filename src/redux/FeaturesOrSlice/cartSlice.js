import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialState = {
    // cartItems: []
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    previousURL: "",
}

const cartSlice = createSlice ({
    name: "cart",
    initialState,
    reducers: {
        ADD_TO_CART(state, action){
            console.log(action.payload)
            // product VAr to chec if product exist
            const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

            if (productIndex >= 0){
                // ietem already exist in the cart so increase quantity
                state.cartItems[productIndex].cartQuantity +=1;
                toast.info(`${action.payload.name} was increased by One`, {position: "top-center"})

                


            }else{
                // ADD NEW PRODUCT IN ACRT
                const tempProduct = {...action.payload,
                     cartQuantity: 1}
                     state.cartItems.push(tempProduct)
                     toast.success(`${action.payload.name} added to Cart`, {position: "top-center"})

            }
            // SAVE CART TO LOCAL STORAGE
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        DECREASE_CART(state, action){
            console.log(action.payload);
            const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

            if (state.cartItems[productIndex].cartQuantity > 1){
                state.cartItems[productIndex].cartQuantity -= 1
                toast.info(`${action.payload.name} was decreased by One`, {position: "top-center"})

            }else if(state.cartItems[productIndex].cartQuantity === 1){
                const newCartItem = state.cartItems.filter((item)=>item.id !== action.payload.id)
                state.cartItems = newCartItem
                toast.success(`${action.payload.name} removed from cart`, {position: "top-center"})

            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

        },
        REMOVE_FROM_CART(state, action){
            const newCartItem = state.cartItems.filter((item)=>item.id !== action.payload.id)
            state.cartItems = newCartItem
            toast.success(`${action.payload.name} was removed from cart`, {position: "top-center"})
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))


        },
        CLEAR_CART(state, action){
            // console.log(action.payload)
            state.cartItems = []
            toast.success(`Cart Cleared`, {position: "top-center"})
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        CALCULATE_SUB_TOTAL(state, action){
            const array = []
            state.cartItems.map((item)=>{
                const {price,cartQuantity} = item
                const cartItemAmount = price * cartQuantity
                // console.log(cartItemAmount)
                return array.push(cartItemAmount)
            })
            const totalAmount = array.reduce((a, b)=>{
                return a + b
            }, 0)
            state.cartTotalAmount = totalAmount

        },
        CALCULATE_TOTAL_QUANTITY(state,action){
            const array = []
            state.cartItems.map((item)=>{
                const {cartQuantity} = item
                const quantity = cartQuantity
                // console.log(cartItemAmount)
                return array.push(quantity)
            })
            const totalQuantity = array.reduce((a, b)=>{
                return a + b
            }, 0)
            state.cartTotalQuantity = totalQuantity

        },
        SAVE_URL(state, action){
            state.previousURL = action.payload;

        }
    }
})

export const {ADD_TO_CART, DECREASE_CART, REMOVE_FROM_CART, CLEAR_CART, CALCULATE_SUB_TOTAL, CALCULATE_TOTAL_QUANTITY, SAVE_URL} = cartSlice.actions

export const selectCartItems = (state) => state.cart.cartItems
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount
export const selectPreviousURL = (state) => state.cart.previousURL


export default cartSlice.reducer