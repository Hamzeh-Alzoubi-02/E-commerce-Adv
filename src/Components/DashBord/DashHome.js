import { Link } from "react-router-dom";
import Logout from "./Logout";
 
 

export default function DashHome() {
  
    function WindowPage() {
        setTimeout(() => {
            window.scrollTo({
                top: 1000,
                behavior: 'smooth' // إضافة هذا لجعل التمرير سلسًا
            });
        }, 100);
     
    
  }
    return (
        
        <div>
            
        <div className="DashHome">
            
            <h1>Home</h1>
         
            <ul className="UL">
                    <Link to="/Home" onClick={() => window.location.reload()}>Home</Link>
                    <Link  onClick={WindowPage}>Product</Link>
                 
                    <Link to="/About">About Us</Link>
                    <Link to="/Contact">Contact Us</Link>
                    <Logout/>
            </ul>
         
        </div>
       
</div>
    )
}
//window.scrollTo(0, 500)
