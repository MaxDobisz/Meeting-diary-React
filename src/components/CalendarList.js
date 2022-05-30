import React from 'react';

export default class Calendar extends React.Component {
   renderItems() {
       if(this.props.children.length !== 0) {
           return (
                <section>
                    <h1>Meetings</h1>
                    <table className='meetingsList'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.children}
                        </tbody>
                    </table>
                </section>
            )
        }
    }

    render() {
        return (
           <>
                {this.renderItems()}
           </>
        )       
    }   
}