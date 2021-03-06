import React from "react";
import "components/DayListItem.scss";
const classNames = require('classnames');

const formatSpots = spots => {
  if (!spots) {
    return `no spots remaining`;
  }

  if (spots === 1) {
    return `${spots} spot remaining`;
  }

  return `${spots} spots remaining`;
}
  // shift + tab = unindent

export default function DayListItem(props) {
  const availabilityMessage = formatSpots(props.spots);

  let dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots
  })
  const name = props.name
   
  return (
   <li className={dayClass} onClick={() => props.setDay(name)}>
     <h2 className="text--regular">{name}</h2> 
     <h3 className="text--light">{availabilityMessage}</h3>
   </li>
  );
}