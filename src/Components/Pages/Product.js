import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Product({ cart, setCartCount, setCart, search }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:8000/products");
                setProducts(res.data);
            } catch (err) {
                console.error(err);
                toast.error("فشل في تحميل المنتجات", {
                    position: "top-center",
                    autoClose: 2000,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        setCart(prevCart => {
            const updatedCart = [...prevCart, product];
            localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage here
            return updatedCart; // Return updated cart
        });
        setCartCount(prevCount => prevCount + 1);
        toast.success('تم إضافة المنتج إلى السلة', {
            position: "top-center",
            autoClose: 2000,
        });
    };

    if (loading) {
        return <div>جاري التحميل...</div>;
    }

    const filteredProducts = search
        ? products.filter(product => product.productName.toLowerCase().includes(search.toLowerCase()))
        : products;

    const productItems = filteredProducts.map((product, index) => (
        <div key={index} className="ProductShow">
            <img src={product.imageUrl} alt={product.productName} width={250} height={200} />
            <h1>{product.productName}</h1>
            <h1>{product.productCode}</h1>
            <h1>{product.releaseDate}</h1>
            <h1>{product.description}</h1>
            <h1>{product.price}</h1>
            <h1>{product.starRating}</h1>
            <button onClick={() => handleAddToCart(product)}>أضف إلى السلة</button>
        </div>
    ));

    return (
        <div>
            <div className="Product">
                {productItems.length > 0 ? productItems : <p>لا توجد منتجات متاحة.</p>}
            </div>
            <ToastContainer />
        </div>
    );
}
