// Initialize Howler.js for audio
const sound = new Howl({
    src: ['Voice 010.m4a'], // Add a direct link to your audio file here
    volume: 1.0
});

document.getElementById('sendButton').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value.trim();
    if (userInput) {
        addMessage(userInput, 'user-message');
        handleUserInput(userInput);
        document.getElementById('userInput').value = '';
        document.getElementById('userInput').focus();
    }
});

document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('sendButton').click();
    }
});

function addMessage(text, type) {
    const chatbox = document.getElementById('chatbox');
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    chatbox.appendChild(message);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function handleUserInput(input) {
    // Define FAQ responses
    const faq = {
        'help': 'Here are some things you can ask me:\n' +
                '1. What is electricity?\n' +
                '2. How does electricity cause pollution?\n' +
                '3. How can I save money on my electricity bill?\n' +
                '4. What does this code do?\n' +
                'Type "FAQ" for a detailed list of common questions and answers.',
        'faq': 'Frequently Asked Questions:\n' +
               '1. What is electricity?\n' +
               '   Electricity is a form of energy resulting from the flow of electric charge. It powers most of our modern technology and appliances.\n' +
               '2. How does electricity cause pollution?\n' +
               '   Electricity generation, especially from fossil fuels, releases pollutants like carbon dioxide and sulfur dioxide into the atmosphere, contributing to climate change and air quality issues.\n' +
               '3. How can I save money on my electricity bill?\n' +
               '   Save money by using energy-efficient appliances, unplugging devices when not in use, insulating your home, and using programmable thermostats.\n' +
               '4. What does this code do?\n' +
               '   This code manages user interactions in a chat interface, provides responses based on user input, and plays a sound using Howler.js when a message is sent.\n' +
               'Type "help" for a brief overview of commands.'
    };

    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('help')) {
        response = faq['help'];
    } else if (lowerInput.includes('faq')) {
        response = faq['faq'];
    } else if (lowerInput.includes('electricity')) {
        if (lowerInput.includes('pollution')) {
            response = 'Electricity generation, particularly from fossil fuels like coal and oil, contributes to pollution and climate change. Burning these fuels releases carbon dioxide (CO2) and other pollutants into the atmosphere, which can lead to global warming and environmental degradation.';
        } else if (lowerInput.includes('save money') || lowerInput.includes('reduce electricity usage')) {
            response = 'Reducing electricity usage can save you money in several ways: 1) Use energy-efficient appliances and light bulbs. 2) Unplug devices when not in use. 3) Insulate your home to reduce heating and cooling costs. 4) Utilize programmable thermostats to optimize energy use. 5) Take advantage of natural light during the day.';
        } else {
            response = 'Electricity is essential for powering homes and businesses. It’s crucial to use it efficiently to minimize costs and reduce environmental impact.';
        }
    } else if (lowerInput.includes('code')) {
        response = 'The code you see here manages user interactions and provides responses based on user input. It uses JavaScript for functionality and CSS for styling and animations.';
    } else {
        response = 'I’m sorry, I don’t have an answer to that question. Type "help" for a list of commands or "FAQ" for frequently asked questions.';
    }

    sound.play(); // Play audio on message send
    addMessage(response, 'bot-message');
}
