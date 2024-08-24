const GENERAL_LIMIT = 500; // kWh for general usage
const DAILY_LIMIT = 15; // kWh per day
const WEEKLY_LIMIT = 100; // kWh per week
const MONTHLY_LIMIT = 400; // kWh per month

let addressData = [];

function playBeep() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    setTimeout(() => oscillator.stop(), 500);
}

function displayAdvisory() {
    alert('To reduce electricity usage, consider using fewer appliances or optimizing their usage.');
}

function calculateUsage() {
    const usageInput = document.getElementById('usage').value;
    const resultDiv = document.getElementById('result');

    if (usageInput === '') {
        resultDiv.textContent = 'Please enter your electricity usage.';
        resultDiv.style.color = 'red';
        return;
    }

    const usage = parseFloat(usageInput);

    if (isNaN(usage) || usage < 0) {
        resultDiv.textContent = 'Please enter a valid number.';
        resultDiv.style.color = 'red';
        return;
    }

    if (usage > GENERAL_LIMIT) {
        resultDiv.textContent = 'Your usage exceeds the general limit!';
        resultDiv.style.color = 'red';
        playBeep();
        displayAdvisory();
    } else {
        resultDiv.textContent = 'Your usage is within the limit.';
        resultDiv.style.color = 'green';
    }
}

function calculatePeriodUsage() {
    const dailyUsage = parseFloat(document.getElementById('dailyUsage').value) || 0;
    const weeklyUsage = parseFloat(document.getElementById('weeklyUsage').value) || 0;
    const monthlyUsage = parseFloat(document.getElementById('monthlyUsage').value) || 0;
    const resultDiv = document.getElementById('periodResult');

    if (dailyUsage > DAILY_LIMIT) {
        resultDiv.textContent += 'Daily usage exceeds the limit.\n';
    }
    if (weeklyUsage > WEEKLY_LIMIT) {
        resultDiv.textContent += 'Weekly usage exceeds the limit.\n';
    }
    if (monthlyUsage > MONTHLY_LIMIT) {
        resultDiv.textContent += 'Monthly usage exceeds the limit.\n';
    }

    if (resultDiv.textContent === '') {
        resultDiv.textContent = 'All usages are within the limits.';
        resultDiv.style.color = 'green';
    } else {
        resultDiv.style.color = 'red';
    }
}

function addAddress() {
    const newAddress = document.getElementById('newAddress').value.trim();
    const newUsage = parseFloat(document.getElementById('newUsage').value) || 0;

    if (newAddress === '' || isNaN(newUsage) || newUsage < 0) {
        alert('Please enter a valid address and usage.');
        return;
    }

    addressData.push({ address: newAddress, usage: newUsage });
    alert('Address added successfully.');
}

function compareAddresses() {
    const comparisonResult = document.getElementById('comparisonResult');
    if (addressData.length < 2) {
        comparisonResult.textContent = 'At least two addresses are required for comparison.';
        comparisonResult.style.color = 'red';
        return;
    }

    let comparisonText = 'Address Comparison:\n';
    addressData.forEach((data, index) => {
        comparisonText += `Address ${index + 1}: ${data.address} - Usage: ${data.usage} kWh\n`;
    });

    comparisonResult.textContent = comparisonText;
    comparisonResult.style.color = 'blue';
}

function openGoogleMaps() {
    const address = document.getElementById('address').value;
    if (address) {
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        window.open(url, '_blank');
    } else {
        alert('Please enter an address first.');
    }
}
