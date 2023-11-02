import { panelStore } from "../store/panelStore";
import { ClickWrapper } from "./clickWrapper";
import styled from "styled-components";
import closeicon from "../../public/assets//icons/closeicon.png"
import { useEffect, useState } from "react";
import { mouseStore } from "../store/mouseStore";
import { worldStore } from "../store/worldStore";
import { toastError, toastSuccess } from "../utils";

export default function WorldChoosePanel() {
    const { showWorld } = panelStore()
    const [inputvalue, setInputValue] = useState(0)

    useEffect(() => {
        if (showWorld) {
            mouseStore.setState({ coord: { x: 0, y: 0 }, frozen: true })
        } else {
            mouseStore.setState({ frozen: false })
        }
    }, [showWorld])

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        const v = parseInt(value)
        setInputValue(v)
    }

    const enterPublic = ()=>{
        worldStore.setState({map_id:9999})
        toastSuccess("Enter Public World!")
        panelStore.setState({showWorld:false})
    }

    const enterWorld = ()=>{
        if(inputvalue<=0 || inputvalue>8000){
            toastError("Wrong Realm ID")
            return
        }
        worldStore.setState({map_id:inputvalue})
        toastSuccess(`Enter Realm World #${inputvalue} !`)
        panelStore.setState({showWorld:false})
    }

    return (<ClickWrapper>
        {
            showWorld && <Container>
                <div style={{ width: 450, height: 330, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.8)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
                    <img src={closeicon} style={{ position: "absolute", right: 10, top: 10, cursor: "pointer" }} onClick={() => { panelStore.setState({ showWorld: false }) }} />
                    <div style={{ fontSize: 20, marginLeft: 160, marginTop: 25, color: "yellow" }}>Choose World</div>
                    <div style={{ marginLeft: 10, marginTop: 30 }}>
                        <div style={{ marginTop: 10 }}>
                            Public World <button onClick={()=>enterPublic()}>Enter</button>
                        </div>
                        <div style={{ marginTop: 10 }}>or</div>
                        <div style={{ marginTop: 10, }}>
                            Choose a Realm NFT ID :
                            <input style={{ marginLeft: 10, width: 50, marginRight: 30 }} type="number" value={inputvalue} onChange={inputChange} />
                            <button onClick={()=>enterWorld()}>Enter</button>
                        </div>

                        <div style={{ marginTop: 30, color: "gray", fontSize: 15, lineHeight: 1.6 }}>
                            <div>You can earn Power for the Realm NFT holders in their world.</div>
                            <div>Worlds are seperated.</div>
                            <div> In the future, there are wars between worlds.</div>
                        </div>
                    </div>
                </div>
            </Container>
        }
    </ClickWrapper>)
}


const Container = styled.div`
  position: absolute;
  top: 200px;
  left: 40%;
  color: white;

  @media (max-width: 768px) {
    top: 150px;
  }
`;
