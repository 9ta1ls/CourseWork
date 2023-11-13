document.addEventListener('DOMContentLoaded', function () {
    const answerInput = document.getElementById('answerInput');
    const answerContainer = document.getElementById('answerContainer');
    const qaSeparator = document.getElementById('qaSeparator');
    const cardAnswer = document.getElementById("answer");
    const answerFromInput = document.getElementById("answerFromInput");
    const cardsContainer = document.getElementById('cardsContainer');
    const cardsArrJSON = cardsContainer.getAttribute('cardsArrJson');
    let cardsArr = JSON.parse(cardsArrJSON);
    

    async function answerFunc(event) {
      if (event.key === "2") {
          cardsArr.push(cardsArr[0]);
          cardsArr.splice(0, 1);
          console.log(cardsArr);
          
      } else if (event.key === "3") {
          cardsArr.splice(0, 1);
          
      } else if (event.key === "1") {
          
      }
      answerContainer.removeEventListener("keyup", answerFunc);
  }
    async function answerContainerPromise() {
      await new Promise(resolve => {
        answerContainer.addEventListener("keyup", answerFunc);
    });
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

        //Натискання enter
          

          await new Promise(resolve => {
            answerInput.addEventListener("keyup",async function(event) {
              if (event.key === "Enter") {
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
                      await answerContainerPromise();
                      resolve();
                  }
              });
          });
    }};

    
   processCards();
  });


