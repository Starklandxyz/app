import styled from "styled-components";

import packicon from "../../public/assets/icons/pack1.png"
import rankicon from "../../public/assets/icons/rank.png"
import marketicon from "../../public/assets/icons/market.png"
import { ClickWrapper } from "./clickWrapper";
import { controlStore } from "../store/controlStore";
import { toastInfo } from "../utils";

export default function BottomPanels() {
    return (<Container>
        <ClickWrapper>
        <div style={{display:"flex", width: 220, height: 50, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
            <div style={{marginTop:8,marginLeft:15,cursor:"pointer"}} onClick={()=>controlStore.setState({showLuckyPack:true})}>
                <img src={packicon} style={{ transform: "scale(2) translate(5px,0px)", imageRendering: "pixelated", backgroundColor: "" }} />
                <div style={{fontSize:14, marginTop:13}}>Packs</div>
            </div>
            <div style={{marginTop:8,marginLeft:20,cursor:"pointer"}} onClick={()=>controlStore.setState({showBoard:true})}>
                <img src={rankicon} style={{ transform: "scale(1.5) translate(3px,0px)", imageRendering: "pixelated", backgroundColor: "" }} />
                <div style={{fontSize:14, marginTop:8}}>Board</div>
            </div>
            <div style={{marginTop:8,marginLeft:20,cursor:"pointer"}} onClick={()=>toastInfo("Stay tuned")}>
                <img src={marketicon} style={{ transform: "scale(1.3) translate(3px,0px)", imageRendering: "pixelated", backgroundColor: "" }} />
                <div style={{fontSize:14, marginTop:2}}>Market</div>
            </div>
        </div>
        </ClickWrapper>
    </Container>)
}



const Container = styled.div`
    display:flex;
    position: absolute;
    bottom: 15%;
    right: 1%;
    color:white;
`;
