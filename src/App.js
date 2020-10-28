import './App.css';
import Nav from './nav/nav.jsx';
import Courses from './courses/courses.jsx';
import Details from './courses/courseDetails/details';
import NavInside from './nav/navInside/navInside';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route 
        exact path="/"
        render = {
          props => {
            return (
              <>
                <Nav {...props}/>
                <Courses {...props}/>
              </>
            )
          }
        }
      />
      <Route 
        exact path="/details"
        render = {
          props => {
            return (
              <>
                <NavInside/>
                <Details {...props}/>
              </>
            )
          }
        }
      />
    </div>
  );
}

export default App;
