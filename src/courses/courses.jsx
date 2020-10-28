import React from 'react';
import './courses.scss';
import Course from './course/course.jsx';


export default class Courses extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            courses: [
                {
                    id: 1,
                    banner: "https://res.cloudinary.com/dfulxq7so/image/upload/v1603819869/Cover_ManageUB-Training-Deck-1_yaamsg.png",
                    name: "Managing bias",
                    created_at: "Oct 1",
                    duration_minute: 20,
                    stars: 4.1
                },
                {
                    id: 2,
                    banner: "https://res.cloudinary.com/dfulxq7so/image/upload/v1603838415/What-is-perspective-taking-basics-and-benefits-980x653_welev3.jpg",
                    name: "Perspective",
                    created_at: "Oct 3",
                    duration_minute: 25,
                    stars: 4.5
                },
                {
                    id: 3,
                    banner: "https://www.filepicker.io/api/file/wMtqZC1ZSBWa4km5trGJ",
                    name: "Data Privacy",
                    created_at: "Oct 5",
                    duration_minute: 30,
                    stars: 2
                },
                {
                    id: 4,
                    banner: "https://powersresourcecenter.com/wp-content/uploads/2019/10/Why-Leadership-Training-is-Important-3.jpg",
                    name: "Leadership",
                    created_at: "Oct 7",
                    duration_minute: 37,
                    stars: 3.1
                },
                {
                    id: 5,
                    banner: "https://images.theconversation.com/files/124492/original/image-20160530-7687-9f3jwh.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip",
                    name: "Science communication",
                    created_at: "Oct 10",
                    duration_minute: 31,
                    stars: 2.1
                },
                {
                    id: 6,
                    banner: "https://centaur-wp.s3.eu-central-1.amazonaws.com/marketingweek/prod/content/uploads/2018/09/17140058/lightbulb-inspire-1240.jpg",
                    name: "Creativity",
                    created_at: "Oct 9",
                    duration_minute: 15,
                    stars: 2.5
                },
                {
                    id: 7,
                    banner: "https://i.pinimg.com/originals/95/82/cd/9582cdbb02d67526fbef1845b5f39be7.jpg",
                    name: "Empathy",
                    created_at: "Oct 9",
                    duration_minute: 15,
                    stars: 4.1
                },
                {
                    id: 8,
                    banner: "https://digitaldefynd.com/wp-content/uploads/2020/01/Best-julia-course-tutorial-class-certification-training-online.jpg",
                    name: "Programming",
                    created_at: "Oct 9",
                    duration_minute: 15,
                    stars: 4.1
                },
                {
                    id: 9,
                    banner: "https://industriallogic.com/img/illustration/training_collaboration_large.png",
                    name: "Collaboration",
                    created_at: "Oct 9",
                    duration_minute: 15,
                    stars: 4.1
                },
                {
                    id: 10,
                    banner: "https://i2.wp.com/shortways.com/wp-content/uploads/2017/02/formation-outils-digitaux.jpg?resize=690%2C654&ssl=1",
                    name: "Human-centered Design",
                    created_at: "Oct 9",
                    duration_minute: 15,
                    stars: 4.1
                },
                {
                    id: 11,
                    banner: "https://captaintime.com/wp-content/uploads/2015/11/work-life-balance.jpg",
                    name: "Work life Balance",
                    created_at: "Oct 9",
                    duration_minute: 15,
                    stars: 4.1
                },
                {
                    id: 12,
                    banner: "https://hbr.org/resources/images/article_assets/2015/04/APR15_22_timemanagement-383x215.jpg",
                    name: "Time Management",
                    created_at: "Oct 9",
                    duration_minute: 15,
                    stars: 4.1
                },
            ]
        }
    }

    render(){

        const { courses } = this.state;

        return (
            <div className="container">
                <div className="courses">
                    {courses.length > 0
                    ? courses.map(course => 
                        <Course 
                            key={course.id} 
                            course={course} 
                            history={this.props.history}
                        />)
                    : null} 
                </div>
            </div>
        )
    }
}