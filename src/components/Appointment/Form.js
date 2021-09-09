import React, { useState } from 'react'
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form(props) {
    const [name, setName] = useState(props.name || "");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);
    const [error, setError] = useState("");

    function reset() {
      setName("");
      setInterviewer(null);
    }

    function cancel() {
      reset();
      props.onCancel();
    }

    function validate(){
      if (!name) {
        setError("ERROR:There's no name");
        return;
      }
      if(!interviewer){
        setError("ERROR:There's no interviewer");
        return;
      }
      props.onSave(name,interviewer)
    }

    return (
        <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
            <input
              className="appointment__create-input text--semi-bold"
              name={name}
              type="text"
              placeholder="Enter Student Name"
              onChange={(event) => setName(event.target.value)}
            />
          </form>
          <p>{error}</p>
          <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
        </section>
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button danger onClick={cancel}>Cancel</Button>
            <Button confirm onClick={validate}>Save</Button>
          </section>
        </section>
      </main>
    )
}

// round brackets indicate executing function
// will run immediately without the callback
// () => cancel() // manager managing cook HEY DONT COOK yet, only 
// cancel() Cook is wild, cook cooks whatever cook wants
// cancel cook is obidient will wait for recipe