import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
//import FirstPage from "./Components/FirstPage";
import Header from "./Components/Header";

import "./App.css";

const HomePageComponent = React.lazy(() =>
  import("./Components/Graph/FirstPage")
);
const Clipboard = React.lazy(() => import("./Components/Clipboard"));
const NotFound = React.lazy(() => import("./Components/NotFound"));

function App() {
  return (
    <div className="App">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={HomePageComponent} />
          <Route path="/clipboard" exact component={Clipboard} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
