import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Billing from './pages/Billing';
import CostTracker from './pages/CostTracker';
import Dashboard from './pages/Dashboard';
import Messages from './pages/Messages';
import Parameters from './pages/Parameters';
import Report from './pages/Report';
import ScoreCard from './pages/ScoreCard';
import Error from './pages/Error';

import ScrollToTop from './helpers/ScrollToTop';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';

function App() {
  return (
    <div className='App'>
      <Header />

      <div className='sidebar-and-content'>
        <Sidebar />

        <main className='main-container'>
          <TopBar />

          <ScrollToTop>
            <div className='page-content'>
              <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route path='/billing' component={Billing} />
                <Route path='/cost-tracker' component={CostTracker} />
                <Route path='/messages' component={Messages} />
                <Route path='/parameters' component={Parameters} />
                <Route path='/report' component={Report} />
                <Route path='/score-card' component={ScoreCard} />
                <Route component={Error} />
              </Switch>
            </div>
          </ScrollToTop>
        </main>
      </div>
    </div>
  );
}

export default App;
