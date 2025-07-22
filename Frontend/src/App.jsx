import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Components/Layout';
import GetMyResources from './Components/GetMyResources';
import CreateResource from './Components/CreateResource';
import GetAllResources from './Components/GetAllResources';
import GetAResource from './Components/GetAResource';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import UpdateMyResource from './Components/UpdateMyResource';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="/getAllResources" element={<GetAllResources />} />
          <Route path="/getMyResources" element={<GetMyResources />} />
          <Route path="/createResource" element={<CreateResource />} />
          <Route path="/resource/:id" element={<GetAResource />} />
          <Route path="/update-resource/:id" element={<UpdateMyResource />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App;