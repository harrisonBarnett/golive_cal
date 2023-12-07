import React from "react";
import { useState, useEffect } from "react";
import { createEventId } from "../utils/utils";

const AddEventModal = (props) => {
    const [title, setTitle] = useState();
    // const [startTime, setStartTime] = useState();
    // const [endTime, setEndTime] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [allDay, setAllDay] = useState(true);
    const [users, setUsers] = useState([]);
    const [eventTypes, setEventTypes] = useState([]);
        
    const handleAddEvent = () => {
        var selectedUsers = '';
        var select = document.querySelectorAll('#add-event-users-select > option');
        select.forEach(option => {
            option.selected ? selectedUsers += option.getAttribute('data') + ',' : '';
            
        });
        var eventType = document.querySelector('#add-event-event-types-select');
        
        // Create new date offset by 2 bc the UI is dumb
        const uiEndDate = new Date(endDate);
        uiEndDate.setDate(uiEndDate.getDate() + 2);
        var event = {
            id: createEventId()
            , title: title
            , start: startDate
            , end: uiEndDate.toISOString()
            , allDay: allDay
            , textColor: eventType.options[eventType.selectedIndex].getAttribute('tc')
            , backgroundColor: eventType.options[eventType.selectedIndex].getAttribute('bg')
            , borderColor: eventType.options[eventType.selectedIndex].getAttribute('bd')
        }
        var eventPostData = {
            eventData: {
                start: startDate
                , end: endDate
                , title: title
                , eventTypeId: eventType.value
                , eventDetails: []
                , eventMembers: selectedUsers
            }
        };
        props.insertEventDb(eventPostData);
        //console.log(event);
        props.info.view.calendar.addEvent(event);
        props.closeModal();
    }

    // const handleSelectEndDate = (e) => {
    //     var foo = new Date(Date.parse(e))
    //     //console.log(foo.toISOString())
    //     foo.setDate(foo.getDate() - 1)
    //     //console.log(foo.toISOString())
    //     //console.log(Date.parse(foo.toISOString()))
    //     setEndDate(Date.parse(foo.toISOString()));
    // }

    useEffect(() => {
        if(props.info.endStr !== undefined) {
            //console.log(props.info.endStr);
            setStartDate(props.info.startStr);
            const foo = new Date(props.info.endStr);
            foo.setDate(foo.getDate() - 1);
            //onsole.log(foo.toISOString().split('T')[0]);
            setEndDate(foo.toISOString().split('T')[0]);
        }
    //setEndDate(props.info.endStr);
    }, [props.info])

    useEffect(() => {
        setTitle('');
        
        setUsers(props.users);
        setEventTypes(props.eventTypes);
    },[props]);
    return(
        <div className='event-modal' 
            style={{display: props.showModal ? 'flex' : 'none'}}>
            <div className='event-modal-header'>
                <h3>Add Event</h3>
                <div className='modal-close-btn' onClick={props.closeModal}>X</div>
            </div>
            
            <div className='event-input-group'>
                <label id='add-event-title'>Title</label>
                <input type='text' 
                        value={title}
                        onChange={e => setTitle(e.target.value)}/>
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
                <label>Start Date</label>
                <input type='date' 
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    style={{
                        pointerEvents: allDay ? 'auto' : 'none'
                        , backgroundColor: allDay ? '' : 'lightgrey'
                    }}/>
                <label>End Date</label>
                <input type='date' 
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    style={{
                        pointerEvents: allDay ? 'auto' : 'none'
                        , backgroundColor: allDay ? '' : 'lightgrey'
                    }}/>
            </div>
            
            <div className='event-input-group'>
                <div>
                    <label htmlFor='add-event-users-select'>Attendees</label>
                    <select 
                    id="add-event-users-select"
                    multiple>
                        {users.map(u => {
                            return(
                                <option key={u.id} data={u.id}>{u.fullName}</option>
                            );
                        })}
                    </select>
                </div>
                
                <div>
                    <label htmlFor='add-event-event-types-select'>Event Type</label>
                    <select
                    id="add-event-event-types-select">
                        {eventTypes.map(et => {
                            return(
                                <option 
                                key={et.eventTypeId} 
                                tc={et.textColor}
                                bg={et.backgroundColor}
                                bd={et.borderColor}
                                value={et.eventTypeId}>
                                    {et.eventTypeName}
                                </option>
                            );
                        })}
                    </select>
                </div>  
            </div>

            <button onClick={() => handleAddEvent()}>Add</button>
            
        </div>
    );


};

export default AddEventModal;