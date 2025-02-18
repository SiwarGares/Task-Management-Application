import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Task/Home';
import ProtectedRoute from './components/protectedRoute';

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Task from "./pages/task";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { saveProfile } from "./redux/actions/authActions";
import NotFound from "./pages/notFound";


function App() {

    const authState = useSelector(state => state.authReducer);
    const dispatch = useDispatch();
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) return;
      dispatch(saveProfile(token));
    }, [authState.isLoggedIn, dispatch]);
  
  
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={authState.isLoggedIn ? <Navigate to="/" /> : <Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tasks/add" element={authState.isLoggedIn ? <Task /> : <Navigate to="/login" state={{ redirectUrl: "/tasks/add" }} />} />
            <Route path="/tasks/:taskId" element={authState.isLoggedIn ? <Task /> : <Navigate to="/login" state={{ redirectUrl: window.location.pathname }} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
  
  export default App;



/* const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App; */