import styled from 'styled-components';
import { ClickWrapper } from './clickWrapper';

export default function UpgradePanel() {
    return (
        <ClickWrapper>
            {
                <Container>
                    <div style={{ width: 440, height: 310, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.7)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
                        <div style={{ marginLeft: 170, fontSize: 20, marginTop: 10 }}>Upgrade</div>

                        <div style={{ overflow: "auto", width: 600, maxHeight: 300, lineHeight: 1, padding: 10, borderRadius: 15, paddingTop: 1 }}>

                        </div>

                    </div>

                </Container>
            }
        </ClickWrapper>)

}


const Container = styled.div`
    position: absolute;
    top: 20%;
    left: 30%;
    color:white;
`;
