// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "../node_modules/openzeppelin/contracts/token/ERC20/ERC20.sol";

contract UNNToken is ERC20{
    constructor() ERC20("UNN Token", "UTN"){
        _mint(msg.sender,1000000000*10**18);
    } 
}