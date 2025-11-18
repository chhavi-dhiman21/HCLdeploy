import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import './App.css'; // For the 'fade' transition styles

import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';


const AnimatedRoutes = ({ isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation();
  const nodeRef = React.useRef(null);

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={location.pathname}
        nodeRef={nodeRef}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div ref={nodeRef} className="page flex justify-center items-center flex-grow">
          <Routes location={location}>
            {/* Login Route */}
            <Route 
              path="/login" 
              element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} 
            />

            {/* Dashboard Route: PROTECTED */}
            <Route 
              path="/dashboard" 
              element={
                // If logged in, show Dashboard. Otherwise, redirect to /login.
                isLoggedIn ? (
                  <Dashboard setIsLoggedIn={setIsLoggedIn} />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />

            {/* Default/Catch-all Route */}
            <Route 
              path="*" 
              element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} 
            />
          </Routes>
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
};

// --- 3. Main App Component ---

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="p-4 bg-gray-800 text-white">
          <h1 className="text-xl font-light">My App ({isLoggedIn ? 'Logged In' : 'Logged Out'})</h1>
        </header>

        <main className="flex grow">
          <AnimatedRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;