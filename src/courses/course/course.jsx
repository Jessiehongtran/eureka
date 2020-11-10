import React from 'react';
import './course.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import StarRatingComponent from 'react-star-rating-component';

export default class Course extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rating: props.course.stars
        }
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
      }

    openCourse(course){
        this.props.setOpenedCourse(course)
        this.props.history.push('/details')
    }

    render(){

        const { course} = this.props;
        const { rating } = this.state;

        return (
                <div className="course" onClick={() => this.openCourse(course)}>
                    <div className="course-wrapper">
                        <div className="image">
                                <img src={course.banner} />
                        </div>
                        <div className="info">
                            <div className="name-vote">
                                <p className="name">{course.name}</p>
                                <StarRatingComponent 
                                    name="rate1" 
                                    starCount={5}
                                    value={rating}
                                    className="rating"
                                    onStarClick={this.onStarClick.bind(this)}
                                />
                            </div>
                            <div className="duration">
                                <FontAwesomeIcon
                                    icon = {faClock}
                                    className="clock"
                                />
                                <p className="min">{course.duration_minute} mins</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
        )
    }
}