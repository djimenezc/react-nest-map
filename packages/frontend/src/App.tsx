import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import styled from 'styled-components';
import './App.css';
import Card from './Card';
import {http} from "./util";
import Devices from './Devices';

const Wrapper = styled.div`
  background-color: #FFF480;
  color: #FF5757;
  font-family: "Nunito Sans",-apple-system,".SFNSText-Regular","San Francisco",BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif;
  height: 100vh;
`;

const Container = styled.div`
  background-color: #FFF480;
  color: #FF5757;
  font-family: "Nunito Sans",-apple-system,".SFNSText-Regular","San Francisco",BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif;
  margin: 0 auto;
  width: 48rem;
`;

const Header = styled.header`
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const Menu = styled.ul`
list-style-type: none;
line-height: 1.6;
margin: 0 auto 1rem;
list-style-position: outside;
color: #FF5757;
> li {
  display: table-cell;
  padding: 0.4rem 0.6rem;
}
`;

const Logo = styled.img`
  height: 40vmin;
  pointer-events: none;

  @media (prefers-reduced-motion: no-preference) {
    animation: App-logo-spin infinite 20s linear;
  }
`;

const url = 'http://localhost:3000/api/devices/list';

const App: React.FC = () => {

        const [devices, setDevices] = useState([]);

        useEffect(() => {
            // Create an scoped async function in the hook
            async function fetchDevices() {
                console.log('retrieving points');
                const devicesResp = await http(url);
                console.log('devices received', devicesResp);

                setDevices(devicesResp);
            }

            fetchDevices();
        }, []);

        return (
            <Wrapper>
                <Container>
                    <Header>
                        <Logo src={logo} alt="logo"/>
                        <Menu>
                            <li>Home</li>
                            <li>About</li>
                            <li>Contact</li>
                        </Menu>
                    </Header>
                    <Card>
                        <p>
                            Edit <code>src/App.tsx</code> and save to reload.
                        </p>
                    </Card>
                    <Devices devices={devices}/>
                </Container>
            </Wrapper>
        );
    }
;

export default App;
