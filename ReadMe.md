## About Decentralised Index Fund 
Decentralised Index Fund smart contract enables a person to batch NFTs and create fungible tokens that can be traded and distributed. 

---
## Error Codes 
| Code        | Description |
| ----------- | ----------- |
| -1      | Insufficient Previliges to access transition. Some transitions are meant only for the owner to be accessed. |
| -2   | Sufficient amount of tokens are not available (as much you want to buy) from total supply or transfer from the person.     |
| -3          |      Sender and Recieiver cannot be same address in case of Transfer of tokens       |
| -4  | When minting the payment amount is not same as that of NFT. 
## Transitions 
### RecipientAcceptTransferFrom | RecipientAcceptTransfer
```transition RecipientAcceptTransferFrom(from: ByStr20, recipient: ByStr20, token_id: Uint256)```

This function is to be called by the person who wants to list his/her NFT in the index fund. This is to be called from NonFungibleContract (zrc-1) function. 
| Param        | Description |
| ----------- | ----------- |
| from      | from address (owner of NFT) |
| token_id   | Token ID of the NFT    |
| recipient | The recipient which in this case is the deployed contract address of the above given contract |
### AddToDIF
```transition AddToDIF(from: ByStr20, token_id: Uint256)```

Only owner can call this transition and this adds the NFT to the IndexFund. 

Parameters, 
| Param        | Description |
| ----------- | ----------- |
| from      | from address (owner of NFT) |
| token_id   | Token ID of the NFT    |


### BuyTokens 
```transition BuyTokens(tokens: Uint256)```

You can buy fungible tokens from the total supply using this function, this moves the tokens from total supply to the sender of the function (caller). 

Parameters, 
| Param        | Description |
| ----------- | ----------- |
| tokens      | Number of Tokens (amount) to be bought. |


### TransferTokens
```transition TransferTokens(to: ByStr20, amount: Uint256)```
The sender can transfer his tokens to someone else. Given he has sufficient tokens to transfer. 

Parameters, 
| Param        | Description |
| ----------- | ----------- |
| to      | Address of recipient |
| amount  | Number of tokens he / she wants to transfer|

### MintTokens
```transition Mint(recipient: ByStr20, amount: Uint128)```
The owner of the contract can mint tokens for IndexFund. 

Parameters, 
| Param        | Description |
| ----------- | ----------- |
| recipient      | Recipient of the minted tokens |
| amount  | Number of tokens he / she wants to mint|
### balanceOf
```transition balanceOf(address: ByStr20)```
Gets the balance of the address associated. 

Parameters, 
| Param        | Description |
| ----------- | ----------- |
| address      | Address of inquired balance |

## Frontend Screenshot
- Uploaded soon

## Demo Video 
- Uploaded Soon 
