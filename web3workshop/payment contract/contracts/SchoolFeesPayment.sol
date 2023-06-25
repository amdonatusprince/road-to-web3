// SPDX-License-Identifier: MIT-License

// Contract Sketchup

pragma solidity ^0.8.0;

contract SchoolFees {
    struct Student {
        string fullName;
        string regNo;
        string courseOfStudy;
        uint256 amountPaid;
    }

    mapping(address => Student) public students;
    address payable public schoolWallet;

    event PaymentReceived(
        address indexed studentAddress, 
        string fullName, string regNo, string courseOfStudy, uint256 amountPaid);

    constructor(address payable _schoolWallet) {
        schoolWallet = _schoolWallet;
    }

    function paySchoolFees(string memory _fullName, string memory _regNo, string memory _courseOfStudy, uint256 _amount) external payable {
        require(msg.value == _amount, "Incorrect payment amount");

        students[msg.sender] = Student(_fullName, _regNo, _courseOfStudy, _amount);
        emit PaymentReceived(msg.sender, _fullName, _regNo, _courseOfStudy, _amount);

        schoolWallet.transfer(msg.value);
    }

    function getAllPayments() external view returns (address[] memory, string[] memory, string[] memory, string[] memory, uint256[] memory) {
        uint256 totalPayments = 0;
        address[] memory addresses = new address[](totalPayments);
        string[] memory fullNames = new string[](totalPayments);
        string[] memory regNos = new string[](totalPayments);
        string[] memory coursesOfStudy = new string[](totalPayments);
        uint256[] memory amountsPaid = new uint256[](totalPayments);

        for (uint256 i = 0; i < totalPayments; i++) {
            Student memory student = students[addresses[i]];
            addresses[i] = payable(addresses[i]);
            fullNames[i] = student.fullName;
            regNos[i] = student.regNo;
            coursesOfStudy[i] = student.courseOfStudy;
            amountsPaid[i] = student.amountPaid;
        }

        return (addresses, fullNames, regNos, coursesOfStudy, amountsPaid);
    }
}
