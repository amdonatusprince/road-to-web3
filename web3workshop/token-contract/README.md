
  <h1>Smart Contract for School Fees Payment</h1>

  <h2>Contract Code</h2>
  <pre>
    <code>
      pragma solidity ^0.8.0;

      contract SchoolFees {
          // ... (insert the smart contract code here)
      }
    </code>
  </pre>

  <h2>Contract Description</h2>
  <p>
    The paySchoolFees function allows students to pay their school fees. t takes in the student's full name, registration number, course of study, and the payment amount. The caller must send the exact payment amount along with the function call. The function stores the student's details in the students mapping and emits an event to indicate that the payment has been received. It then transfers the payment amount from the student's wallet address (msg.sender) to the school's wallet address (schoolWallet).
  </p>
  <p>
    The getAllPayments function retrieves all the payments made by students. It returns arrays containing the addresses of the students, their full names, registration numbers, courses of study, and the amounts they have paid.
  </p>
