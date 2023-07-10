import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { Navigate, useNavigate, Link, BrowserRouter, Routes, Route } from 'react-router-dom';

function Setting() {
    const navigate = useNavigate();

    useEffect(()=>{
        navigate('/setting/change')
    })
}

export default Setting;