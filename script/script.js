"use strict";
// miquery
const Select = (selector) => ({
  // Add event listner to selector
  on: (event, callback) => {
    if (selector.includes("#")) {
      document.querySelector(selector).addEventListener(event, callback);
    }
    else {
      document.querySelectorAll(selector).forEach(element => {
        element.addEventListener(event, callback)
      });
    }
  },
  // Set input value
  setHtml: (html) => {
    if (selector.includes("#")) {
      document.querySelector(selector).innerHTML = html;
    }
    else {
      document.querySelectorAll(selector).forEach(element => {
        element.innerHTML = html;
      });
    }
  },
  // Set input value
  setVal: (value) => {
    if (selector.includes("#")) {
      document.querySelector(selector).value = value;
    }
    else {
      document.querySelectorAll(selector).forEach(element => {
        element.value = value;
      });
    }
  },
  // Get input value
  getVal: (value) => {
    if (selector.includes("#")) {
      return document.querySelector(selector).value;
    }
    else {
      document.querySelectorAll(selector).forEach(element => {
        return element.value;
      });
    }
  },
  // Set Css
  setStyle: (css) => {
    if (selector.includes("#")) {
      document.querySelector(selector).style.cssText = css;
    }
    else {
      document.querySelectorAll(selector).forEach(element => {
        element.style.cssText = css;
      });
    }
  },
  // Check Checkbox is clicked or not
  isChecked: (check) => {
    if (selector.includes("#")) {
      return document.querySelector(selector).checked;
    }
    else {
      document.querySelectorAll(selector).forEach(element => {
        return element.checked;
      });
    }
  },
  // Check Checkbox is clicked or not
  isNotChecked: (check) => {
    if (selector.includes("#")) {
      return document.querySelector(selector).checked == false;
    }
    else {
      document.querySelectorAll(selector).forEach(element => {
        return element.checked == false;
      });
    }
  },
  setChecked: (check) => {
    if (selector.includes("#")) {
      return document.querySelector(selector).checked == true;
    }
    else {
      document.querySelectorAll(selector).forEach(element => {
        return element.checked == true;
      });
    }
  },
});
// Generate on page load
document.body.onload = () => {
  GeneratePass();

  // Get the input element
  let input = document.getElementById("range");

  // Add an event listener for input change
  input.addEventListener("input", function () {

    if (this.value.toString().length > 1) {

      if (parseInt(this.value) > parseInt(this.max)) {
        this.value = this.max;
      } else if (parseInt(this.value) < parseInt(this.min)) {
        this.value = this.min;
      }
    }

  });


  document.getElementById('year').innerHTML = new Date().getFullYear();
}
// Regex check password validity
const checkPassword = (pass) => {
  var password = pass;
  // Check password if number is checked
  if (Select('#number').isChecked()) {
    if (password.search(/[0-9]/) < 0) {
      return false;
    }
  }
  // Check password if uppercase is checked
  if (Select('#uppercase').isChecked()) {
    if (password.search(/[A-Z]/) < 0) {
      return false;
    }
  }
  // Check password if lowercase is checked
  if (Select('#lowercase').isChecked()) {
    if (password.search(/[a-z]/) < 0) {
      return false;
    }
  }
  // Check password if symbol is checked
  if (Select('#symbol').isChecked()) {
    if (password.search(/[!@#$%&*()+]/) < 0) {
      return false;
    }
  }
  return true;
}
// Generate random password
const ranDom = () => {
  var password = "";
  var UpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var LowerCase = "abcdefghijklmnopqrstuvwxyz";
  var Number = "0123456789";
  var Symbol = "!@#$%&*()+";
  var Count = Select('#range').getVal();
  var result = "";

  if (Count > 30) {
    Count = 30;
  } else if (Count < 4) {
    Count = 4;
  }

  // Include uppercase var if uppercase is checked
  if (Select('#uppercase').isChecked()) {
    var password = password.concat(UpperCase);
  }
  // Include lowercase var if lowercase is checked
  if (Select('#lowercase').isChecked()) {
    var password = password.concat(LowerCase);
  }
  // Include number var if number is checked
  if (Select('#number').isChecked()) {
    var password = password.concat(Number);
  }
  // Include symbol var if symbol is checked
  if (Select('#symbol').isChecked()) {
    var password = password.concat(Symbol);
  }
  const charactersLength = password.length;
  // Loop to generate password
  for (let i = 0; i < Count; i++) {
    result += password.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
// Password Generator
const GeneratePass = () => {
  const random = ranDom();
  if (checkPassword(random)) {
    // Set The Progress
    setProgress();
    // Set password value
    return Select('#password').setVal(random);
  }
  return GeneratePass();
}
// Progess Bar
const setProgress = () => {
  if (Select('#range').getVal() <= 4) {
    Select('.bar').setStyle('background-color : #dc3545; width: 30%');
  }
  else if (Select('#range').getVal() <= 8) {
    Select('.bar').setStyle('background-color : #ffc107;  width: 50%');
  }
  else if (Select('#range').getVal() >= 12) {
    Select('.bar').setStyle('background-color : #198754;  width: 100%');
  }
  else {
    var value = Select('#range').getVal();
    Select('.bar').setStyle('background-color : #ffc107;  width: ' + value + '');
  }
}
// On Click Generate
Select('.re-generate-button').on("click", () => {
  GeneratePass();
});
// On Click Copy
Select('.copy-button').on("click", () => {
  // Copy to clip board
  navigator.clipboard.writeText(Select('#password').getVal());
  ShowNotification("Password ''" + Select('#password').getVal() + "'' copied to your clipboard");
});
// Prevent 
Select('input[type="checkbox"]').on('click', (e) => {
  if (!Select('#uppercase').isChecked() && !Select('#lowercase').isChecked() && !Select('#number').isChecked() && !Select('#symbol').isChecked()) {
    e.preventDefault();
    return false;
  }
});

// On any input change
Select('input').on('input', () => {
  GeneratePass();
});

// On range change
Select('#range').on("input", () => {
  Select('#slide').setVal(Select('#range').getVal());
  /*GeneratePass();*/
});
// On Slider change
Select('#slide').on("input", () => {
  Select('#range').setVal(Select('#slide').getVal());
  GeneratePass();
});
// Show Notification
const ShowNotification = (text) => {
  Select('.notification').setStyle('display:block');
  Select('.notification').setHtml(text);
  setTimeout(HideNotification, 3000);
}
// Hide Notification
const HideNotification = () => {
  Select('.notification').setStyle('display:none');
}
