import React from 'react';

export default class Editor extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        console.log('props in Editor', this.props)
        return (
            <>
                {this.props.component}
            </>
        )
    }
}