import React, { Component } from 'react'
import HomeRouting from './HomeRouting'
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

 class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        console.log(props);
       // debugger;
    }
    render() {
        return (
            <div>
                <Header/>				
				<Sidebar/>
                <HomeRouting/>
            </div>
        )
    }
}

export default Home;
