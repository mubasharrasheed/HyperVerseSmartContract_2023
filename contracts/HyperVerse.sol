// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HyperVerse is ERC20, Pausable, Ownable, ERC20Burnable {
    /** 
        Default Constructor With Token Name, Symbol and Supply Arguments
    **/
    constructor(string memory name, string memory symbol, uint256 supply) ERC20(name, symbol) {
        _mint(msg.sender, supply * 10**decimals());
    }

    /** 
        Pause Token Function Controlled by Owner Only
    **/
    function pause() public onlyOwner {
        _pause();
    }

    /** 
        Unpause Token Function Controlled by Owner Only
    **/
    function unpause() public onlyOwner {
        _unpause();
    }

    /** 
        Check Token Not Pause Before Transfer
    **/

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }
}