import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ProtectedLogin from "./ProtectedLogin";

const ProtectedRouting = ({ element }) => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')) || null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    useEffect(() => {
        try {
            const userDataFromStorage = (localStorage.getItem('userData'));
            const tokenFromStorage = localStorage.getItem('token');
            // console.log('userDataFromStorage:', userDataFromStorage);
            // console.log('tokenFromStorage:', tokenFromStorage);
            setUserData(userDataFromStorage);
            setToken(tokenFromStorage);
        } catch (error) {
            console.error('Error parsing user data or token:', error);
            // If there's an error parsing, clear the local storage
            localStorage.removeItem('userData');
            localStorage.removeItem('token');
        }
    }, []);
    
    // Check if user is authenticated
    const isAuthenticated = userData && token;

    // If user is authenticated, render the element, otherwise redirect to login
    return isAuthenticated ? element :<ProtectedLogin/> ;
};

export default ProtectedRouting;
