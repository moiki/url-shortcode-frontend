import {useReducer} from "react";
import GlobalContext, {initialState} from "./store/context.store";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import reducer from "./store/reducer.store.js";
import SignIn from "./Layout/auth/login.auth";
import {ApolloProvider} from "@apollo/client";
import GraphQLClient from "./graphql/client.graphql";
import AppLayout, {LoadContent} from "./Layout/admin/admin.layout";
import {SnackbarProvider} from "notistack";
import ErrorBoundary from "./components/errorBoundary.component";

function init(state) {
  return state
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
      <ErrorBoundary>
          <GlobalContext.Provider value={{
              state: state,
              dispatch: dispatch,
          }}>
              <ApolloProvider client={GraphQLClient}>
                  <SnackbarProvider>
                      <BrowserRouter>
                          <Routes>
                              <Route path="login" element={<SignIn/>}/>
                              <Route path={"admin"} element={<AppLayout/>}>
                                  {LoadContent()}
                              </Route>
                              <Route
                                  path="*"
                                  element={<Navigate to="/admin" replace />}
                              />
                          </Routes>
                      </BrowserRouter>
                  </SnackbarProvider>
              </ApolloProvider>
          </GlobalContext.Provider>
      </ErrorBoundary>


  )
}

export default App