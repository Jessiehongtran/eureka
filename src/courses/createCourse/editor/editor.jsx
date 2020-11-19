import React from 'react';

export default class Editor extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }


    componentDidMount(){
        console.log('editor component is mounted')
    }

    render(){
        console.log('editor is rendered')

        return (
            <>
                {this.props.component}
            </>
        )
    }
}