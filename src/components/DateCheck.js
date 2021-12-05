// import Button from "@restart/ui/esm/Button";
import React, { useState } from "react";
import { Form } from "react-bootstrap";

function DateCheck() {
  const [date, setDate] = useState("0000-00-00");
  const [dates, setDates] = useState([]);
  const logDate = () => {
    console.log(date);
    setDates([...dates, date]);
  };

  return (
    <div>
      <div>
        <div className="row">
          <div className="col-sm-3">
            <Form.Group controlId="dob" onSubmit={(e) => e.preventDefault()}>
              <Form.Label>Select Date</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                placeholder="Date of Birth"
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => logDate()}
              >
                submit
              </button>
            </Form.Group>
          </div>
        </div>
      </div>
      <div>
        {dates.map((el) => (
          <h4>{el}</h4>
        ))}
      </div>
    </div>
  );
}

export default DateCheck;
