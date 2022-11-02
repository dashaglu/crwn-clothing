import { CartItem as TCartItem } from '../../store/cart/cart.types';

import { CartItemContainer, CartItemDetails } from './cart-item.styles';

type CartItemProps = {
  cartItem: TCartItem;
};

const CartItem = ({ cartItem }: CartItemProps) => {
    const { name, imageUrl, price, quantity } = cartItem;

    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`}/>
            <CartItemDetails>
                <span className="name">{name}</span>
                <span className="price">{quantity} x ${price}</span>
            </CartItemDetails>
        </CartItemContainer>
    );
}

export default CartItem;