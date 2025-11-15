import { useState } from "react";


export const Counter=({count1,setCount1})=>{

    const[count,setCount]=useState(0);

    return(
        <>
        <h1>{count}</h1>
        <div className="card">
            <button onClick={() => {
                setCount(count + 1);
                setCount1(count1 - 1);
            } }>Increase</button>
            <button onClick={() => {
                setCount(count - 1);
                setCount1(count1 + 1);
            } }>Decrease</button>

        </div>
        
        </>
 
    )
}