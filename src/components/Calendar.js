import React from 'react';
import CalendarList from './CalendarList';
import CalendarForm from './CalendarForm';
import CalendarListItem from './CalendarListItem';

export default class Calendar extends React.Component {
    state = {
        meetings:[]
    }

    url = 'http://localhost:3005/meetings/';

    addMeeting = (meeting) => {
        fetch(this.url, {
                method: "POST",
                body: JSON.stringify(meeting),
                headers: {"Content-Type": "application/json"}
            })
            .then(resp => {
                if(resp.ok) { return resp.json(); }
                return Promise.reject(resp);
            })
            .then(resp => {
                this.addMeetingToState(resp)
            })
            .catch(err => {
                console.error(err);
                alert('there was a problem with the server , please try again')
            });
    }

    addMeetingToState(meeting) {
        const meetingsList = [...this.state.meetings];
        this.setState({
            meetings: [...meetingsList, meeting]
        });
    }

    removeMeeting = (meetingId) => {
        fetch(`${this.url}${meetingId}`, {
            method: "DELETE",
        })
        .then(resp => {
            if(resp.ok) {
                this.removeMeetingFromState(meetingId);
            } else {
                return Promise.reject(resp);
            }
        })
        .catch(err => {
            console.error(err);
            alert('there was a problem with the server , please try again');
        });
    }

    removeMeetingFromState(meetingId) {
        const meetings = this.state.meetings.filter( el => el.id !== meetingId ? el : '' );
        this.setState({
            meetings: meetings
        });
    }

    getMeetingListFromAPI() {
        fetch(this.url)
            .then(resp => {
                if(resp.ok) { 
                    return resp.json() 
                } else {
                    return Promise.reject(resp)
                }
            })
            .then(resp => { 
                this.setState({
                    meetings: resp
                })
            })
            .catch(err => {
                console.error(err);
                alert('there was a problem with the server , please try again');
            });
    }

    renderCalendarListItems() {
        return this.state.meetings.map( (meeting) => {
            return <CalendarListItem key= {meeting.id} meeting={meeting} remove={this.removeMeeting}/>   
        })
    }
    
    componentDidMount() {
        this.getMeetingListFromAPI();
    }

    render() {
        const inputsData = [
            {
                label: 'First name:',
                name: 'firstName',
                placeholder: 'John',
            },
            {
                label: 'Last name:',
                name: 'lastName',
                placeholder: 'Smith',
            },
            {
                label: 'Email:',
                name: 'email',
                placeholder: 'email@gmail.com',
            },
            {
                label: 'Date:',
                name: 'date',
                placeholder: 'yyyy-mm-dd',
            }, 
            {
                label: 'Time:',
                name: 'time',
                placeholder: 'hh:mm',
            }
        ];
        
        return (
            <div className='app-wrapper'>
                <CalendarForm inputsData={inputsData} updateMeetings={this.addMeeting}/>
                <CalendarList>
                    {this.renderCalendarListItems()}
                </CalendarList>
            </div>
        )
    }
}