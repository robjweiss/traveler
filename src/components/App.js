import React from "react";
import Search from "./Search";
import Tweets from "./Tweets";

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
          <p>Enter an origin and a desination to find the cheapest flights</p>
        </div>
      </div>

      <Search/>
      <Tweets/>

      <div className="container">
      </div>
    </main>
  </div>
  );
}
