import React from 'react';
import DayListItem from './DayListItem';


// DayList renders a list of DayListItem components

export default function DayList(props) {
  const schedule = props.days.map(day => {
 
    return (
      <DayListItem
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.day}
      setDay={props.setDay}
      key={day.id}  />
    )
  })
  return <ul>{schedule}</ul>
}