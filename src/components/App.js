import React from "react";
import Search from "./Search";

export default function App() {
  return (
    <div>
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a className="navbar-brand" href="#">
        Traveler
      </a>
    </nav>

    <main role="main">
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-3">Go anywhere</h1>
          <p>Enter an origin and a desination</p>
        </div>
      </div>

      <Search/>

      <div className="container">
      </div>
    </main>
  </div>
  );
}
