# Top Solidity Interview Questions

### Table of Contents

| No. | Questions |
|---- | --------- |
| 1 | [What is Solidity and what is its primary use?](#1-what-is-solidity-and-what-is-its-primary-use) |
| 2 | [Explain the different data locations in Solidity: storage, memory, and calldata.](#2-explain-the-different-data-locations-in-solidity-storage-memory-and-calldata) |
| 3 | [What is the difference between `view` and `pure` functions?](#3-what-is-the-difference-between-view-and-pure-functions) |
| 4 | [What are modifiers and why are they used?](#4-what-are-modifiers-and-why-are-they-used) |
| 5 | [Explain the difference between `msg.sender` and `tx.origin`.](#5-explain-the-difference-between-msgsender-and-txorigin) |
| 6 | [What are Events and why are they important?](#6-what-are-events-and-why-are-they-important) |
| 7 | [Explain the `payable` keyword.](#7-explain-the-payable-keyword) |
| 8 | [How does error handling work in Solidity? (require, assert, revert)](#8-how-does-error-handling-work-in-solidity-require-assert-revert) |
| 9 | [What is a `fallback` function and a `receive` function?](#9-what-is-a-fallback-function-and-a-receive-function) |
| 10 | [Explain the Reentrancy attack and how to prevent it.](#10-explain-the-reentrancy-attack-and-how-to-prevent-it) |
| 11 | [What is the difference between an abstract contract and an interface?](#11-what-is-the-difference-between-an-abstract-contract-and-an-interface) |
| 12 | [How does inheritance work in Solidity?](#12-how-does-inheritance-work-in-solidity) |
| 13 | [What is the purpose of the `constructor` in a smart contract?](#13-what-is-the-purpose-of-the-constructor-in-a-smart-contract) |
| 14 | [Explain the concept of Gas, Gas Price, and Gas Limit.](#14-explain-the-concept-of-gas-gas-price-and-gas-limit) |
| 15 | [What are the mappings in Solidity?](#15-what-are-the-mappings-in-solidity) |

## 1. What is Solidity and what is its primary use?

**Solidity** is an object-oriented, high-level programming language designed specifically for writing smart contracts. It is statically typed and supports inheritance, libraries, and complex user-defined types. 

### Key Characteristics
- **EVM Target:** It is compiled into bytecode that executes on the Ethereum Virtual Machine (EVM).
- **Object-Oriented:** Supports features like classes (contracts), inheritance, and polymorphism.
- **Statically Typed:** Variables must be defined with their type at compile time.

### Primary Use Cases
Solidity is used to create self-executing contracts where the terms of the agreement are directly written into lines of code. Common use cases include:
- Decentralized Finance (DeFi) applications.
- Non-Fungible Tokens (NFTs).
- Decentralized Autonomous Organizations (DAOs).
- Supply chain tracking and automated escrows.
<br>

## 2. Explain the different data locations in Solidity: storage, memory, and calldata.

In Solidity, complex types (like arrays, structs, and mappings) need an explicit data location to specify where they are stored.

- **`storage`:** This is where all state variables are stored. It is persistent across function calls and transactions. Storing data here is the most gas-expensive operation. It acts like a computer's hard drive.
- **`memory`:** This is a temporary place to store data. Its lifetime is limited to an external function call. It is cheaper to use than `storage` and acts like RAM. Once the function executes, the data is wiped.
- **`calldata`:** This is a non-modifiable, non-persistent area where function arguments are stored. It behaves mostly like `memory` but is read-only. It is required for parameters of `external` functions and is cheaper than `memory` because it avoids data copying.
<br>

## 3. What is the difference between `view` and `pure` functions?

Both `view` and `pure` are keywords used to restrict the behavior of a function regarding state modification, which helps in saving gas (since they don't consume gas when called externally).

- **`view` functions:** These functions guarantee that they will **not modify the state**. They can read state variables, access global variables like `block.timestamp` or `msg.sender`, but cannot change them.
- **`pure` functions:** These functions guarantee that they will **neither read from nor modify the state**. They operate solely on their input parameters and return a result. They cannot access state variables or blockchain global variables.

```solidity
uint256 public multiplier = 5;

// Can read state but not modify
function multiply(uint256 val) public view returns (uint256) {
    return val * multiplier; 
}

// Cannot read or modify state
function add(uint256 a, uint256 b) public pure returns (uint256) {
    return a + b;
}
```
<br>

## 4. What are modifiers and why are they used?

**Modifiers** are used to change or restrict the behavior of functions in a declarative way. They are commonly used to check conditions automatically prior to executing a function.

### Uses of Modifiers:
- **Access Control:** Checking if the caller is the owner of the contract.
- **Input Validation:** Ensuring input parameters meet certain criteria.
- **State Checks:** Ensuring the contract is in a specific state (e.g., active or paused).

```solidity
address public owner;

constructor() {
    owner = msg.sender;
}

modifier onlyOwner() {
    require(msg.sender == owner, "Not the contract owner");
    _; // The special symbol that tells Solidity to execute the modified function here
}

function changeOwner(address newOwner) public onlyOwner {
    owner = newOwner;
}
```
<br>

## 5. Explain the difference between `msg.sender` and `tx.origin`.

Both `msg.sender` and `tx.origin` are global variables that return addresses, but they represent different entities in a transaction chain.

- **`msg.sender`:** Represents the address of the **immediate caller** of the smart contract. If User A calls Contract B, and Contract B calls Contract C, then inside Contract C, `msg.sender` is Contract B.
- **`tx.origin`:** Represents the **original Externally Owned Account (EOA)** that initiated the transaction. In the same example (User A -> Contract B -> Contract C), inside Contract C, `tx.origin` is User A.

**Security Warning:** Using `tx.origin` for authorization is a major security risk and makes the contract vulnerable to phishing attacks. You should almost always use `msg.sender` for access control.
<br>

## 6. What are Events and why are they important?

**Events** are a way for smart contracts to communicate that something has happened on the blockchain to external applications (like a web frontend). 

When an event is emitted, the arguments passed to it are stored in the transaction's log. These logs are associated with the address of the contract and are incorporated into the blockchain.

### Importance of Events:
- **Frontend Integration:** Applications (using Ethers.js or Web3.js) can listen to these events to update the UI dynamically without constantly polling the blockchain.
- **Cheaper Storage:** Storing data in logs via events is much cheaper than storing data in state variables. (Note: Smart contracts themselves cannot access past event data).
- **Indexing:** They allow services like The Graph to easily index and query blockchain data.

```solidity
event Transfer(address indexed from, address indexed to, uint256 amount);

function transfer(address to, uint256 amount) public {
    // ... transfer logic ...
    emit Transfer(msg.sender, to, amount);
}
```
<br>

## 7. Explain the `payable` keyword.

The **`payable`** keyword makes it possible for a function, an address, or a contract to receive Ether. 

- **Payable Functions:** If a function has the `payable` modifier, it can process transactions that include a non-zero Ether value (`msg.value`). If you send Ether to a function without this keyword, the transaction will revert.
- **Payable Addresses:** Only variables defined as `address payable` have the `.transfer()` and `.send()` methods available.

```solidity
// Function that can receive Ether
function deposit() public payable {
    // msg.value contains the amount of Wei sent
}

// Function to send Ether from the contract
function withdraw(address payable recipient, uint256 amount) public {
    recipient.transfer(amount);
}
```
<br>

## 8. How does error handling work in Solidity? (require, assert, revert)

Solidity uses state-reverting exceptions to handle errors. When an exception occurs, all changes made to the state during the current call are reverted.

- **`require(condition, "Error message")`:** Used for input validation or checking conditions before execution. If the condition is false, it reverts the transaction, refunds the remaining gas, and returns the optional error message. This is the most commonly used error handler.
- **`revert("Error message")`:** Similar to `require`, but used in complex `if/else` logic where `require` might be unreadable. Also refunds remaining gas.
- **`assert(condition)`:** Used to check for internal errors, invariants, and bugs in the contract code. If the condition fails, it means there is a critical bug. It consumes all remaining gas (prior to Solidity 0.8.0, now it uses `revert Panic()` which refunds gas).
- **Custom Errors (Solidity 0.8.4+):** Cheaper alternative to string messages. Used with `revert CustomError()`.
<br>

## 9. What is a `fallback` function and a `receive` function?

These are special functions in Solidity that do not have the `function` keyword and cannot have arguments.

- **`receive() external payable`:** Triggered when the contract receives plain Ether (without any data/calldata). There can be only one `receive` function per contract.
- **`fallback() external [payable]`:** Triggered when a function call does not match any existing function signatures in the contract, or if Ether is sent along with data but there is no `receive` function (or if it's sent with data). 

If a contract is meant to receive Ether directly, it's best practice to implement the `receive` function.
<br>

## 10. Explain the Reentrancy attack and how to prevent it.

A **Reentrancy attack** occurs when a smart contract makes an external call to an untrusted contract, and the untrusted contract recursively calls back into the original contract before the first execution is finished.

This allows the attacker to repeatedly execute a function (like withdrawing funds) before the contract updates its state (like reducing the user's balance).

### How to Prevent It:
1. **Checks-Effects-Interactions Pattern:** Always update the state *before* making any external calls.
    ```solidity
    // BAD
    function withdraw() public {
        uint bal = balances[msg.sender];
        require(bal > 0);
        (bool sent, ) = msg.sender.call{value: bal}("");
        balances[msg.sender] = 0; // State updated AFTER interaction
    }

    // GOOD
    function withdraw() public {
        uint bal = balances[msg.sender];
        require(bal > 0);
        balances[msg.sender] = 0; // State updated BEFORE interaction
        (bool sent, ) = msg.sender.call{value: bal}("");
    }
    ```
2. **Reentrancy Guard:** Use a mutex modifier (like OpenZeppelin's `nonReentrant`) to lock the contract during execution.
<br>

## 11. What is the difference between an abstract contract and an interface?

Both are used to define a contract's structure without fully implementing it, but they have key differences:

- **Interfaces:**
  - Cannot have any implemented functions (all functions are implicitly virtual).
  - Cannot declare state variables.
  - Cannot define constructors.
  - Functions must be marked `external`.
  - Cannot inherit from other contracts (only from other interfaces).

- **Abstract Contracts:**
  - Can have both implemented and un-implemented (virtual) functions.
  - Can declare state variables.
  - Can define constructors.
  - Useful when you want to provide a base implementation but leave specific details to derived contracts.
<br>

## 12. How does inheritance work in Solidity?

Solidity supports multiple inheritance, meaning a contract can inherit from multiple parent contracts.

- Contracts inherit properties and functions from other contracts using the `is` keyword.
- Virtual functions in the parent contract can be overridden by the child contract using the `override` keyword.
- When a contract inherits from multiple contracts, the base contracts are searched from right to left (C3 Linearization). The order of inheritance in the `is` clause is important (from most base-like to most derived).

```solidity
contract Base {
    function foo() public virtual returns (string memory) { return "Base"; }
}

contract Child is Base {
    function foo() public override returns (string memory) { return "Child"; }
}
```
<br>

## 13. What is the purpose of the `constructor` in a smart contract?

A **constructor** is a special function that is executed **only once**, precisely when the contract is created and deployed to the blockchain.

### Purposes:
- Initializing state variables.
- Setting the contract owner (e.g., `owner = msg.sender`).
- Passing initial parameters required for the contract to function correctly.

If no constructor is explicitly defined, the contract uses a default empty constructor.
<br>

## 14. Explain the concept of Gas, Gas Price, and Gas Limit.

In Ethereum, computational resources are not free.

- **Gas:** The unit used to measure the computational effort required to execute operations on the EVM. Every operation (like addition, storing data) costs a specific amount of gas.
- **Gas Price:** The amount of Ether (usually measured in Gwei) the sender is willing to pay *per unit of gas*.
- **Gas Limit:** The maximum amount of gas the sender is willing to consume for a transaction. If the transaction uses more gas than the limit, it fails (runs out of gas), the state is reverted, but the user still pays for the gas consumed up to the limit.

**Transaction Fee = Gas Used * Gas Price**
<br>

## 15. What are mappings in Solidity?

A **mapping** in Solidity acts like a hash table or dictionary in other languages. It consists of key-value pairs.

- They are declared using `mapping(_KeyType => _ValueType)`.
- Keys can be of any built-in value type (like `uint`, `address`, `bytes32`), but not reference types (like structs or arrays).
- Values can be of any type, including other mappings.
- **Important:** Mappings are virtually initialized such that every possible key exists and is mapped to a value whose byte-representation is all zeros (default value). They do not have a length, nor are they iterable.

```solidity
mapping(address => uint256) public balances;

function updateBalance(uint256 newBalance) public {
    balances[msg.sender] = newBalance;
}
```
