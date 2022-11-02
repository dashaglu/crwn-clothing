import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { CategoryItem } from '../categories/categories.types';

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
    const existingCartItem = cartItems.find((item) => item.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map((item) => item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1}
            : item
        );
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
};

const removeCartItem = (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => {
    if (productToRemove.quantity > 1) {
        return cartItems.map((cartItem) => cartItem.id === productToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
    }

    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

const clearCartItem = (cartItems: CartItem[], productToClear: CartItem): CartItem[] => {
    return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
};

type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;
export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (cartItems: CartItem[], cartItemToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, cartItemToAdd);
    return setCartItems(newCartItems);
}

export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return setCartItems(newCartItems);
}

export const clearItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
    const newCartItems = clearCartItem(cartItems, cartItemToRemove);
    return setCartItems(newCartItems);
}


type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;
export const setIsCartOpen = withMatcher(
  (bool: boolean): SetIsCartOpen => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);
    }
);