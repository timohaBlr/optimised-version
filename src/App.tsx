import React from 'react';
import './App.css';
import {DrawerAppBar} from "./components/Header/Header";
import {InputWithIcon} from "./components/InputWithIcon/InputWithIcon";
import {Outlet} from "react-router-dom";
import {PaginationPages, TablePaginationComponent} from "./components/PaginationLink";


function App() {
    console.log('app rendered')


    return (
        <div className="App">
            <DrawerAppBar/>
            <InputWithIcon/>
            <Outlet/>
            < PaginationPages/>
            <TablePaginationComponent/>
        </div>
    );
}

export default App;
