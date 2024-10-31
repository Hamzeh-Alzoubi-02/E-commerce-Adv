import { Link } from "react-router-dom";
import DashHome from "../DashBord/DashHome";
import shop from "../../Components/IMG/—Pngtree—cartoon shopping cart_4586974.png";
import FlipImg from "./FlipImg";
import Product from "./Product";
import { useState } from "react";

export default function Home({ cart, setCart }) {
    const [cartCount, setCartCount] = useState(0);
    const [search, setSearch] = useState("");

    return (
        <div className="OutHome">
            <DashHome />
            <div>
                <div className="TextHome">
                    <h1>Welcome To E-COMMERCE</h1>
                    <Link to="/Cart" style={{ textDecoration: 'none' }}>
                        <img src={shop} alt="Shopping cart icon" width={80} height={80} />
                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>} {/* Display cart count */}
                    </Link>
                </div>
                <input
                    type="search"
                    placeholder="Search"
                    className="SearchHome"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <div className="CenterHome">
                    <FlipImg />
                </div>
                <div className="ProductHome">
                    <Product cart={cart} setCart={setCart} setCartCount={setCartCount} search={search} /> {/* Pass search state */}
                </div>
            </div>
        </div>
    );
}
