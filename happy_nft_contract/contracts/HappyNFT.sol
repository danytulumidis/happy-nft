//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HappyNFT is ERC721, Ownable {
    uint256 public nftPrice = 0.001 ether;
    uint256 public maxSupply = 5;
    uint256 public nftIds = 0;
    string public nftBaseURI;
    // Track which owner has which NFT
    mapping(address => uint256) public ownerNFT;

    constructor(string memory _name, string memory _symbol, string memory _nftBaseURI) ERC721(_name, _symbol) {
        nftBaseURI = _nftBaseURI;
    }

    function mint() public payable {
        require(msg.value >= nftPrice, "Your sent not enough ether!");
        require((nftIds + 1) < maxSupply, "Would exceed maximum NFT supply!");

        // Each address only allowed one NFT
        uint256 ownerBalance = balanceOf(msg.sender);
        require(ownerBalance < 1, "Each address can only own one NFT!");

        nftIds ++;
        ownerNFT[msg.sender] = nftIds;

        _safeMint(msg.sender, nftIds);
    }

    function setPrice(uint256 _newPrice) public onlyOwner{
        nftPrice = _newPrice;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return nftBaseURI;
    }

    receive() external payable {}
    fallback() external payable {}

}