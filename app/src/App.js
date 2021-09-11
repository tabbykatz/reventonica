import * as React from "react";

import "./index.css";

import Events from "./Events";
import Header from "./Header";
import Users from "./Users";

const App = () => (
  <main>
    <Home />
  </main>
);

const Home = () => (
  <>
    <Header />
    <Users className="users" />
    <Events className="events" />
  </>
);

export default App;
