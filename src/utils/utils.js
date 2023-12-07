// Dev
const host = "http://192.168.68.111";

// EVENT UTILS
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

const getAllEvents = async () => {
  const res = await fetch(`${host}/ai_cal/?resource=event`);

  //const res = await fetch('http://192.168.68.111/ai_cal/?resource=event');
  // const text = await res.json();
  // console.log(text);
  
  return await res.json();
  // [
  //   {
  //     id: createEventId(),
  //     title: 'All-day event',
  //     start: todayStr
  //   },
  //   {
  //     id: createEventId(),
  //     title: 'Timed event',
  //     start: todayStr + 'T12:00:00'
  //   }
  // ]
};

const getAllEventTypes = async () => {
  const res = await fetch(`${host}/ai_cal/?resource=eventType`);
  return await res.json();
  // return[
  //   {
  //     eventTypeId: 1,
  //     eventTypeName: "Foo Type Event",
  //     backgroundColor: "00FFFF",
  //     borderColor: "000000"
  //   }
  // ]
};

const insertNewEvent = async (postData) => {
  const res = await fetch(`${host}/ai_cal/?resource=event`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json'
      
    },
    body: JSON.stringify(postData)
  });
  // console.log(res.status);
};

const updateEvent = async (putData) => {
  const res = await fetch(`${host}/ai_cal/?resource=event`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json'
      
    },
    body: JSON.stringify(putData)
  });
  // console.log(res.status);
  //console.log(JSON.stringify(putData));
}

const createEventId = ()=> {
  return String(eventGuid++)
};

// USER UTILS

const getAllUsers = async () => {
  const res = await fetch(`${host}/ai_cal/?resource=user`);
  // console.log(await res.json());
  return await res.json();
};

const getUsersByEvent = async (eventId) => {
  if(eventId != undefined) {
    const res = await fetch(`${host}/ai_cal/?resource=user&eventId=` + eventId);
    return await res.json();
  }
};

export {getAllEvents, getAllEventTypes, insertNewEvent, updateEvent, getAllUsers, getUsersByEvent, createEventId}
