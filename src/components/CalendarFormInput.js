import React from 'react';

export default class CalendarFormInput extends React.Component {
    render() {
        const {label, name, placeholder} = this.props.input
        return (
            <>
                <label htmlFor={label}>{label}</label><input onChange={this.props.onChange} type={'text'} name={name} value={this.props.value} placeholder= {placeholder} /> 
            </>
        )
    }
}