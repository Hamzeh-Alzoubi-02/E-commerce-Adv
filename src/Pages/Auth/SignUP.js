import { useEffect, useRef, useState } from "react";
import showpass from "../../Components/IMG/eye.png";
import dontshowpass from "../../Components/IMG/hide.png";
import Dasgbord from "../DashBord/Dasgbord";
import Loding from "../../Animation/Loding";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
export default function SignUp() {
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
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    function DataChange(event) {
        setUserData({...UserData, [event.target.name]: event.target.value});
    }

   
   
  
   /* API SENT DATA */
   async function SUBMIT(event) {
    event.preventDefault();

    if (UserData.password === UserData.confirmPassword && UserData.password.length >= 5 && UserData.name !== "" && UserData.name.length >= 3 && UserData.email !== "") {
        setError(false);
        
        try {
            // تحقق من وجود البريد الإلكتروني أولاً
            const checkResponse = await fetch(`http://localhost:9000/users?email=${encodeURIComponent(UserData.email)}`);
            const existingUsers = await checkResponse.json();

            if (existingUsers.length > 0) {
                 toast.error('Email already exists', {
                     position: "top-center",
                     autoClose: 5000,
                     hideProgressBar: false,
                     closeOnClick: true,
                     pauseOnHover: true,
                     draggable: true,
                     progress: undefined,
                     theme: "light",
                 })
                return; // لا تستمر إذا كان البريد موجودًا
            }

            // إذا كان البريد غير موجود، أرسل البيانات
            const response = await fetch("http://localhost:9000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(UserData)
            });

            if (response.ok) {
                setLoading(true);
                const data = await response.json();
                console.log(data);

                toast.success('User created successfully', {
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
                    window.location.href = "/Home"; // إعادة التوجيه بعد 1000 مللي ثانية
                }, 5000);
            } else {
                alert("Error creating user: " + response.statusText);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error('Error creating user', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
        }
    } else {
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
            <label><p>Name</p></label>
                <input 
                    type="text" 
                    value={UserData.name} 
                    name="name" 
                    onChange={DataChange} 
                    required
                    ref={focus}
                    placeholder="Name"
                   
                />
                {error && UserData.name.length < 3 && UserData.name !== "" && <p style={{color: "red"}}>Name must be at least 3 characters</p>}
                <label><p>Email</p></label>
                <input 
                    type="email" 
                    value={UserData.email} 
                    name="email" 
                    onChange={DataChange} 
                required
                placeholder="Email"/>
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
                {error && UserData.password.length < 5 && UserData.password !== "" && <p style={{color: "red"}}>Password must be at least 5 characters</p>}
                <label><p>Confirm Password</p></label>
                <input 
                    type={showPassword ? "text" : "password"}
                    value={UserData.confirmPassword} 
                    name="confirmPassword" 
                    onChange={DataChange} 
                required
                placeholder="Confirm Password"/>
                {error && <p style={{color: "red"}}>Passwords do not match</p>}
                <br />
                <button type="submit" >Sign Up</button>
            </form>  
            </div>     
        </div>
        
    );
}
