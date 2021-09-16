import {
  useState,
  useEffect
} from 'react';
import axios from 'axios';


export default function useApplicatonData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  })

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, {
        interview
      })
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: {
            ...interview
          }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        console.log("APPOINTMENTS 32 000", appointments)
        console.log("STATE 33 000", state)
        setState({
          ...state,
          appointments
        });
        updateSpots(state, appointments)
      })
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: null,
          
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState({
          ...state,
          appointments,
        });
        updateSpots(state, appointments)
      })
  }


  const setDay = day => setState(prev => ({
    ...state,
    day
  }));

  useEffect(() => {
    const daysURL = "/api/days";
    const appointmentsURL = "/api/appointments";
    const interviewersURL = "/api/interviewers";
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL),
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, [])

  const updateSpots = (state, appointments) => {
    const index = state.days.findIndex(day => day.name === state.day);
    const dayObj = state.days[index];
    console.log("STATE 88 ---->", state)
    console.log("APPOINTMENTS 89 ---->", appointments)
    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    const day = {
      ...dayObj,
      spots
    };
    const newDays = [...state.days];
    
    newDays[index] = day;
    newDays.splice(index, 1, newDays[index]);
    console.log("DAY 106 ---->", newDays)
    setState((prev) => ({
      ...prev,
      days: prev.days = newDays
    }));
    console.log("STATE 11111 ------->",state)
  }

  return {
    bookInterview,
    cancelInterview,
    setDay,
    state
  };
}