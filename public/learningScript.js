document.addEventListener('DOMContentLoaded', function () {
    const answerInput = document.getElementById('answerInput');
    const answerContainer = document.getElementById('answerContainer');
    const qaSeparator = document.getElementById('qaSeparator');
    const cardAnswer = document.getElementById("answer");
    const answerFromInput = document.getElementById("answerFromInput");
    const cardsContainer = document.getElementById('cardsContainer');
    const cardsArrJSON = cardsContainer.getAttribute('cardsArrJson');
    let cardsArr = JSON.parse(cardsArrJSON);
    


    function getPromiseFromEvent(item, event) {
      return new Promise((resolve) => {
        const listener = (e) => {
          item.removeEventListener(event, listener);
          resolve(e);
        };
        item.addEventListener(event, listener);
      });
    }

    async function waitForEnter(){
      let userInput = '';
      console.log("1");
      while (userInput !== 'Enter') { 
        const event = await getPromiseFromEvent(answerInput, 'keyup');
        console.log(event);

        userInput += event.key;

        if (event.key !== 'Enter') {
          userInput = ''; 
        }
      }
      const card = cardsArr[0];
      const answerValue = answerInput.value; 
        answerInput.style.display = "none";
        cardAnswer.style.display = "block";
        cardAnswer.innerHTML = `${card.answer}`;
        answerFromInput.innerHTML = `${answerValue}`
        answerFromInput.style.display = "block";
        answerContainer.style.display = "flex";
        qaSeparator.style.display = "block";
        //натискання 1,2,3 
        answerContainer.focus();


    };


    async function waitForAnswer(){
      let userInput = '';
      while (userInput !== '1' && userInput !== '2' && userInput !== '3') { 
        userInput = '';
        console.log("answewr While")
        const event = await getPromiseFromEvent(answerContainer, 'keyup');
        userInput = event.key;
        console.log(userInput);
        console.log(cardsArr);
      }
      if(userInput == '1'){

      }
      else if(userInput == '2'){
        cardsArr.push(cardsArr[0]);
          cardsArr.splice(0, 1);
          console.log(cardsArr);
      }
      else if(userInput == '3'){
        cardsArr.splice(0, 1);
      }

    }



  async function processCards() {
      while(cardsArr.length != 0) {
        console.log("while");
        const card = cardsArr[0];
        answerInput.value ="";
        answerInput.style.display = "block";
        cardAnswer.style.display = "none";
        answerFromInput.style.display = "none";
        answerContainer.style.display = "none";
        qaSeparator.style.display = "none";
        answerInput.focus();
        
        const questionField = document.getElementById("question");
        questionField.innerHTML = `${card.question}`;
          
        await waitForEnter();
        await waitForAnswer();


    }};

    
   processCards();
  });


