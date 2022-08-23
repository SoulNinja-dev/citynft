// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/PullPayment.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

contract City is ERC721, PullPayment, Ownable {
    // Constants
    uint256 public constant TOTAL_SUPPLY = 10000;

    /// @dev Base token URI used as a prefix by tokenURI().
    string public baseTokenURI;

    /// @dev store the value of the toekn with tokenID
    mapping(uint256 => uint256) public tokenValue;

    /// @dev stores the time the latest NFT was minted (default: contract creation time)
    uint256 lastMint = block.timestamp;

    constructor() ERC721("City", "CTY") {
        baseTokenURI = "https://bafybeihqgz7fqruizwhsrxlxwcvsmankd7wth5lr5d2zfzm3mmcsj7wvvu.ipfs.nftstorage.link/metadata/";
    }

    /// @dev mint token from tokenId passed by the user
    /// @dev can only mint once in 24 hours
    /// @dev accept value from user instead of using a mint price
    function mint(
        address recipient,
        uint256 value,
        uint256 tokenId
    ) public payable returns (uint256) {
        require(tokenId < TOTAL_SUPPLY, "Only 10k tokens available");
        require(tokenId > 0, "TokenId must be greater than 0");
        require(!_exists(tokenId), "TokenId already exists");
        require(
            msg.value == value,
            "Transaction value did not equal the value given"
        );

        uint256 timediff = block.timestamp - lastMint;
        console.log(timediff);

        // check if NFT has not been minted yet, and also current time is atleast after 24 hours of lastMint
        require(
            // block.timestamp - lastMint >= 86400,
            timediff >= 30,
            "Need atleast 24 hour gap between mints"
        );

        _safeMint(recipient, tokenId);
        tokenValue[tokenId] = value;
        lastMint = block.timestamp;
        return tokenId;
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
    function getTokenValue(uint256 tokenId) public view returns (uint256) {
        return tokenValue[tokenId];
    }
}
