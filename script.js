function calculateLoan(event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve user inputs
  var loanAmount = parseFloat(document.getElementById('loanAmount').value);
  var interestRate = parseFloat(document.getElementById('interestRate').value);
  var monthlyPayment = parseFloat(document.getElementById('monthlyPayment').value);

  // Variables for calculations
  var k = 1 / ( 1 + interestRate / 1200 );  

  // Calculate loan duration
  var monthsToPayOff = Math.ceil(Math.log( loanAmount * ( k - 1) / monthlyPayment + k ) / Math.log( k ) - 1)

  // Calculate maximum loan amounts for different payback periods
  var maxLoan30yr = monthlyPayment * k * ( 1 - Math.pow( k, 360 ) ) / ( 1 - k );
  var maxLoan15yr = monthlyPayment * k * ( 1 - Math.pow( k, 240 ) ) / ( 1 - k );
  var maxLoan10yr = monthlyPayment * k * ( 1 - Math.pow( k, 120 ) ) / ( 1 - k );

  // Calculate monthly payments for different payback periods
  var monthlyPayment30yr = loanAmount / k * ( 1 - k ) / ( 1 - Math.pow( k, 360 ) );
  var monthlyPayment15yr = loanAmount / k * ( 1 - k ) / ( 1 - Math.pow( k, 240 ) );
  var monthlyPayment10yr = loanAmount / k * ( 1 - k ) / ( 1 - Math.pow( k, 120 ) );

  // Format dollar amounts with commas
  var formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  var formattedMaxLoan30yr = formatter.format(maxLoan30yr);
  var formattedMaxLoan15yr = formatter.format(maxLoan15yr);
  var formattedMaxLoan10yr = formatter.format(maxLoan10yr);
  var formattedMonthlyPayment30yr = formatter.format(monthlyPayment30yr);
  var formattedMonthlyPayment15yr = formatter.format(monthlyPayment15yr);
  var formattedMonthlyPayment10yr = formatter.format(monthlyPayment10yr);

  // Display the results
  var resultElement = document.getElementById('result');
  resultElement.innerHTML = 
    "Months to pay off: " + monthsToPayOff + "<br><br>" +
    "Given the interest rate and monthly payments:" + "<br>" +
    "Max loan amount for 30yr: " + formattedMaxLoan30yr + "<br>" +
    "Max loan amount for 15yr: " + formattedMaxLoan15yr + "<br>" +
    "Max loan amount for 10yr: " + formattedMaxLoan10yr + "<br><br>" +
    "Given the interest rate and loan amount:" + "<br>" +
    "Monthly payment for 30yr: " + formattedMonthlyPayment30yr + "<br>" +
    "Monthly payment for 15yr: " + formattedMonthlyPayment15yr + "<br>" +
    "Monthly payment for 10yr: " + formattedMonthlyPayment10yr;
}
