import { Link } from "react-router-dom";

 
export default function Dasgbord() {
    return (
        <div className="DashBord">
           <h1> E-COMMERCE </h1>
           <ul>
            <Link to="/Login" className="active1"> Login </Link>
            <Link to="/SignUP" className="active1"> SignUP </Link>
           </ul>
 
        </div>
    );
}