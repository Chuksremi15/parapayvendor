import React from "react";
import Pages from "./pages";
import { BrowserRouter as Router } from "react-router-dom";
import { IconContext } from "react-icons";

const App: React.FC = (): JSX.Element => {
  return (
    <IconContext.Provider value={{ className: "global-class-name" }}>
      <Router>
        <Pages />
      </Router>
    </IconContext.Provider>
  );
};
export default App;
