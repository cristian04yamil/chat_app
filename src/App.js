import "./App.css";
// import LoginForm from "./components/LoginForm/LoginForm";
import Home from "./components/Home/Home";
import React, { useState } from "react";

// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";

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
    // <Router>
    //   <Routes>
    //     <Route
    //       path="/"
    //       element={isLoggedIn ? <Home /> : <Navigate to="/" replace />}
    //     />
    //     <Route
    //       path="/login"
    //       element={<LoginForm handleLogin={handleLogin} />}
    //     />
    //     <Route
    //       path="/messages"
    //       element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
    //     />
    //   </Routes>
    // </Router>
  );
};

export default App;
