import React, { useEffect, useState } from 'react'
import { Switch, useLocation } from 'react-router-dom'
import { PublicRoute, PrivateRoute } from 'routes/routesType'
import SignUp from 'components/views/sign-up'
import SignIn from 'components/views/sign-in'
import DashBoard from 'components/views/dash-board'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'firebase-config'
import LoadingPage from 'components/elements/loading-page'

import './App.css'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setAuthenticated(true)
        setLoading(false)
      } else {
        setAuthenticated(false)
        setLoading(false)
      }
    })
    return unsubscribe
  }, [])

  return (
    loading ? <LoadingPage /> : (
      <Switch location={location}>
        <Route exact path='/' render={() => isAuthenticated ? <Redirect to='/dashboard/root' /> : <Redirect to='/login' />} />
        <PrivateRoute exact path='/dashboard/:id' component={DashBoard} isAuthenticated={isAuthenticated} />
        <PublicRoute path='/registration' component={SignUp} isAuthenticated={isAuthenticated} />
        <PublicRoute path='/login' component={SignIn} isAuthenticated={isAuthenticated} />
      </Switch>

    )
  );
}

export default App;
