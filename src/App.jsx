import React from "react";
import "./App.css";
import Row from "./Row";
import movies from "./movies";
import Banner from "./Banner";
import Footer from "./Footer";

function App() {
  return (
    <div className="App">
      <div className="appBody">
        <header className="App-header">
          <Banner />
        </header>
        <main>
          <Row key="1" name="Netflix Trending" url={movies.trending} />
          <Row key="2" name="Netflix Originals" url={movies.originals} />
          <Row key="3" name="Top Rated" url={movies.topRated} />
          <Row key="4" name="Action" url={movies.Action} />
          <Row key="5" name="Commedy" url={movies.Comedy} />
          <Row key="6" name="Horror" url={movies.Horror} />
          <Row key="7" name="Romantic" url={movies.Romance} />
          <Row key="8" name="Documentry" url={movies.Documentry} />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default App;
