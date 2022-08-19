// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/PullPayment.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

contract City is ERC721, PullPayment, Ownable {
    using Counters for Counters.Counter;

    // Constants
    uint256 public constant TOTAL_SUPPLY = 10000;
    // uint256 public constant MINT_PRICE = 0.08 ether;

    Counters.Counter private currentTokenId;

    /// @dev Base token URI used as a prefix by tokenURI().
    string public baseTokenURI;

    /// @dev store the value of the toekn with tokenID
    mapping(uint256 => uint256) public tokenValue;

    constructor() ERC721("City", "CTY") {
        baseTokenURI = "https://bafybeihqgz7fqruizwhsrxlxwcvsmankd7wth5lr5d2zfzm3mmcsj7wvvu.ipfs.nftstorage.link/metadata/";
    }

    // @dev mint token from next tokenId
    // @dev can only mint once in 24 hours
    // @dev accept value from user instead of using a mint price
    function mintTo(address recipient, uint256 value)
        public
        payable
        returns (uint256)
    {
        uint256 tokenId = currentTokenId.current();
        require(tokenId < TOTAL_SUPPLY, "Max supply reached");
        require(
            msg.value == value,
            "Transaction value did not equal the value given"
        );

        currentTokenId.increment();
        uint256 newItemId = currentTokenId.current();
        _safeMint(recipient, newItemId);
        tokenValue[newItemId] = value;
        console.log("newItemId: %s", newItemId);
        return newItemId;
    }

    /// @dev Returns an URI for a given token ID
    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    /// @dev Sets the base token URI prefix.
    function setBaseTokenURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    /// @dev Overridden in order to make it an onlyOwner function
    function withdrawPayments(address payable payee)
        public
        virtual
        override
        onlyOwner
    {
        super.withdrawPayments(payee);
    }

    /// @dev Get the minted token values
    function getTokenValue(uint256 tokenId)
        public
        view
        returns (uint256)
    {
        return tokenValue[tokenId];
    }
}
