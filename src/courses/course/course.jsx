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

    render(){

        const { course } = this.props;
        const { rating } = this.state;

        return (
                <div className="course">
                <div className="image">
                        <img src={course.banner} />
                </div>
                <div className="info">
                    <div className="left">
                        <p className="name">{course.name}</p>
                        <div className="duration">
                            <FontAwesomeIcon
                                icon = {faClock}
                                className="clock"
                            />
                            <p className="min">{course.duration_minute} mins</p>
                        </div>
                    </div>
                    <div className="right">
                        <StarRatingComponent 
                            name="rate1" 
                            starCount={5}
                            value={rating}
                            onStarClick={this.onStarClick.bind(this)}
                        />
                    </div>
                </div>
                </div>
        )
    }
}