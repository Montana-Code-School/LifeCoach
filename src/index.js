import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import App from './components/App';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { render } from 'react-dom';
import Home from './components/Home';
import LifeGoals from './components/LifeGoals';
import Navigation from './components/Navigation';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { Provider } from 'mobx-react';
import Wheel from './components/Wheel';
import About from './components/About';
import UserStore from './stores/UserStore';
import WheelStore from './stores/WheelStore';
import History from './components/History';
import EnsureLoggedInContainer from './components/EnsureLoggedInContainer';
import EntryPage from './components/EntryPage';
const wheelStore = new WheelStore();
const userStore = new UserStore();

render((
  <Provider wheelStore={wheelStore} userStore={userStore}>
    <Router history={browserHistory}>
    <Route path="/entrypage" component={EntryPage}/>
      <Route component={EnsureLoggedInContainer}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="/wheel" component={Wheel}/>
          <Route path="/lifegoals" component={LifeGoals}/>
          <Route path="/history" component={History}/>
        </Route>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
