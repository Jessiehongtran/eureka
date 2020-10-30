import './App.css';
import Nav from './nav/nav.jsx';
import Courses from './courses/courses.jsx';
import Details from './courses/courseDetails/details';
import NavInside from './nav/navInside/navInside';
import DragDrop1 from './modules/dragdrop1/dragdrop1';
import DragDrop2 from './modules/dragdrop2/dragdrop2';
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
                <Details {...props} />
              </>
            )
          }
        }
      />
      <Route 
        exact path="/dragdrop/1"
        render = {
          props => {
            return (
              <>
                <DragDrop1 {...props} />
              </>
            )
          }
        }
      />
       <Route 
        exact path="/dragdrop/2"
        render = {
          props => {
            return (
              <>
                <DragDrop2 {...props} />
              </>
            )
          }
        }
      />
    </div>
  );
}

export default App;
