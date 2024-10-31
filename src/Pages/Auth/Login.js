import { useEffect, useRef, useState } from "react";
import showpass from "../../Components/IMG/eye.png";
import dontshowpass from "../../Components/IMG/hide.png";
import Dasgbord from "../DashBord/Dasgbord";
import Loding from "../../Animation/Loding";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
   
   /* server 
   npm start
npx json-server --watch src/Server/User.json --port 9000
npx josn-server --watch src/Server/Product.json --port 8000
   
   */
    /* Focus */
    const focus=useRef(null); 
    useEffect(() => {
        focus.current.focus();
    }, [])
   /* Loding */
   const [loading, setLoading] = useState(false);



   /* Show Password */
    const [showPassword, setShowPassword] = useState(false); 
    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }






    /* Error */
    const [error, setError]=useState(false);
    /* Data User */



    const [UserData, setUserData] = useState({
   
        email: "",
        password: "",
       
    });
    function DataChange(event) {
        setUserData({...UserData, [event.target.name]: event.target.value});
    }

   
   
  
   /* API SENT DATA */
   async function SUBMIT(event) {
        event.preventDefault();
       if( UserData.password !== "" && UserData.email !== "") {
        setError(false);      
        setLoading(true);
        try{
                await axios.get("http://localhost:9000/users",UserData)
                .then((res) => {
                    res.data.map((user) => {
                        if(user.email===UserData.email && user.password===UserData.password){
                            toast.success('Login Successfully',{
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });
                            setTimeout(() => {
                                
                              
                                window.location.href = "/Home";  
                                
                            }, 5000);
                             
                        }else{
                             
                            toast.error('Email or Password is incorrect',{
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                                

                            });
                            setLoading(false);
                        }
                         
                    })
                })
         }
            catch(err){
                console.log(err);
            }  
         
    }
    else{
        setError(true);
    }
}
    return (
       
            <div >
                 <Dasgbord/>
            <div className="SignUP">
               
            <form onSubmit={SUBMIT} className="form-sign">
            {loading && <Loding/>}
           <ToastContainer/>
                <label><p>Email</p></label>
                <input 
                    type="email" 
                    value={UserData.email} 
                    name="email" 
                    onChange={DataChange} 
                required
                ref={focus}
                placeholder="Email" />
                <label><p>Password</p></label>
                <input 
                    type={showPassword ? "text" : "password"} 
                    value={UserData.password} 
                    name="password" 
                    onChange={DataChange} 
                required
                placeholder="Password"/>
                <img 
                    src={showPassword ? showpass : dontshowpass } 
                    onClick={togglePasswordVisibility} 
                    alt="Toggle Password Visibility" 
                    width={20} 
                    height={20} 
                    style={{cursor: "pointer"}}
                    className="showpass"
                />
               
                {error && <p style={{color: "red"}}>Please Enter Valid Data</p>}
                <br />
                <button type="submit" >Log in</button>
            </form>  
            </div>     
        </div>
        
    );
}
