import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import ApplicationForm from './pages/ApplicationForm';
import Login from './admin/Login';
import MainPanel from './admin/MainPanel';
import ApplicationDetail from './admin/ApplicationDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/detail' element={<Details />} />
        <Route path='/apply/:jobId' element={<ApplicationForm />} />
        <Route path='/admin' element={<Login />} />
        <Route path='/admin/panel' element={<MainPanel />} />
        <Route path='/admin/panel/application-detail' element={<ApplicationDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
