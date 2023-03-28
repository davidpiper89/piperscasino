import React from "react";
import Interface from "./components/Interface";
import Container from "react-bootstrap/Container";
import "./App.css";

const App = () => {
  return (
    <>
      <Container
        fluid
        className="d-flex flex-column align-items-center mediaContainer"
   
      >
        <header>
          <h1>Piper's BlackJack</h1>
        </header>
        <Interface />
        <footer></footer>
      </Container>
    </>
  );
};

export default App;
