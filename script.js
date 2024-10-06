const apiKey = '0420ace50535adb6f3aab189ed30aa17'; // Ganti dengan API key Anda dari apilayer.net
const searchBtn = document.getElementById('searchBtn');
const result = document.getElementById('result');

searchBtn.addEventListener('click', async () => {
    const phoneNumber = document.getElementById('phoneNumber').value;

    if(!phoneNumber) {
        result.innerText = "Please enter a phone number.";
        return;
    }
    
    const url = `https://api.apilayer.com/phone_validation/validate?number=${phoneNumber}`;
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'apikey': apiKey
            }
        });

        const data = await response.json();
        
        if(data.valid) {
            result.innerHTML = `
                <strong>Number:</strong> ${data.international_format}<br>
                <strong>Carrier:</strong> ${data.carrier}<br>
                <strong>Location:</strong> ${data.location}<br>
                <strong>Country:</strong> ${data.country_code}<br>
            `;
        } else {
            result.innerText = "Invalid phone number.";
        }
    } catch (error) {
        result.innerText = `Error: ${error.message}`;
    }
});