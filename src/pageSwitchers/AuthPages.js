import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// import Home from '../authPages/Home';
import About from '../authPages/About';
import Contact from '../authPages/Contact';
import Features from '../authPages/Features';
import Login from '../authPages/Login';
import SignUp from '../authPages/SignUp';
import ChangePassword from '../authPages/ChangePassword';
import ResetPassword from '../authPages/ResetPassword';
import Error from '../authPages/Error';

import ScrollToTop from '../helpers/ScrollToTop';

import AuthHeader from '../components/AuthHeader';
import Footer from '../components/Footer';

const mainPageRedirectionUrls = [
  '/billing',
  '/cost-tracker',
  '/cost-tracker/add-bills',
  '/cost-tracker/add-equipment',
  '/messages',
  '/parameters/last-reading',
  '/parameters/power-demand',
  '/parameters/power-quality',
  '/parameters/energy-consumption',
  '/report',
  '/score-card',
  '/client-profile',
  '/password',
  '/alerts-and-alarms',
  '/branches',
  '/branches/user-form',
];

const mainPageRedirections = mainPageRedirectionUrls.map((eachUrl) => (
  <Route exact key={eachUrl} path={eachUrl}>
    <Redirect to='/' />
  </Route>
));

function authPages() {
  return (
    <div>
      <AuthHeader />

      <main className='auth-container'>
        <ScrollToTop>
          <Switch>
            <Route exact path='/' component={Login} />
            {mainPageRedirections}
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

export default authPages;
