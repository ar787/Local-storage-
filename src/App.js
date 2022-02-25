import React, { useEffect, useState } from 'react'
import { Switch, useLocation } from 'react-router-dom'
import { PublicRoute, PrivateRoute } from './routes/routesType'
// import { TransitionGroup, CSSTransition } from 'react-transition-group'
import SignUp from './components/views/sign-up/signUp'
import SignIn from './components/views/sign-in/siginIn'
import DashBoard from './components/views/dash-board/DashBoard'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase-config/firebase-config'
import LoadingPage from './components/elements/loading-page/loadingPage'

import './App.css'

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
        <PrivateRoute exact path='/dashboard/:id' component={DashBoard} isAuthenticated={isAuthenticated} />
        <PublicRoute path='/registration' component={SignUp} isAuthenticated={isAuthenticated} />
        <PublicRoute path='/login' component={SignIn} isAuthenticated={isAuthenticated} />
      </Switch>

    )
  );
}

export default App;
