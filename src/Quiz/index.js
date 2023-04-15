import React from 'react'
import {useState} from 'react';

function Quiz() {
  const [displayForm, setDisplayForm] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [status, setStatus] = useState("null");
  const handleTextChange = (e) => {
    setTextValue(e.target.value);
    setStatus(e.target.value === "" ? "null" : "writing");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitForm(textValue);
      setStatus("ok");
    } catch (err) {
      setStatus("err");
    }
    setDisplayForm(true);
  };
  const formDisabled = status === "submitting" || status === "ok";
  const buttonDisabled = status === "submitting" || status === "null";
  return (
    <>{!displayForm && (
        <form onSubmit={handleFormSubmit}>
          <h2>City quiz</h2>
          <p>What city is located on two continents?</p>
          <textarea value={textValue} onChange={handleTextChange} disabled={formDisabled}/>
          <br />
          <button type="submit" disabled={buttonDisabled}>
            Submit
          </button>
          <p style={{ display: formDisabled ? "" : "none" }}>
            Loading...
          </p>
        </form>
      )}
      <p style={{  color: "red" , display: status === "err" ? "" : "none"}}>
        Good guess but a wrong answer. Try again!
      </p>
      <h1 style={{ display: status === "ok" ? "" : "none" }}>
        That's right!
      </h1>
    </>
  );
}

async function submitForm(textValue) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (textValue.toLowerCase() === "istanbul") {
        resolve();
      } else {
        reject(new Error("Good guess but a wrong answer. Try again!"));
      }
    }, 1500);
  });
}

export default Quiz