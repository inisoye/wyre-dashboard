import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Billing from './pages/Billing';
import CostTracker from './pages/CostTracker';
import Dashboard from './pages/Dashboard';
import Messages from './pages/Messages';
import Report from './pages/Report';
import ScoreCard from './pages/ScoreCard';
import Error from './pages/Error';
import PowerQuality from './pages/PowerQuality';
import EnergyConsumption from './pages/EnergyConsumption';
import PowerDemand from './pages/PowerDemand';
import TimeOfUse from './pages/TimeOfUse';
import LastReading from './pages/LastReading';

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
                <Route
                  path='/parameters/last-reading'
                  component={LastReading}
                />
                <Route path='/parameters/time-of-use' component={TimeOfUse} />
                <Route
                  path='/parameters/power-demand'
                  component={PowerDemand}
                />
                <Route
                  path='/parameters/power-quality'
                  component={PowerQuality}
                />
                <Route
                  path='/parameters/energy-consumption'
                  component={EnergyConsumption}
                />
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
