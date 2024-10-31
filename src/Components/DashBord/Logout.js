import { Link } from "react-router-dom";

export default function Logout() {
    return (
        <div className="Logout">
            <Link to="/Login" replace={true}>Logout</Link>
        </div>
    );
}