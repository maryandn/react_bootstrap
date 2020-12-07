import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import TopBar from "./component/topbar/topBar";
import Routes from './routes'

// import Test from './shared/test'

function App() {
  return (
    <div>
      <TopBar/>
      <Routes/>
    </div>
  );
}

export default App;
