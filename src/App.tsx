import './App.css';

import { BrowserRouter as Router, Switch } from 'react-router-dom'

import Navbar from './layout/navbar/Navbar'
import Main from './layout/main/Main'
import Footer from './layout/footer/Footer'


function App() {
  return (
    <div className="app">
      <div className="app__wrapper">
        <Router>
          <Navbar />
          <Switch>
            <Main />
          </Switch>
        </Router>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
