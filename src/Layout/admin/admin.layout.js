import React, {useContext, useEffect, useState} from "react";
import GlobalContext from "../../store/context.store.js";
import {Navigate, Outlet, Route, useLocation, useNavigate} from "react-router-dom";

import actionsStore from "../../store/actions.store.js";
import LoadingScreen from "../../components/loading.component";
import MainLayout from "./main.layout";
import {appRoutes} from "../../helpers/routes.helper";
import {useQuery} from "@apollo/client";
import {GET_ME} from "../../graphql/queries.graphql";

export const LoadContent = () => appRoutes.map((routes, index) => {
    if (routes.layout === "admin") {
        if (routes.isIndex) {
            return <Route key={index} index element={React.createElement(routes.component)} exact/>
        }
        return (
            <Route
                key={index}
                path={`${routes.path}`}
                element={React.createElement(routes.component)}
                exact
            />
        );
    }
})

const RequireAuth = ({children}) => {
    const {state} = useContext(GlobalContext);
    const location = useLocation();
    console.log(state)

    if (!state.user) {
        return (
            <Navigate
                to={{pathname: "/login"}}
                state={{from: location}}
                replace
            />
        );
    }

    return <>{children}</>
};

export default function AppLayout() {
    const {dispatch} = useContext(GlobalContext);
    const [loading, setLoading] = useState(true);
    const hist = useNavigate()
    const { error } = useQuery(GET_ME, {
        onCompleted: (data) => {
            console.log(data)
            if (data) {
                dispatch({
                    type: actionsStore.SET_LOGGED_USER,
                    payload: data.Me
                })
            }
        },
        onError: (err) => {
            console.log("error is: ", error)
            dispatch({
                type: actionsStore.SET_INITIAL_STATE,
            })
            setLoading(false)
            hist("/login")
        }
    });

    if (loading === false) {
        return <RequireAuth>
            <MainLayout className={"container-fluid"}>
                <Outlet/>
            </MainLayout>
        </RequireAuth>
    }
    return <LoadingScreen verifyOff={() => setLoading(false)}/>
}