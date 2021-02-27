import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import {TokenContextProvider} from "./context/TokenContext";
import { Routes } from './components/Routes';
import {GenerateToken} from "./components/GenerateToken";
import {ListTokens} from "./components/ListTokens";

function App() {
    return (
        <TokenContextProvider>
            <Routes/>
            <main>
                <Switch>
                    <Route path={`/:clientName/generate-token`} name="generateToken"  component={GenerateToken} />
                    <Route path={`/:clientName/list-tokens`} name="listTokens" component={ListTokens} />
                    <Redirect to={'/:clientName/generate-token'} />
                </Switch>
            </main>
        </TokenContextProvider>
    );
}

export default App;
