import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((item) => item.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map((item) => item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1}
            : item
        );
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
};

const removeCartItem = (cartItems, productToRemove) => {
    if (productToRemove.quantity > 1) {
        return cartItems.map((cartItem) => cartItem.id === productToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
    }

    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

const clearCartItem = (cartItems, productToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS'
};

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            };
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...updateCartItemReducer(payload.handler(state.cartItems, payload.item))
            };
        default:
            throw new Error(`Unhandled action type: ${type} in cartReducer`);
    }
};

const updateCartItemReducer = (newCartItems) => {
    return {
        cartItems: newCartItems,
        cartCount: newCartItems.reduce((acc, item) => acc + item.quantity, 0),
        cartTotal: newCartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0)
    }
};

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
};

export const CartProvider = ({ children }) => {
    const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const addItemToCart = (productToAdd) => {
        dispatch(createAction(
            CART_ACTION_TYPES.SET_CART_ITEMS,
            { handler: addCartItem, item: productToAdd }
        ));
    };

    const removeItemFromCart = (productToRemove) => {
        dispatch(createAction(
            CART_ACTION_TYPES.SET_CART_ITEMS,
    { handler: removeCartItem, item: productToRemove }
        ));
    };

    const clearItemFromCart = (productToClear) => {
        dispatch(createAction(
            CART_ACTION_TYPES.SET_CART_ITEMS,
            { handler: clearCartItem, item: productToClear }
        ));
    }

    const setIsCartOpen = (isCartOpen) => dispatch(createAction(
        CART_ACTION_TYPES.SET_IS_CART_OPEN,
        isCartOpen
    ));

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        cartCount,
        clearItemFromCart,
        cartTotal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};