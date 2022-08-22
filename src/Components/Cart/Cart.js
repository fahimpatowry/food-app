import { useContext } from 'react';
import Modal from '../UI/Modal';
import classes from './Card.module.css';
import CartContext from '../../store/cart-contest';
import CartItems from './CartItems';

export default function Cart({...props}){
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItem = cartCtx.items.length > 0;
    // let itemLangth = cartCtx.items.length;

    const cartItemAddHdler = (item) =>{
        cartCtx.addItem({...item, amount:1})
    }

    const cartItemRemoveHandler= (id) =>{
        cartCtx.removeItem(id);
    }


    const cartItems =(
        <ul className={classes.itemstyl}>
            {cartCtx.items.map((item)=>(
                <CartItems 
                            key={item.id} 
                            name={item.name} 
                            price ={item.price} 
                            amount={item.amount}
                            // length={itemLangth} 
                            onAdd={cartItemAddHdler.bind(null, item)} 
                            onRemove ={cartItemRemoveHandler.bind(null, item.id)}
                />
            ))}
        </ul>
    );

    return(
        <Modal onHeide={props.onHeide}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.action}>
                <button className={classes['button--alt']} onClick={props.onHeide}>Close</button> {/*  clasName={classes['button--alt']}*/}
                {hasItem && <button className={classes.button}>Order</button>} {/*  clasName={classes.button}*/}
            </div>
        </Modal>
    );
};