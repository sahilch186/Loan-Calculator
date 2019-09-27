//Listen for Submit
document.querySelector('#loan-form').addEventListener('submit', function (e) {
    //Hide Results
    document.getElementById('result').style.display = 'none';

    //Show Loader
    document.getElementById('loading').style.display = 'block';

    //Hide Loader after 2 Seconds
    setTimeout(calculateResults, 2000)

    e.preventDefault();
});

//Calculate Results
function calculateResults() {

    //UI Variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    //Input Values
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;

    //Calculate Payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2);

        //Show Results
        document.getElementById('result').style.display = 'block';

        //Hide Loader
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check your Numbers');
    }
}

//Error
function showError(error) {
    //Hide Results
    document.getElementById('result').style.display = 'none';

    //Hide Loader
    document.getElementById('loading').style.display = 'none';

    //Create Div
    const errorDiv = document.createElement('div');

    //Get Card & Heading Element
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //Add Class to errorDiv
    errorDiv.className = 'alert alert-danger';

    //Create Text Node and append to Div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert Error above Heading
    card.insertBefore(errorDiv, heading);

    //Remove Error after 3 Seconds
    setTimeout(clearError, 3000);
}

//Clear Alert
function clearError() {
    document.querySelector('.alert').remove();
}