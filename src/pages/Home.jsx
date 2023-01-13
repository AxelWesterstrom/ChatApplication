import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "../components/LoginForm.jsx";

function Home() {
  return (
    <div className="App">
      <LoginForm />
    </div>
  );
}

export default Home;
