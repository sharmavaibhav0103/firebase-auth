import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from '../../firebase';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            dp: ''
        }
    }
    componentDidMount() {
        auth.onAuthStateChanged(res => {
            if (res.displayName) {
                setTimeout(() => {
                    this.setState({
                        displayName: res.displayName,
                        email: res.email,
                        dp: res.photoURL
                    }, () => console.log(this.state))
                }, 1000)
            }
        })
    }
    handleClick = () => {
        auth.signOut().then(() => {
            this.props.history.push('/login');
        })
    }
    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <h2>{this.state.displayName}</h2>
                <h2>{this.state.email}</h2>
                <img src={this.state.dp} width='200' height='200' className='rounded' />
                <button onClick={this.handleClick}>Sign Out</button>
            </div>
        )
    }
}
export default withRouter(Dashboard);