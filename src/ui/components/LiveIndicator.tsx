import React, { useMemo, useState, useEffect } from 'react';
import { ticStore } from "../../store/ticStore";
import { json } from 'node:stream/consumers';

export default function LiveIndicator() {
    const [isLiving, setIsLiving] = useState(false);
    //TODO: check rpc
    const rpc_url = import.meta.env.VITE_PUBLIC_NODE_URL!;
    const torii_url = import.meta.env.VITE_PUBLIC_TORII!;

    const toriiHealthCheck = async () => {
        const query = {
            operationName: 'health',
            query: `query health {
                entities(offset:0, limit: 1 keys: ["*"]) {
                  total_count
                }
              }`
        };
        let response = await fetch('https://api.starknopoly.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        })
        
        try{
            let data = await response.json();
            console.log(data);
            return data["data"] != undefined;
        }
        catch(err){
            console.log(err);
            return false;
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            toriiHealthCheck()
                .then((health) => {
                    console.log(`checking torii service...${health? "Live": "Dead"}`);
                    setIsLiving(health);
                })
                .catch((error) => {
                    setIsLiving(false);
                });
        }, 60*1000); // 60 seconds

        return () => {
            clearInterval(intervalId);
        };
    }, [torii_url]);

    if (isLiving) {
        return <div className="live-circle"></div>
    }

    return <div className="error-circle"></div>
}