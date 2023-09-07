import "./App.css";
import Home from "./components/Home/Home";
import React, { useState } from "react";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = (username, password) => {
    // Verificar las credenciales de inicio de sesión
    if (username === "test" && password === "test") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  return (
    <Home />
  );
};

export default App;
