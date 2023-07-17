import React from 'react';
import { useContractRead } from 'wagmi';
import { paySchoolFeesABI } from '../../utils/SchoolFees';

export default function GetAllPayments() {
  const { data, isError, isLoading } = useContractRead({
    address: import.meta.env.VITE_REACT_APP_SCHOOL_PAYMENT_CONTRACT,
    abi: paySchoolFeesABI,
    functionName: 'getPayments',
  });

  const reversedData = [...data].reverse();

  return (
    <ul>
      {reversedData.map((payment, index) => (
        <li key={index}>
          <p>Student Address: {payment.studentAddress}</p>
          <p>Full Name: {payment.fullName}</p>
          <p>Registration Number: {payment.regNo}</p>
          <p>Course of Study: {payment.courseOfStudy}</p>
          <p>Amount Paid: {payment.amountPaid}</p>
        </li>
      ))}
    </ul>
  );
}
