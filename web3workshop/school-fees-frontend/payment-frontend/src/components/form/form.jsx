import React, { useState, useEffect } from 'react';
import './form.css';
import { Button } from '../connectButton/button';
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction
} from 'wagmi';
import {paySchoolFeesABI} from '../../utils/SchoolFees'
import Approve from '../connectButton/approveButton';


export default function Form() {

  const [fullName, setFullName] = useState('');
  const [regNo, setRegNo] = useState('');
  const [courseOfStudy, setCourseOfStudy] = useState('');
  const [amount, setAmount] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);


  const { config, error } = usePrepareContractWrite({
    address: import.meta.env.VITE_REACT_APP_SCHOOL_PAYMENT_CONTRACT,
    abi: paySchoolFeesABI,
    functionName: 'paySchoolFees',
    args: [
      fullName,
      regNo,
      courseOfStudy,
      BigInt(amount) * BigInt(10) ** BigInt(18)
    ]
  })

  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });


  return (

    <div className="main-block">
      <div className="left-part">
        <i className="fas fa-graduation-cap"></i>
        <h1>Pay Your School Fees</h1>
        <div className="connect-button">
         <Button />
        </div>
      </div>
      <form>
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
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Reg No"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Course of Study"
          value={courseOfStudy}
          onChange={(e) => setCourseOfStudy(e.target.value)}
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        </div>
            <Approve amount={amount} />
            <button disabled={!write || !fullName || !regNo || !courseOfStudy || !amount} onClick={() => {
              setButtonClicked(true); 
              write?.();
            }}> 
            {isLoading ? 'Paying School Fees...' : 'Pay School Fees'}
            </button>
            {/* {error && error.message && (
        <div style={{marginTop: '20px',  color: 'red' }}>
          An error occurred preparing the transaction: {error.message}</div>
      )} */}
      </form>
      {isSuccess && (
        <div>
          You've Successfully Paid Your School Fees with UNN Native Currency!
          <div>
            <a href={`https://goerli.etherscan.io/tx/${data?.hash}`}>View on Goerli Etherscan</a>
          </div>
        </div>
      )}
    </div>
    
  );
}

