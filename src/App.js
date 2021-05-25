import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import AppRouter from './component/route/RouterComponent';
import Banner from "./Maincomponent/Banner";
import Footer from "./Maincomponent/Footer";


function App() {
  return (
    <div className="App">
      
        <AppRouter/>
      
    </div>
  );
}

export default App;
