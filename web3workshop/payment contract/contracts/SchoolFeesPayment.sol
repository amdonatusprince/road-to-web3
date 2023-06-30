// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SchoolFeesPayment {
    IERC20 private token;
    address private schoolWallet;

    constructor(address tokenAddress, address _schoolWallet) {
        token = IERC20(tokenAddress);
        schoolWallet = _schoolWallet;
    }

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

    function paySchoolFees(
        string memory _fullName,
        string memory _regNo,
        string memory _courseOfStudy,
        uint256 _amount
    ) external {
        require(_amount > 0, "Amount must be greater than zero");
        token.transferFrom(msg.sender, schoolWallet, _amount);

        emit PaymentReceived(msg.sender, _fullName, _regNo, _courseOfStudy, _amount);
        allPayments.push(
            PaymentRecord(
                msg.sender,
                _fullName,
                _regNo,
                _courseOfStudy,
                _amount
            )
        );
    }

    function getPayments() external view returns (PaymentRecord[] memory) {
        return allPayments;
    }
}
