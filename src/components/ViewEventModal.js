import React from "react";
import { useState, useEffect } from "react";
import { getUsersByEvent } from "../utils/utils";

const ViewEventModal = (props) => {
    const [title, setTitle] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [allDay, setAllDay] = useState();
    const [users, setUsers] = useState([]);
    const [dbMeta, setDbMeta] = useState({backgroundColor: '', textColor: '', eventTypeName: ''});

    // Init properties in view 
    useEffect(() => {
        setTitle(props.info.title);
        // setStartTime(props.info.start);
        // setEndTime(props.info.end);
        setStartDate(props.info.start ? props.info.start.toISOString().split('T')[0] : '');
        // Set the display end date to date - 1 thanks to fullCalendar exclusive date shens
        if(props.info.end) {
            var displayDate = new Date(props.info.end);
            displayDate = displayDate.setDate(displayDate.getDate() - 1);
            displayDate = new Date(displayDate);
            setEndDate(displayDate.toISOString().split('T')[0]);
        }
        // setEndDate(props.info.end ? props.info.end.toISOString().split('T')[0] : '');
        // setAllDay(props.info.allDay);

        const getUsers = async () => {
            setUsers(await getUsersByEvent(props.info.id));
        }
        getUsers();        
    },[props]);
    // Init meta event meta properties
    useEffect(()=> {
        if(users !== undefined) {
            if(users[0] !== undefined)
            {
                setDbMeta({
                    backgroundColor: users[0].backgroundColor,
                    textColor: users[0].textColor,
                    eventTypeName: users[0].eventTypeName
                });
            }
        }
    },[users]);
    return(
        <div className='event-modal' 
            style={{display: props.showModal ? 'flex' : 'none'}}>
            <div className='event-modal-header'>
                <h3>{title}</h3>
                <p className='event-view-subtitle'
                style={{backgroundColor: dbMeta.backgroundColor, color: dbMeta.textColor}}>
                    {dbMeta.eventTypeName}
                </p>
                <div className='modal-close-btn' onClick={props.closeModal}>X</div>
            </div>
            {/* <div className='event-input-group'>
                <label>All Day?</label>
                <input type='checkbox' 
                        checked={allDay}
                        onChange={() => setAllDay(!allDay)}/>
            </div> */}

            {/* <div className='event-input-group'>
                <label>Start Time</label>
                <input type='time' 
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                    style={{
                        pointerEvents: allDay ? 'none' : 'auto'
                        , backgroundColor: allDay ? 'lightgrey' : ''
                    }}/>
                <label>End Time</label>
                <input type='time' 
                    value={endTime}
                    onChange={e => setEndTime(e.target.value)}
                    style={{
                        pointerEvents: allDay ? 'none' : 'auto'
                        , backgroundColor: allDay ? 'lightgrey' : ''
                    }}/>
            </div> */}
            <div className='event-input-group'>
                <label>From</label>
                <input type='date' 
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    style={{
                        pointerEvents: allDay ? 'auto' : 'none'
                        , backgroundColor: allDay ? '' : 'lightgrey'
                    }}/>
                <label>To</label>
                <input type='date' 
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    style={{
                        pointerEvents: allDay ? 'auto' : 'none'
                        , backgroundColor: allDay ? '' : 'lightgrey'
                    }}/>
            </div>
            
            <div>
            <hr/>
            <h3>Personnel</h3>
            {users !== undefined && users.map(user => {
                return(
                    <div className='event-modal-user' key={user.id}>
                        <div>{user.fullName} - {user.employeeNum ? user.employeeNum : 'N/A'}</div>
                        {/* <div>{user.email}</div> */}
                    </div>
                );
            })}
            </div>
        </div>
    );


};

export default ViewEventModal;