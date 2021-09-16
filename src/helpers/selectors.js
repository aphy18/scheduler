export function getAppointmentsForDay(state, day) {
   if (!state.days) {
      return [];
    }
    let currentDay = state.days.filter(d => d.name === day)[0];
    if (!currentDay) {
      return [];
    }
    let result = [];
    for(const id of currentDay.appointments){
      const appointmentObj = state.appointments[id];
      result.push(appointmentObj);
    }
    return result;
  }

  export function getInterviewersForDay(state, day) {
    const selectedDay = state.days.filter(d => d.name === day)
    if (selectedDay.length === 0) {
      return [];
    }
    const result = selectedDay[0].interviewers.map(interviewer => state.interviewers[interviewer])
    return result;
  }

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
    if (interview.interviewer) {
      return {  
        student: interview.student,
        interviewer: {  
          id: state.interviewers[interview.interviewer].id,
          name: state.interviewers[interview.interviewer].name,
          avatar: state.interviewers[interview.interviewer].avatar
        }
      }
    }
   }
 }
  
  
