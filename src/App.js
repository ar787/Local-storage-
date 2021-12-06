import React, { useEffect, useState } from 'react';
import './App.css';
import {
  Switch,
  useLocation,
  // Link
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import SignUp from './components/views/sign-up/signUp';
import SignIn from './components/views/sign-in/siginIn';
import DashBoard from './components/views/dash-board/DashBoard';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config/firebase-config'
import { PublicRoute, PrivateRoute } from './routes/routesType';
import LoadingPage from './components/elements/loading-page/loadingPage';

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  // let isAuthenticated = null
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setAuthenticated(true)
        setLoading(false)
        // isAuthenticated = user.getIdToken()
      } else {
        setAuthenticated(false)
        setLoading(false)
        // isAuthenticated = null
      }
    })
  }, [])
  return (


    loading ? <LoadingPage /> : (
      // <Router>
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          classNames="fade"
          timeout={300}
        >
          <Switch location={location}>
            <PrivateRoute exact path='/' component={DashBoard} isAuthenticated={isAuthenticated} />
            <PublicRoute path='/registration' component={SignUp} isAuthenticated={isAuthenticated} />
            <PublicRoute path='/login' component={SignIn} isAuthenticated={isAuthenticated} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      // </Router >
    )
  );
}

export default App;
