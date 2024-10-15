const input = document.getElementById('term');
const button = document.getElementById('search');
const result = document.getElementById('definition');

button.addEventListener('click', function() {
    // Get the term entered by the user
    const term = input.value.trim();

    // Check if the term is empty
    if (!term) {
        result.innerHTML = 'Please enter an English word in the input field.';
        return;
    }
    
    fetchAPI(term);
});

// Function to fetch the definition from the Merriam-Webster API
async function fetchAPI(term) {
    const key = 'c9f2dbf4-b736-484e-8ec2-f89eefd484fb';
    const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${term}?key=${key}`;
    
    try {
        const response = await fetch(url);
        
        // Handle network errors
        if (!response.ok) {
            throw new Error('Network is not responding.');
        }

        const data = await response.json();

        if (data.length > 0 && data[0].shortdef) {
            result.innerHTML = `<span class="bold">Definition:</span> ${data[0].shortdef[0]}`;
        } else {
            // Handle no definition case
            result.innerHTML = 'No definition found.';
        }

    } catch (error) {
        result.innerHTML = `Error: ${error.message}`;
    }
}