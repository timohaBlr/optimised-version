import React from 'react';
import './App.css';
import {DrawerAppBar} from "./components/Header/Header";
import {InputWithIcon} from "./components/InputWithIcon/InputWithIcon";
import {Outlet} from "react-router-dom";
import {PaginationPages} from "./components/PaginationLink";
import {TransitionsModal} from "./components/Modal";


function App() {
    console.log('app rendered')


    return (
        <div className="App">
            <DrawerAppBar/>
            <InputWithIcon/>
            <Outlet/>
            <TransitionsModal/>
            < PaginationPages/>
        </div>
    );
}

export default App;
