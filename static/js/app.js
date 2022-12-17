function evaluate(str) {
  function splitStringArithmetic(str) {
    var index = 0;
    var splitArray = str.split("").reduce((arr, v, i) => {
      if (isNaN(parseInt(v))) {
        arr.push(str.slice(index, i));
        arr.push(v);
        index = i + 1;
      }
      return arr;
    }, []);
    splitArray.push(str.slice(index));
    return splitArray;
  }

  function findMultIndex(arr) {
    return arr.findIndex((i) => i == "*");
  }

  function findDivIndex(arr) {
    return arr.findIndex((i) => i == "/");
  }

  function findAddIndex(arr) {
    return arr.findIndex((i) => i == "+");
  }

  function findSubIndex(arr) {
    return arr.findIndex((i) => i == "-");
  }

  function multiply(arr) {
    var index = findMultIndex(arr);
    arr[index] = parseInt(arr[index - 1]) * parseInt(arr[index + 1]);
    return arr.filter((c, i) => {
      return i !== index - 1 && i !== index + 1;
    });
  }

  function divide(arr) {
    var index = findDivIndex(arr);
    arr[index] = parseInt(arr[index - 1]) / parseInt(arr[index + 1]);
    return arr.filter((c, i) => {
      return i !== index - 1 && i !== index + 1;
    });
  }

  function add(arr) {
    var index = findAddIndex(arr);
    arr[index] = parseInt(arr[index - 1]) + parseInt(arr[index + 1]);
    return arr.filter((c, i) => {
      return i !== index - 1 && i !== index + 1;
    });
  }

  function subtract(arr) {
    var index = findSubIndex(arr);
    arr[index] = parseInt(arr[index - 1]) - parseInt(arr[index + 1]);
    return arr.filter((c, i) => {
      return i !== index - 1 && i !== index + 1;
    });
  }

  function containsMultOrDiv(arr) {
    return arr.some((i) => i === "*" || i === "/");
  }

  function containsAddOrSub(arr) {
    return arr.some((i) => i === "+" || i === "-");
  }

  function simplify(arr) {
    while (containsMultOrDiv(arr)) {
      if (arr.includes("*")) {
        if (arr.includes("/")) {
          if (findDivIndex(arr) < findMultIndex(arr)) {
            arr = divide(arr);
          } else {
            arr = multiply(arr);
          }
        } else {
          arr = multiply(arr);
        }
      } else {
        arr = divide(arr);
      }
    }
    while (containsAddOrSub(arr)) {
      if (arr.includes("+")) {
        if (arr.includes("-")) {
          if (findSubIndex(arr) < findAddIndex(arr)) {
            arr = subtract(arr);
          } else {
            arr = add(arr);
          }
        } else {
          arr = add(arr);
        }
      } else {
        arr = subtract(arr);
      }
    }
    return arr;
  }

  var arithmeticArray = splitStringArithmetic(str);

  return simplify(arithmeticArray);
}

(function () {
  let screen = document.querySelector(".screen");
  let buttons = document.querySelectorAll(".btn");
  let equal = document.querySelector(".btn-equal");
  let clear = document.querySelector(".btn-clear");

  // Activate the button click to appear on the screen
  buttons.forEach(function (button) {
    // if action done on any button
    button.addEventListener("click", function (e) {
      let value = e.target.dataset.num;
      screen.value += value;
    });
  });

  equal.addEventListener("click", function (e) {
    // In clase the screen is empty
    if (screen.value === "") {
      screen.value = "";
    } else {
      // In case screen got a value
      // calculate the choosen operation
      // let answer = eval(screen.value);
      // show the answer on screen
      screen.value = evaluate(screen.value)[0];
      // setTimeout(() => {
      //   screen.value = evaluate(screen.value)[0];
      // }, 5000);
    }
  });

  clear.addEventListener("click", function (e) {
    screen.value = "";
  });
})();
