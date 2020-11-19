import './App.css';
import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Nav from './nav/nav.jsx';
import Courses from './courses/courses.jsx';
import Details from './courses/courseDetails/details';
import NavInside from './nav/navInside/navInside';
import DragDrop1 from './modules/dragdrop1/dragdrop1';
import DragDrop2 from './modules/dragdrop2/dragdrop2';
import Hover from './modules/hover/hover';
import Overview from './modules/overview/overview';
import Type from './modules/type/type';
import WordRain from './modules/wordRain/wordRain';
import Transition from './modules/transition/transition';
import Slider from './modules/slider/slider';
import Quiz from './modules/quiz/quiz';
import Video from './modules/video/video';
import CreateCourse from './courses/createCourse/createCourse';
import InputDragDrop1 from './modules/dragdrop1/forInput/dragdrop1.input';
import CourseMedium from './courses/createCourse/medium/course.medium';


const App = () => {
  const [openedCourse, setOpenedCourse] = useState({})

  return (
    <div className="App">
      <Route 
        exact path="/"
        render = {
          props => {
            return (
              <>
                <Nav {...props}/>
                <Courses {...props} setOpenedCourse={setOpenedCourse}/>
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
                <Details {...props} openedCourse={openedCourse} />
              </>
            )
          }
        }
      />
      <Route 
        exact path="/course/:courseID"
        render = {
          props => {
            return (
              <>
                <CreateCourse {...props} />
              </>
            )
          }
        }
      />
      <Route 
        exact path="/medium"
        render = {
          props => {
            return (
              <>
                <CourseMedium {...props} />
              </>
            )
          }
        }
      />
       <Route 
        exact path="/modules"
        render = {
          props => {
            return (
              <>
                <Overview {...props} />
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
        exact path="/input/dragdrop/1"
        render = {
          props => {
            return (
              <>
                <InputDragDrop1 {...props} />
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
       <Route 
        exact path="/hover"
        render = {
          props => {
            return (
              <>
                <Hover {...props} />
              </>
            )
          }
        }
      />
      <Route 
        exact path="/type"
        render = {
          props => {
            return (
              <>
                <Type {...props} />
              </>
            )
          }
        }
      />
      <Route 
        exact path="/rain"
        render = {
          props => {
            return (
              <>
                <WordRain {...props} />
              </>
            )
          }
        }
      />
      <Route 
        exact path="/transition"
        render = {
          props => {
            return (
              <>
                <Transition {...props} />
              </>
            )
          }
        }
      />
      <Route 
        exact path="/slider"
        render = {
          props => {
            return (
              <>
                <Slider {...props} />
              </>
            )
          }
        }
      />
      <Route 
        exact path="/quiz"
        render = {
          props => {
            return (
              <>
                <Quiz {...props} />
              </>
            )
          }
        }
      />
      <Route 
        exact path="/video"
        render = {
          props => {
            return (
              <>
                <Video {...props} />
              </>
            )
          }
        }
      />
    </div>
  );
}

export default App;
