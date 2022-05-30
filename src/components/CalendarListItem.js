import React from 'react';

export default class CalendarListItem extends React.Component {
    removeItem = () => {
        this.props.remove(this.props.meeting.id);
    }
    
    render() {
        const {firstName, lastName, email, date, time} = this.props.meeting;
        
        return (
            <tr>
                <td>{`${firstName} ${lastName}`}</td>
                <td>{email}</td>
                <td>{date}</td>
                <td>{time}</td>
                <td>
                    <button className='removeButton' onClick={this.removeItem}>x</button>
                </td>
            </tr>
        )    
    }   
}