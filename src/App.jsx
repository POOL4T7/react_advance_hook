import "./App.css";
import Header from "./components/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
// import Document, { Html, Head, Main, NextScript } from 'next/document';
// import { CssBaseline } from '@nextui-org/react';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
