// site.js

function createAmortization() {
  // create a loan object with loan amount, loan term in months,
  // and loan rate in percent
  let amount = document.getElementById("loanAmount").value;
  let term = document.getElementById("loanTerm").value;
  let rate = document.getElementById("loanRate").value;

  // create table with loan object
  let aTable = createTable(amount, term, rate);
  displayTable(aTable);
  //
}

function createTable(amount, term, rate) {
  let amortizationTable = [];
  // tableRow object:
  // {
  //   Month: int,
  //   Payment: float,
  //   Principal: float,
  //   Interest: float,
  //   TotalInterest: float
  //   Balance: float
  // }

  // make copies by value of amount
  let balance = amount.valueOf();
  let totalCost = parseFloat(amount.valueOf());
  let payment = (balance * (rate / 1200)) / (1 - (1 + rate / 1200) ** -term);
  let principal = 0;
  let interest = 0;
  let interestTotal = 0;

  // iterate through amortizationTable and push calcualted tableRow
  //    for each month
  // return an amortization array of row objects
  for (let i = 0; i < term; i++) {
    let tableRow = {};
    tableRow["Month"] = i + 1;
    interest = balance * (rate / 1200);
    interestTotal += interest;
    principal = payment - interest;
    balance -= principal;

    tableRow["Payment"] = payment.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    tableRow["Principal"] = principal.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    tableRow["Interest"] = interest.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    tableRow["TotalInterest"] = interestTotal.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    tableRow["Balance"] = Math.abs(balance).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    amortizationTable.push(tableRow);
  }

  // format and display Loan Summary section
  document.getElementById(
    "totalPrincipal"
  ).innerHTML = `${totalCost.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })}`;

  totalCost += parseFloat(interestTotal);
  document.getElementById(
    "monthlyPayment"
  ).innerHTML = `${payment.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })}`;

  document.getElementById(
    "totalInterest"
  ).innerHTML = `${interestTotal.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })}`;

  document.getElementById("totalCost").innerHTML = `${totalCost.toLocaleString(
    "en-US",
    { style: "currency", currency: "USD" }
  )}`;

  return amortizationTable;
}

// monthlyPayment.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

function displayTable(tableArray) {
  const template = document.getElementById("amortTemplate");
  const aData = document.getElementById("amortData");
  aData.innerHTML = "";
  let length = tableArray.length;
  for (let i = 0; i < length; i++) {
    const amortRow = document.importNode(template.content, true);
    const amortCols = amortRow.querySelectorAll("td");
    amortCols[0].textContent = tableArray[i].Month;
    amortCols[1].textContent = tableArray[i].Payment;
    amortCols[2].textContent = tableArray[i].Principal;
    amortCols[3].textContent = tableArray[i].Interest;
    amortCols[4].textContent = tableArray[i].TotalInterest;
    amortCols[5].textContent = tableArray[i].Balance;
    aData.appendChild(amortRow);
  }
}
