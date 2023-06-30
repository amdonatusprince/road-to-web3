import React from 'react';
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction
  } from 'wagmi';
  import {UNNTokenABI} from '../../utils/Token'


  export default function Approve({amount}) {
    
// preparing the approve smart contract call
  const { config, error } = usePrepareContractWrite({
    address: import.meta.env.VITE_REACT_APP_UNN_TOKEN_CONTRACT,
    abi: UNNTokenABI,
    functionName: 'approve',
    args: [
      import.meta.env.VITE_REACT_APP_SCHOOL_PAYMENT_CONTRACT,
      amount 
    ]
  })

  // calling the approve function of the UNN token contract
  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <button disabled={!write} onClick={() => write?.()}>Approve Payment</button>
  );

  }