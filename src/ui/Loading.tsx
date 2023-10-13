import styled from "styled-components";
import { loadingStore } from "../store/loadingstore";
import { useEffect } from "react";
import bg from "../../public/bg.jpg"
import { ticStore } from "../store/ticStore";
export default function Loading() {
    const { progress } = loadingStore()


    useEffect(()=>{
        console.log("progress",progress);
    },[progress])

    return (
        <Container>
            {
                progress < 99 &&
                <>
                <img src={bg} width={300}/>
                <div style={{fontSize:22,marginTop:20}}>Loading game on chain...</div>
                </>
                 
            }
        </Container>
    )
}

const Container = styled.div`
    position: absolute;
    top: 30%;
    left: 40%;
    color: white;
`;