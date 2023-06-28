import React, { useState } from 'react';
import './form.css';
import { Button } from '../connectButton/button';
import { useAccount } from 'wagmi'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction
} from 'wagmi';
import {paySchoolFeesABI} from '../../utils/paySchoolFees'


export default function Form() {

  const [fullName, setFullName] = useState('');
  const [regNo, setRegNo] = useState('');
  const [courseOfStudy, setCourseOfStudy] = useState('');
  const [amount, setAmount] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);


  const { config, error } = usePrepareContractWrite({
    address: import.meta.env.VITE_REACT_APP_SCHOOL_PAYMENT_CONTRACT,
    abi: paySchoolFeesABI.paySchoolFeesABI,
    functionName: 'paySchoolFees',
    args: [
      fullName,
      regNo,
      courseOfStudy,
      amount * 10**18
    ]
  })

  const { write } = useContractWrite(config)

  console.log( [
    fullName,
    regNo,
    courseOfStudy,
    amount
  ])

  return (

    <div className="main-block">
      <div className="left-part">
        <i className="fas fa-graduation-cap"></i>
        <h1>Pay Your School Fees</h1>
        <div className="connect-button">
         <Button />
        </div>
      </div>
      <form action="/">
        <div className="title">
          <i className="fas fa-pencil-alt"></i>
          <h2>Register here</h2>
        </div>

        <div className="info">
        <input
          className="fname"
          type="text"
          name="name"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="text"
          name="name"
          placeholder="Reg No"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
        />

        <input
          type="text"
          name="name"
          placeholder="Course of Study"
          value={courseOfStudy}
          onChange={(e) => setCourseOfStudy(e.target.value)}
        />

        <input
          type="number"
          name="name"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        </div>
            <button type="submit" disabled={!write} onClick={() => {
              setButtonClicked(true); 
              write?.();
            }}> 
            Pay School Fees
            </button>
            {error && error.message && (
        <div style={{marginTop: '20px',  color: 'red' }}>
          An error occurred preparing the transaction: {error.message}</div>
      )}
      </form>
    </div>
  );
}

