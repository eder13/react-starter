import React, { Fragment } from 'react';
import Employee from './Employee';

const EmployeeList = (props) => {
    const { first, prev, next, last } = props.links;

    const employees = props.employees.map(employee =>
        <Employee key={employee._links.self.href} url={employee._links.self.href} employee={employee} removeEntry={props.removeEntry} />
    );

    return (
        <Fragment>
            <table>
                <tbody>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
                {employees}
                </tbody>
            </table>
            <div className='nav'>
                { first !== null ? <button id={first.href} onClick={props.updateTable}>&lt;&lt;</button> : <span>&lt;&lt;</span> } &nbsp;&nbsp;
                { prev !== null ? <button id={prev.href} onClick={props.updateTable}>&lt;</button> : <span>&lt;</span> } &nbsp;&nbsp;
                { next !== null ? <button id={next.href} onClick={props.updateTable}>&gt;</button> : <span>&gt;</span> } &nbsp;&nbsp;
                { last !== null ? <button id={last.href} onClick={props.updateTable}>&gt;&gt;</button> : <span>&gt;&gt;</span> } &nbsp;&nbsp;
            </div>
        </Fragment>
    );
}

export default EmployeeList;