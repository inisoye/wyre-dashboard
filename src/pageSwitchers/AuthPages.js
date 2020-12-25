import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import Home from '../AuthPages/Home';
import About from '../AuthPages/About';
import Contact from '../AuthPages/Contact';
import Features from '../AuthPages/Features';
import Login from '../AuthPages/Login';
import SignUp from '../AuthPages/SignUp';
import ChangePassword from '../AuthPages/ChangePassword';
import ResetPassword from '../AuthPages/ResetPassword';
import Error from '../AuthPages/Error';

import ScrollToTop from '../helpers/ScrollToTop';

import AuthHeader from '../components/AuthHeader';
import Footer from '../components/Footer';

function AuthPages() {
  return (
    <div>
      <AuthHeader />

      <main className='auth-container'>
        <ScrollToTop>
          <Switch>
            {/* <Route exact path='/' component={Home} /> */}
            <Route exact path='/' component={Login} />
            <Route path='/about' component={About} />
            <Route path='/contact' component={Contact} />
            <Route path='/features' component={Features} />
            <Route path='/log-in' component={Login} />
            <Route path='/sign-up' component={SignUp} />
            <Route path='/change-password' component={ChangePassword} />
            <Route path='/reset-password' component={ResetPassword} />
            <Route component={Error} />
          </Switch>
        </ScrollToTop>
      </main>

      <Footer />
    </div>
  );
}

export default AuthPages;
