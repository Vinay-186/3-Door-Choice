const span = document.querySelector('#colorWord');
const userInputList = ['red', 'green', 'blue', 'yellow', 'orange'];
const colorWordList = ['pink', 'purple', 'brown', 'grey', 'orange'];
const user = document.querySelector('#userInput');
const button = document.querySelector('#door-3-btn');
const h4 = document.querySelector('#score');
const start = document.querySelector('#start');
const submit = document.querySelector('#g3-submit');
let timeLeft = sessionStorage.getItem('timeLeft') || 30; // Retrieve timeLeft from sessionStorage or set it to 30
let total = sessionStorage.getItem('total') || 0; // Retrieve total from sessionStorage or set it to 0
const toTitleCase = (str) => {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
button.addEventListener('click', ()=>{
    if(user.value.toLowerCase() === span.style.color.toLowerCase()){
        total++;
    }
    h4.textContent = `Score : ${total}`;
    span.textContent = toTitleCase(getRandomUserInputWord());
    span.style.color = getRandomColorWord();
    user.value = '';
    sessionStorage.setItem('')
    sessionStorage.setItem('total', total); // Store total in sessionStorage
})
user.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { // Check if key code is 13 (Enter key)
        // Trigger click event on button element
        button.click();
    }
});

// Get a random word from the user input list
const getRandomUserInputWord = () => {
    const randomIndex = Math.floor(Math.random() * userInputList.length);
    return userInputList[randomIndex];
};

// Get a random word from the color word list
const getRandomColorWord = () => {
    const randomIndex = Math.floor(Math.random() * colorWordList.length);
    return colorWordList[randomIndex];
};
start.addEventListener('click', () =>{
    const countdown = () => {
        if (timeLeft == -1) {
            clearTimeout(timerId);
            button.disabled = true;
            submit.disabled = false;
            const resultbox = document.querySelector('.g3-result');
            resultbox.value = total;
        } else {
            elem.textContent = `${timeLeft} seconds remaining`;
            timeLeft--;
            sessionStorage.setItem('timeLeft', timeLeft); // Store timeLeft in sessionStorage
        }
    };
    button.disabled = false;
    let elem = document.querySelector('#timer');
    let timerId = setInterval(countdown, 1000);
    console.log(elem);
    start.disabled = true;
})
document.querySelector('#logout').addEventListener('click', (e) => {
    sessionStorage.removeItem('timeLeft'); // Use sessionStorage to clear data saved only for the current session
    sessionStorage.removeItem('total');
  });
// Check if page is refreshed and trigger click event on start element
const navigationEntries = performance.getEntriesByType('navigation');
if (navigationEntries.length > 0 && navigationEntries[0].type === 'reload') {
    start.click();
    h4.textContent = `Score : ${total}`;
}