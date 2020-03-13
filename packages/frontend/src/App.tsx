import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {Redirect} from 'react-router';

import {http} from "./util";
import Devices from './Devices';
import About from './About';
import Map from './Map';
import Toolbar from "./Toolbar";

const Wrapper = styled.div`
  height: 100vh;
`;

const Container = styled.div`
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  font-size: calc(10px + 2vmin);
  color: #7c795d;
`;

const Menu = styled.ul`
    display: flex;
    width: 50%;
    justify-content: space-between;    
    list-style-type: none;
    line-height: 1.6;
    margin: 0 auto 1rem;
    list-style-position: outside;
    > li {
      display: table-cell;
      padding: 0.4rem 0.6rem;
    }
`;

// const Logo = styled.img`
//   height: 40vmin;
//   pointer-events: none;
//
//   @media (prefers-reduced-motion: no-preference) {
//     animation: App-logo-spin infinite 20s linear;
//   }
// `;

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
            <Router>
                <Wrapper>
                    <Container>
                        <Header>
                            <Toolbar />

                        </Header>
                    </Container>
                    <Switch>
                        <Route path="/about">
                            <About/>
                        </Route>
                        <Route path="/devices">
                            <Devices devices={devices}/>
                        </Route>
                        <Route path="/map">
                            <Map devices={devices}/>
                        </Route>
                        <Route path="/">
                            <Redirect push to={{pathname: '/map'}} />
                        </Route>
                    </Switch>
                </Wrapper>
            </Router>
        );
    }
;

export default App;
