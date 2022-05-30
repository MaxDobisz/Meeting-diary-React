import React from 'react';
import CalendarFormInput from './CalendarFormInput'

export default class Calendar extends React.Component {
    state= {
            firstName: "",
            lastName: "",
            email: "",
            date: "",
            time: "",
            errors: [],
        }

    inputChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }
    
    validation() {
        const {firstName, lastName, email, date, time} = this.state;
        let errors = [];

        const namePatern = /^[a-zA-Z]{3,}$/
        if(!namePatern.test(firstName)) {
            errors.push('First name is not correct!');
        }

        if(!namePatern.test(lastName)) {
            errors.push('Last name is not correct!');
        }

        const emailPatern = /^[a-z0-9]+\.*[a-z0-9]+@{1}[a-z0-9]+\.{1}[a-z0-9]+$/;
        if(!emailPatern.test(email)) {
            errors.push('Email is not correct!');
        }

        const datePatern = /^[0-9]{4}-{1}[0-9]{2}-{1}[0-9]{2}$/;
        if(!datePatern.test(date)) {
            errors.push('Date is not correct!');
        }

        const timePatern = /^[0-9]{2}:{1}[0-9]{2}$/;
        if(!timePatern.test(time)) {
            errors.push('Time is not correct!');
        }

        this.setState({
            errors: errors
        }, () => { 
            if (this.state.errors.length === 0 ) {
                const newMeeting = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    date: date,
                    time: time,
                }
                this.props.updateMeetings(newMeeting);
                this.clearInputs();
            }
        })
    }
    
    clearInputs() {
        this.setState({
            firstName: "",
            lastName: "",
            email: "",
            date: "",
            time: "",
        })
    }

    submitForm = (e) => {
        e.preventDefault();
        this.validation();
    }

    renderErrors() {
        if(this.state.errors.length !== 0) {
            return <ul className='error'>{ this.state.errors.map( error => <li key={error} className='example'>{error}</li> ) }</ul>
        }
    }

    renderInputs(arr) {
        return arr.map( (input) => {
            return (
                <React.Fragment key={input.name}>
                    <CalendarFormInput input={input} value= {this.state[input.name]} state={this.state} onChange={this.inputChange}/>
                </React.Fragment>
            )
        })
    }

    render() {
        return (
            <form className='form' onSubmit={this.submitForm}>
                {this.renderInputs(this.props.inputsData)}
                <input className={'submit-button'} type='submit' value={'SUBMIT'} />
                {this.renderErrors()}
            </form>
        )
    }   
}