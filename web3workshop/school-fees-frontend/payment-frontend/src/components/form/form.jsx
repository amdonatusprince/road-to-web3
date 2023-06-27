import React from 'react';
import './form.css';


export default function Form() {
  return (
    <div className="main-block">
      <div className="left-part">
        <i className="fas fa-graduation-cap"></i>
        <h1>Pay Your School Fees</h1>
      </div>
      <form action="/">
        <div className="title">
          <i className="fas fa-pencil-alt"></i>
          <h2>Register here</h2>
        </div>
        <div className="info">
          <input className="fname" type="text" name="name" placeholder="Full name" />
          <input type="text" name="name" placeholder="Reg No" />
          <input type="text" name="name" placeholder="Course of Study" />
          <input type="number" name="name" placeholder="Amount" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
