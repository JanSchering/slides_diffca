import React, { useState, useEffect } from 'react';


export default ({ children }) => {
    const [color, setColor] = useState(0)

    useEffect(() => {
        // Update the document title using the browser API
        console.log("test")
        const interval = setInterval(() => {
            console.log("aaaa")
            setColor((c) => {
                console.log(c)
                return (c === "#000" ? "#fff" : "#000")
            });
        }, 1000);
      }, []);

    return (
    <div
        style={{
        textAlign: 'center',
        
        }}>
        <div class="cell" style={{
            width: 10,
            height: 10,
            top: 0,
            left: 0,
            backgroundColor: color,
            position: "absolute"
        }}></div>
        {children}
    </div>
    )
}