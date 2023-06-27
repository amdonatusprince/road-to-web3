import React from 'react';
import './form.css';
import { Button } from '../connectButton/button';
import { useAccount } from 'wagmi'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction
} from 'wagmi';


export default function Form() {

  const { config, error } = usePrepareContractWrite({
    address: import.meta.env.VITE_REACT_APP_SCHOOL_PAYMENT_CONTRACT,
    abi: paySchoolFeesABI,
    functionName: 'paySchoolFees',
  })

  const { write } = useContractWrite(config)

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
          <input className="fname" type="text" name="name" placeholder="Full name" />
          <input type="text" name="name" placeholder="Reg No" />
          <input type="text" name="name" placeholder="Course of Study" />
          <input type="number" name="name" placeholder="Amount" />
        </div>
        <button type="submit" disabled={!write} onClick={() => write?.()}>Pay School Fees</button>
        {error && (
        <div>An error occurred preparing the transaction: {error.message}</div>
      )}
      </form>
    </div>
  );
}
