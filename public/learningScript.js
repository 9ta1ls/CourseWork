document.addEventListener('DOMContentLoaded', function () {
    const answerInput = document.getElementById('answerInput');
    const answerContainer = document.getElementById('answerContainer');
    const qaSeparator = document.getElementById('qaSeparator');
    const cardAnswer = document.getElementById("answer");
    const answerFromInput = document.getElementById("answerFromInput");
    const cardsContainer = document.getElementById('cardsContainer');
    const cardsArrJSON = cardsContainer.getAttribute('cardsArrJson');
    let cardsArr = JSON.parse(cardsArrJSON);
    

    async function answerContainerPromise() {
      await new Promise(resolve => {
        answerContainer.addEventListener("keyup", function(event) {
            if (event.key === "2") {
                cardsArr.push(cardsArr[0]);
                cardsArr.splice(0, 1);
                console.log(cardsArr);
                resolve();
            } else if (event.key === "3") {
                cardsArr.splice(0, 1);
                resolve();
            } else if (event.key === "1") {
                resolve();
            }
        });
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
          async function enterHandler(event) {
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
                    answerInput.removeEventListener("keyup", enterHandler);
                }
            }

          await new Promise(resolve => {
            answerInput.addEventListener("keyup",enterHandler);
            resolve
          });
    }};

    
   processCards();
  });


