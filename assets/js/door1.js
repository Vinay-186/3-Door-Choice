    const q = [
    {
        question: "What is the capital of France?",
        answer: "Paris"
    },
    {
        question: "Who is the current President of the United States?",
        answer: "Joe-Biden"
    },
    {
        question: "What is the world's largest ocean?",
        answer: "Pacific-Ocean"
    },
    {
        question: "What is the currency of Japan?",
        answer: "Japanese-yen"
    },
    {
        question: "What is the tallest mountain in the world?",
        answer: "Mount-Everest"
    }
];
    const answerElement = document.querySelectorAll('#q-answer');
    const hintElement = document.querySelectorAll('#q-hint');
    for (let i = 0; i < q.length; i++) {
        const answer = q[i].answer;
        const indices = Array.from({ length: answer.length }, (_, index) => index);
        let count = 0;
        hintElement[i].children[0].addEventListener("click", () => {
            if(indices.length === 0 || count === 4) {
                hintElement[i].children[0].disabled = true;
            }else{
            count++;
            // Generate random position to add character from answer
            const randomPosition = Math.floor(Math.random() * indices.length);
            const element = indices[randomPosition];
            indices.splice(randomPosition, 1);
            // Get the input element at the random position
            const inputElement = answerElement[i].children[element];
            // If the input element is empty, add character from answer
            if (inputElement.value === "") {
                inputElement.value = q[i].answer[element];
            }
            }
        });
    }
let result = document.querySelector('.b1');
result.addEventListener("click", (e) => {
    e.preventDefault();
    let total = 0;
    for(let i = 0; i < q.length; i++){
        const answer = q[i].answer
        let child = answerElement[i].children;
        let ans = '';
        for(let j = 0; j < child.length-1; j++){
            ans += child[j].value;
        }
        console.log(ans);
        if(ans.toLowerCase() === answer.toLowerCase()) total++;
    }
    const input_tag = document.querySelector('#result input');
    input_tag.value = `${total}`;
    const input_hidden = document.querySelector('input[type=hidden]')
    input_hidden.value = total;
    const div_elem = document.querySelector('#g1-submit');
    div_elem.classList.toggle('g1-submit');
    result.disabled = true;
    sessionStorage.setItem('disableButton', true);
});
const form = document.querySelector('#quiz-form'); // Replace with the selector for your form element
form.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { // If enter key is pressed
    e.preventDefault(); // Prevent form submission
  }
});
form.addEventListener('input', (e) => {
  const formData = new FormData(form);
  const formDataJson = JSON.stringify(Object.fromEntries(formData));
  sessionStorage.setItem('formProgress', formDataJson); // Use sessionStorage to save data only for the current session
});

// Retrieve form data and populate form fields on page load
window.addEventListener('DOMContentLoaded', () => {
  const formDataJson = sessionStorage.getItem('formProgress'); // Use sessionStorage to retrieve data saved only for the current session
  if (formDataJson) {
    const formData = JSON.parse(formDataJson);
    const entries = Object.entries(formData);
    for (const [key, value] of entries) {
      const inputField = form.querySelector(`[name="${key}"]`);
      if(key === 'score'){
        const input_tag = document.querySelector('#result input');
        input_tag.value = `${value}`;
      }
      if (inputField) {
        inputField.value = value;
      }
    }
  }
  const disable = sessionStorage.getItem('disableButton'); 
  if(disable){
    result.disabled=true;
    const div_elem = document.querySelector('#g1-submit');
    div_elem.classList.toggle('g1-submit');
  }
});

// Clear form data from sessionStorage when form is submitted
document.querySelector('#logout').addEventListener('click', (e) => {
  sessionStorage.removeItem('formProgress'); // Use sessionStorage to clear data saved only for the current session
  sessionStorage.removeItem('disableButton');
});
answerElement.forEach((group) => {
    const inputs = group.querySelectorAll('input'); // Get input elements within each group

    // Add event listeners to each input element within each group
    inputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            if (value.length === 1) { // If input has reached its maxlength
                if (index < inputs.length - 1) { // If not the last input
                    inputs[index + 1].focus(); // Move focus to next input within the same group
                }
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value === '') { // If backspace is pressed and input is empty
                if (index > 0) { // If not the first input
                    inputs[index - 1].focus(); // Move focus to previous input within the same group
                }
            }
        });
    });
});