import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import PostDetails from "./components/PostDetails/PostDetails";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import CreatorOrTag from "./components/CreatorOrTag/CreatorOrTag";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [toggleDark, settoggleDark] = useState(false);
  const myTheme = createMuiTheme({
    // Theme settings
    palette: {
      type: toggleDark ? "dark" : "light",
    },
  });
  // const theme = createMuiTheme({
  //   palette: {
  //     type: "dark",
  //   },
  // });

  return (
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar toggleDark={toggleDark} settoggleDark={settoggleDark} />
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/posts" />} />
            <Route path="/posts" exact component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route path="/posts/:id" exact component={PostDetails} />
            <Route
              path={["/creators/:name", "/tags/:name"]}
              component={CreatorOrTag}
            />
            <Route
              path="/auth"
              exact
              component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
            />
          </Switch>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;