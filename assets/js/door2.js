const jum = [
    { jumble: "wolb", answer: "blow" },
    { jumble: "knurt", answer: "trunk" },
    { jumble: "ginnaer", answer: "earning" },
    { jumble: "ritp", answer: "trip" },
    { jumble: "rrufly", answer: "flurry" }
  ];
  const wordList = [
    "Sudden burst of air or impact.",
    "Sensory part of an elephant's body.",
    "Money or income obtained from work or investments.",
    "Journey usually for leisure.",
    "Brief period of activity, excitement, or commotion."
  ];
  
    const answerElement2 = document.querySelectorAll('div#j-answer');
    const hintElement2 = document.querySelectorAll('#j-hint');
    const ps = document.querySelectorAll('ul li p');
    for(let i = 0; i < hintElement2.length; i++){
        for(let j of hintElement2[i].children){
            j.addEventListener('click', () =>{
                ps[i].textContent = `Hint ${i+1} : ${wordList[i]}`;
                ps[i].classList.toggle('p-hints');
            })
        }
    }
let result2 = document.querySelector('.g2-b1');
result2.addEventListener("click", (e) => {
    e.preventDefault();
    let total = 0;
    for(let i = 0; i < jum.length; i++){
        const answer = jum[i].answer
        let child = answerElement2[i].children;
        let ans = '';
        for(let c of child){
            ans += c.value;
        }
        if(ans.toLowerCase() === answer.toLowerCase()) total++;
    }
    const input_tag = document.querySelector('#j-result input');
    input_tag.value = `${total}`;
    const input_hidden = document.querySelector('input[type=hidden]')
    input_hidden.value = total;
    const div_elem = document.querySelector('#g2-submit');
    div_elem.classList.toggle('g2-submit');
    result2.disabled = true;
    sessionStorage.setItem('disableButton1', true);
});
const form1 = document.querySelector('#g2-quiz-form'); // Replace with the selector for your form element
form1.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { // If enter key is pressed
    e.preventDefault(); // Prevent form submission
  }
});
form1.addEventListener('input', (e) => {
  const formData = new FormData(form1);
  const formDataJson = JSON.stringify(Object.fromEntries(formData));
  sessionStorage.setItem('formProgress', formDataJson); // Use sessionStorage to save data only for the current session
});

// // Retrieve form data and populate form fields on page load
window.addEventListener('DOMContentLoaded', () => {
  const formDataJson = sessionStorage.getItem('formProgress'); // Use sessionStorage to retrieve data saved only for the current session
  if (formDataJson) {
    const formData = JSON.parse(formDataJson);
    const entries = Object.entries(formData);
    for (const [key, value] of entries) {
      const inputField = form1.querySelector(`[name="${key}"]`);
    //   if(key === 'score'){
    //     const input_tag = document.querySelector('#result input');
    //     input_tag.value = `${value}`;
    //   }
      if (inputField) {
        inputField.value = value;
      }
    }
  }
  const disable = sessionStorage.getItem('disableButton1'); 
  console.log(disable);
  if(disable){
    result2.disabled=true;
    const div_elem = document.querySelector('#g2-submit');
    div_elem.classList.toggle('g2-submit');
  }
});

// // Clear form data from sessionStorage when form is submitted
document.querySelector('#logout').addEventListener('click', (e) => {
  sessionStorage.removeItem('formProgress'); // Use sessionStorage to clear data saved only for the current session
  sessionStorage.removeItem('disableButton1');
});
answerElement2.forEach((group) => {
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