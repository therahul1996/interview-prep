# Big O Notation: Time and Space Complexity Guide

### Table of Contents

| No. | Questions |
|---- | --------- |
| 1 | [Constant Time: $O(1)$](#1-constant-time-o1) |
| 2 | [Logarithmic Time: $O(\log n)$](#2-logarithmic-time-o\log-n) |
| 3 | [Linear Time: $O(n)$](#3-linear-time-on) |
| 4 | [Linearithmic Time: $O(n \log n)$](#4-linearithmic-time-on-\log-n) |
| 5 | [Quadratic Time: $O(n^2)$](#5-quadratic-time-on2) |
| 6 | [Exponential Time: $O(2^n)$](#6-exponential-time-o2n) |
| 7 | [Factorial Time: $O(n!)$](#7-factorial-time-on) |
| 1 | [Constant Space: $O(1)$](#1-constant-space-o1) |
| 2 | [Linear Space: $O(n)$](#2-linear-space-on) |
| 3 | [Quadratic Space: $O(n^2)$](#3-quadratic-space-on2) |
| 4 | [Logarithmic Space: $O(\log n)$](#4-logarithmic-space-o\log-n) |


A comprehensive cheat sheet for understanding algorithm performance in JavaScript. This repository serves as a quick reference for the most common time and space complexities.

## 🚀 Complexity Overview

| Notation | Name | Growth Rate | Verdict |
| :--- | :--- | :--- | :--- |
| **$O(1)$** | Constant | Stable | Excellent |
| **$O(\log n)$** | Logarithmic | Very Slow Growth | Excellent |
| **$O(n)$** | Linear | Proportional | Fair |
| **$O(n \log n)$** | Linearithmic | Moderate Growth | Good/Fair |
| **$O(n^2)$** | Quadratic | Fast Growth | Poor |
| **$O(2^n)$** | Exponential | Doubling Growth | Very Poor |
| **$O(n!)$** | Factorial | Exploding Growth | Disastrous |

---

## ⏱️ Time Complexity Examples (JavaScript)

### 1. Constant Time: $O(1)$
The execution time remains the same regardless of input size.
```javascript
function getFirst(arr) {
  return arr[0]; 
}
```

### 2. Logarithmic Time: $O(\log n)$
The problem size is halved in each step. Common in binary searches.
```javascript
function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    arr[mid] < target ? low = mid + 1 : high = mid - 1;
  }
  return -1;
}
```

### 3. Linear Time: $O(n)$
Performance scales 1:1 with the input size.
```javascript
function findItem(arr, target) {
  for (let item of arr) {
    if (item === target) return true;
  }
  return false;
}
```

### 4. Linearithmic Time: $O(n \log n)$
The standard for efficient sorting algorithms like Merge Sort or Quick Sort.
```javascript
function sortArray(arr) {
  // Built-in sort uses an O(n log n) algorithm
  return [...arr].sort((a, b) => a - b);
}
```

### 5. Quadratic Time: $O(n^2)$
Commonly seen with nested loops. Performance drops significantly with large data.
```javascript
function printPairs(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      console.log(arr[i], arr[j]);
    }
  }
}
```

### 6. Exponential Time: $O(2^n)$
Growth doubles with each addition to the input.
```javascript
function recursiveFib(n) {
  if (n <= 1) return n;
  return recursiveFib(n - 1) + recursiveFib(n - 2);
}
```

### 7. Factorial Time: $O(n!)$
The worst-case scenario for performance, often found in permutations.
```javascript
function permutations(str) {
  if (str.length <= 1) return [str];
  const result = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const remaining = str.slice(0, i) + str.slice(i + 1);
    for (let perm of permutations(remaining)) {
      result.push(char + perm);
    }
  }
  return result;
}
```

---

## 💾 Space Complexity Examples (JavaScript)

Space complexity measures the total amount of memory that an algorithm or operation needs to run according to its input size.

### 1. Constant Space: $O(1)$
The memory required does not grow with the input size. Variables and simple loops usually take $O(1)$ space.
```javascript
function sumArray(arr) {
  let sum = 0; // O(1) space
  for(let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
```

### 2. Linear Space: $O(n)$
Memory usage grows proportionally with the input size. Typically allocating a new array or utilizing the call stack sequentially.
```javascript
function copyArray(arr) {
  const newArr = []; // O(n) space
  for (let item of arr) {
    newArr.push(item);
  }
  return newArr;
}
```

### 3. Quadratic Space: $O(n^2)$
Memory usage grows quadratically. Often seen when creating a 2D matrix (array of arrays).
```javascript
function createMatrix(n) {
  const matrix = []; // O(n^2) space overall
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      row.push(0);
    }
    matrix.push(row);
  }
  return matrix;
}
```

### 4. Logarithmic Space: $O(\log n)$
Often found in recursive algorithms where the maximum depth of the call stack relies on half of the input at a time, like Recursive Binary Search.
```javascript
function recursiveBinarySearch(arr, target, low = 0, high = arr.length - 1) {
  // The call stack depth is at most O(log n)
  if (low > high) return -1;
  let mid = Math.floor((low + high) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] > target) return recursiveBinarySearch(arr, target, low, mid - 1);
  return recursiveBinarySearch(arr, target, mid + 1, high);
}
```

---

## 🧠 Quick Tips
- **Time vs. Space Trade-off:** Often, you will need to choose between optimizing an algorithm for time (speed) or space (memory). E.g., utilizing a Hash Map saves time ($O(1)$ lookups) but takes more space ($O(n)$).
- **Ignore Constants:** In Big O notation, constants are dropped. E.g., $O(2n)$ simplifies to $O(n)$.
- **Base in Logarithms:** The base of logarithms is mostly ignored ($O(\log_2 n)$ is written as $O(\log n)$) because all logarithms are proportional to each other by a constant factor.

---

> 💡 **Tip:** Star this repo if you find it helpful, and revisit often — more questions are added regularly.

**[⬆ Back to Top](#)**