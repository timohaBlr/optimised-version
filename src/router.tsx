import {createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import {Route} from "react-router";
import App from "./App";
import ErrorPage from "./ErrorPage/ErrorPage";
import {BasicTable} from "./components/BasicTable/BasicTable";
import React from "react";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={'/'}
               element={<App/>}
               errorElement={<ErrorPage/>
        }>
            <Route errorElement={<ErrorPage/>
            }>
                <Route path={'/?'}
                       element={<BasicTable/>
                }/>
            </Route>
        </Route>
    )
)
