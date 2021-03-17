import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
//import FirstPage from "./Components/FirstPage";
import Header from "./Components/Header";
import "./App.css";

const HomePageComponent = React.lazy(() =>
  import("./Components/Graph/FirstPage")
);

function App() {
  return (
    <div className="App">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={HomePageComponent} />
          <Route path="*" component={() => "404 Not found"} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
