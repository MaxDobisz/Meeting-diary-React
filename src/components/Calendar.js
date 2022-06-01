import React from 'react';
import CalendarList from './CalendarList';
import CalendarForm from './CalendarForm';
import CalendarListItem from './CalendarListItem';
import API from './Provider';
import inputsData from './inputsData.json'

export default class Calendar extends React.Component {
    state = {
        meetings:[]
    }
    
    api = new API();

    url = 'http://localhost:3005/meetings/';
    
    addMeeting = (meeting) => {
        this.api.insert(meeting)
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
        if(window.confirm('Are you sure you want to delete this meeting?')) {
            this.api.delete(meetingId)
                .then( () => this.removeMeetingFromState(meetingId))
                .catch(err => {
                    console.error(err);
                    alert('there was a problem with the server , please try again');
                });
        }
    }

    removeMeetingFromState(meetingId) {
        const meetings = this.state.meetings.filter( el => el.id !== meetingId ? el : '' );
        this.setState({
            meetings: meetings
        });
    }

    getMeetingListFromAPI() {
        this.api.get()
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
        return (
            <div className='app-wrapper'>
                <CalendarForm inputsData={inputsData.inputsData} updateMeetings={this.addMeeting}/>
                <CalendarList>
                    {this.renderCalendarListItems()}
                </CalendarList>
            </div>
        )
    }
}