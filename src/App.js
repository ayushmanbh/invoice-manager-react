import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Dashboard from './components/Dashboard';
import AddInvoice from './components/AddInvoice';
import EditInvoice from './components/EditInvoice';

import './App.css'

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className="container">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/add' component={AddInvoice} />
            <Route exact path='/edit/:id' component={EditInvoice} />
            <Route exact path='*' component={NotFound} />
          </Switch>
        </main>
      </Router>
    </>
  )
}

export default App

