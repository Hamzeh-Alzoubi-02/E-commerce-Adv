import { useState } from "react";
 import dontshow from "../../Components/IMG/photo-camera-958x575.png";
import next from "../../Components/IMG/next.png";
import pr from "../../Components/IMG/Product+Showcase-1.jpg";
export default function FlipImg() {
    const [flip, setFlip] = useState(false);
    function flipImg() {
        setFlip(!flip);

        if (flip===true) {
            
        }

    }
    return (
        <div>
            <div  onClick={ flipImg } className="flip" >  
            <img src={next} alt="img" width={40} height={40} style={{cursor: "pointer", position: "relative", top: "-200px", right: "150px",  transform:"scaleX(-1)"}}/>
                 <img 
                    src={ flip ? pr: dontshow } 
                    
                    alt="img" 
                    width={400} 
                    height={400} 
                    style={{cursor: "pointer"}}
                    
                />  <img src={next} alt="img" width={40} height={40} style={{cursor: "pointer", position: "relative", top: "-200px", left: "150px"}}/>  </div>
        </div>
    );
}