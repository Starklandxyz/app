import React, { useState } from 'react';
import gifticon from "../../../public/assets//icons/gifticon.png"

export function AirdropClaimButton({ onClick = (_: any) => { } }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async (e: any) => {
        if(isLoading){return}
        setIsLoading(true);
        if (onClick) {
            try {
                await onClick(e);
            } catch (error) {
                console.error("Error in onClick handler:", error);
            }
        }
        setIsLoading(false);
    };

    return (
        <div style={{ color: "yellow", cursor: "pointer" }} onClick={handleClick}>
            <img src={gifticon} style={{ color: "green" }} /> {isLoading ? "Claim..." : "Claim"}
            </div>
        // <button onClick={handleClick} disabled={isLoading} style={style}>
        //   {isLoading ? "Claim..." : "Claim"}
        // </button>
    );
}
