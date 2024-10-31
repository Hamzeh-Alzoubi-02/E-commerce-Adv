import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify"; 
export default function Cart({ cart = [],  setCart }) {
    useEffect(() => {
        // This effect runs when the cart changes.
        console.log("Cart updated:", cart);
    }, [cart]);
    const handleRemove = (index) => {
        const newCart = [...cart]; // Create a shallow copy of the cart
        newCart.splice(index, 1);  // Remove the item at the specified index
        setCart(newCart);
        toast.success('تم حذف المنتج من السلة', { position: "top-center", autoClose: 2000 });         // Update the cart state
    };

    return (
        <div className="Cart">
            <h1>سلة التسوق</h1>
            <h2>عدد المنتجات في السلة: {cart.length}</h2> {/* عداد عدد المنتجات */}
            {cart.length === 0 ? (
                <p>لا توجد منتجات في السلة.</p>
            ) : (
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>
                            Name: {item.productName}<br />
                            Price: ${item.price}<br />
                            Code: {item.productCode} -
                            <img src={item.imageUrl} alt={item.productName} style={{ width: '100px', height: '100px' }} />
                            <button onClick={() => handleRemove(index)} className="Remove">Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <ToastContainer />
        </div>
    );
}
