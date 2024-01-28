document.getElementById('saveApiKey').addEventListener('click', function() {
    const apiKey = document.getElementById('apiKey').value;
    localStorage.setItem('deepLApiKey', apiKey);
    alert('API Key Saved!');
});

document.getElementById('translate').addEventListener('click', function() {
    const textToTranslate = document.getElementById('inputText').value;
    const apiKey = localStorage.getItem('deepLApiKey');
    if(apiKey && textToTranslate.trim() !== '') {
        translateText(textToTranslate, apiKey);
    } else {
        alert('Please ensure you have an API key saved and text to translate.');
    }
});

function translateText(text, apiKey) {
    // DeepL API URL
    const apiUrl = 'https://api.deepl.com/v2/translate';

    // API request parameters
    const params = new URLSearchParams();
    params.append('auth_key', apiKey);
    params.append('text', text);
    params.append('target_lang', 'PT'); // You can change target language as needed

    // Making the API request
    fetch(apiUrl, {
        method: 'POST',
        body: params,
    })
    .then(response => response.json())
    .then(data => {
        if(data.translations && data.translations.length > 0) {
            document.getElementById('inputText').value = data.translations[0].text;
        } else {
            throw new Error('Translation failed or no translations available.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while translating: ' + error.message);
    });
}
