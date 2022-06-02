import React from 'react';
import CalendarFormInput from './CalendarFormInput'
import inputsData from './inputsData.json';

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
        let errors = [];
        const fields = inputsData.inputsData;

        fields.forEach( (field) => {
            const {pattern} = field;
            const value = this.formRef.elements[field.name].value;
            const reg = new RegExp(pattern);
            if(!reg.test(value)) {
                errors.push(`${field.label} is not correct!`);
            }          
        })

        const {firstName, lastName, email, date, time} = this.state;

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
            <form className='form' onSubmit={this.submitForm} ref= {el => this.formRef = el}>
                {this.renderInputs(this.props.inputsData)}
                <input className={'submit-button'} type='submit' value={'SUBMIT'} />
                {this.renderErrors()}
            </form>
        )
    }   
}