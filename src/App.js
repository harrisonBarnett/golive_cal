import React from 'react';
import { useState, useEffect } from 'react';

import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { getAllEvents, getAllEventTypes, insertNewEvent, createEventId, getAllUsers, updateEvent } from './utils/utils';

import AddEventModal from './components/AddEventModal';
import ViewEventModal from './components/ViewEventModal';

const App = () => {
  // [, setState] = useState(false);
  const [eventsCache, setEventsCache] = useState([]);
  const [usersCache, setUsersCache] = useState([]);
  const [eventsTypeCache, setEventsTypeCache] = useState([]);

  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showViewEventModal, setShowViewEventModal] = useState(false);

  const [selectDateInfo, setSelectDateInfo] = useState({});
  const [selectEvtInfo, setSelectEvtInfo] = useState({});

  // Popup modal to add a new event
  const handleDateSelect = (selectInfo) => {
    setShowAddEventModal(true);
    setSelectDateInfo(selectInfo);
    // console.log(JSON.stringify(selectInfo));
  }
  const handleDbInsertEvent = (postData) => {
    insertNewEvent(postData);
  }

  // Popup modal to view an existing event
  const handleEventClick = (clickInfo) => {
    setShowViewEventModal(true);
    setSelectEvtInfo(clickInfo.event);
  }
  
  const handleEventChange = (event) => {
    const eventData = {
      id: parseInt(event.event.id)
      , start: event.event.start.toISOString().split('T')[0]
      , end: event.event.end.toISOString().split('T')[0]
    };

    updateEvent({
      eventData: eventData
    });
  }

  // const handleEvents = (events) => {
  //   // setEventsCache(events);
  //   //console.log(eventsCache)s
  // }

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  useEffect(() => {
    //setEventsCache(getAllEvents);
    const getUsers = async () => {
      setUsersCache(await getAllUsers());
    }
    getUsers();
    const getEventTypes = async () => {
      setEventsTypeCache(await getAllEventTypes());
    }
    getEventTypes();
  }, []);
  return (
    <div className='app-container'>
      <div className='sidebar'>
        <div className='sidebar-section'>
          <h3>Usage:</h3>
          <ul>
            <li>Click a date to add an event.</li>
            <li>Drag and drop an event elsewhere on the calendar.</li>
            <li>Drag the edge of an event to "resize" it.</li>
            <li>Click an event to view details.</li>
          </ul>
        </div>
        <div className='sidebar-section' id='events-key'>
        <h3>Key:</h3>
          {eventsTypeCache.map(et => {
            return(
              <div 
              className='events-key-item'
              style={{backgroundColor: et.backgroundColor,
                      color: et.textColor,
                      borderColor: et.borderColor}}>
                {et.eventTypeName}
              </div>
            );
          })}
        </div>
      </div>
      <div className='app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'title',
            center: '',
            //right: 'dayGridMonth,timeGridWeek,timeGridDay'
            //right: 'prev,next today'
            right: 'prev,next'
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          
          events={getAllEvents} // alternatively, use the `events` setting to fetch from a feed
          defaultAllDay={true}
          eventDataTransform={function(event) {
            event.end = new Date(event.end)
            event.end = event.end.setDate(event.end.getDate() + 1);
          }}
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventChange={handleEventChange}
        />
      </div>
      <AddEventModal 
      showModal={showAddEventModal}
      insertEventDb={handleDbInsertEvent}
      closeModal={() => setShowAddEventModal(false)}
      info={selectDateInfo}
      users={usersCache}
      eventTypes={eventsTypeCache}
      />

      <ViewEventModal 
      showModal={showViewEventModal}
      closeModal={() => setShowViewEventModal(false)}
      info={selectEvtInfo}
      />

      <div 
        className='modal-background'
        style={{
          display: showAddEventModal ? 'block' : 'none'
        }}
        onClick={() => setShowAddEventModal(false)}></div>
      <div 
        className='modal-background'
        style={{
          display: showViewEventModal ? 'block' : 'none'
        }}
        onClick={() => setShowViewEventModal(false)}></div>
    </div>
  )
}

export default App;