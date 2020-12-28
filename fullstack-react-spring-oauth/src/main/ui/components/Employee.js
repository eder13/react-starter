import React, { Component } from 'react';

class Employee extends Component{
    render() {
        return (
            <tr>
                <td>{this.props.employee.firstName}</td>
                <td>{this.props.employee.lastName}</td>
                <td>{this.props.employee.description}</td>
                <td><button id={this.props.url} onClick={this.props.removeEntry}>x</button></td>
            </tr>
        )
    }
}

export default Employee;