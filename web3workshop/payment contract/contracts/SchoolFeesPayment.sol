// SPDX-License-Identifier: MIT-License

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SchoolFees {
    struct Student {
        string fullName;
        string regNo;
        string courseOfStudy;
        uint256 amountPaid;
    }

    mapping(address => Student) public students;
    address payable public schoolWallet;
    address public tokenAddress; // Address of the token contract

    struct PaymentRecord {
        address studentAddress;
        string fullName;
        string regNo;
        string courseOfStudy;
        uint256 amountPaid;
    }

    PaymentRecord[] public allPayments;

    event PaymentReceived(
        address indexed studentAddress,
        string fullName,
        string regNo,
        string courseOfStudy,
        uint256 amountPaid
    );

    constructor(address payable _schoolWallet, address _tokenAddress) {
        schoolWallet = _schoolWallet;
        tokenAddress = _tokenAddress;
    }

    function paySchoolFees(
        string memory _fullName,
        string memory _regNo,
        string memory _courseOfStudy,
        uint256 _amount
    ) external {
        IERC20 token = IERC20(tokenAddress);
       
        students[msg.sender] = Student(_fullName, _regNo, _courseOfStudy, _amount);
        emit PaymentReceived(msg.sender, _fullName, _regNo, _courseOfStudy, _amount);

        token.transfer(schoolWallet, _amount);

        // Add payment record to the allPayments array
        PaymentRecord memory payment = PaymentRecord(
            msg.sender,
            _fullName,
            _regNo,
            _courseOfStudy,
            _amount
        );
        allPayments.push(payment);
    }

    function getAllPayments()
        external
        view
        returns (
            address[] memory,
            string[] memory,
            string[] memory,
            string[] memory,
            uint256[] memory
        )
    {
        address[] memory addresses = new address[](allPayments.length);
        string[] memory fullNames = new string[](allPayments.length);
        string[] memory regNos = new string[](allPayments.length);
        string[] memory coursesOfStudy = new string[](allPayments.length);
        uint256[] memory amountsPaid = new uint256[](allPayments.length);

        for (uint256 i = 0; i < allPayments.length; i++) {
            addresses[i] = allPayments[i].studentAddress;
            fullNames[i] = allPayments[i].fullName;
            regNos[i] = allPayments[i].regNo;
            coursesOfStudy[i] = allPayments[i].courseOfStudy;
            amountsPaid[i] = allPayments[i].amountPaid;
        }

        return (addresses, fullNames, regNos, coursesOfStudy, amountsPaid);
    }


    
    function getPayments()
        external
        view
        returns (PaymentRecord[] memory)
        {
            return allPayments;
        }
}

