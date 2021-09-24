import React, { Fragment } from 'react'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode  from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {
  const save = (name, interviewer) => {
    const interview = {
        student: name,
        interviewer,
      };
      transition(SAVING);
      props.bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch(error => transition(ERROR_SAVE, true));
    };

  const deleteInterview = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    
    transition(DELETE);
    props.cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE,true))
  }
    

  const confirmDeleteInterview = () => {
    transition(CONFIRM);
  }
  
  const editInterview = () => {
    transition(EDIT);
  }
  
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
      );

       
 
    return (
      
        <Fragment>
        <Header
        time={props.time} />
      
        {mode === EMPTY && props.time !== "5pm" && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && props.interview && (
        <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={confirmDeleteInterview}
        onEdit={editInterview}
        />
       )}
        {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={() => back(EMPTY)} onSave={save} />
      )}
       {mode === CONFIRM && (
        <Confirm message="Are you sure you would like to delete ?" onConfirm={deleteInterview} onCancel={back} />
      )} 
      {mode === DELETE && (
        <Status message="Deleting" />
      )}
      {mode === EDIT && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={back} />
      )}
      {mode === SAVING && (
        <Status message="Saving" />
      )}
      {mode === ERROR_DELETE && (
        <Error message={"Could not delete appointment"} onCancel={() => transition(SHOW)} />
      )}
      {mode === ERROR_SAVE && (
        <Error message={"Could not save appointment"} onCancel={() => transition(CREATE)} />
      )}

       </Fragment>
    )
}