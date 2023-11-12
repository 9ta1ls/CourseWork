document.addEventListener('DOMContentLoaded', function () {
    const answerInput = document.getElementById('answerInput');
    const answerContainer = document.getElementById('answerContainer');
    const qaSeparator = document.getElementById('qaSeparator');
    const cardAnswer = document.getElementById("answer");
    const answerFromInput = document.getElementById("answerFromInput");
    const cardsContainer = document.getElementById('cardsContainer');
    const cardsArrJSON = cardsContainer.getAttribute('cardsArrJson');
    let cardsArr = JSON.parse(cardsArrJSON);
    

    async function answerContainerPromise(cardIndex){
      await new Promise(resolve => {
        answerContainer.addEventListener("keyup", function(event) {
          if(event.key === "1"){
            cardsArr.push(cardsArr[cardIndex]);
            console.log(cardsArr);
            cardsArr.splice(cardIndex,0);
            console.log(cardsArr);
            resolve();
          }
        })
      })
  }


    async function processCards() {
      let i = 0;
      for (const card of cardsArr) {
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
          answerInput.addEventListener("keyup", async function(event) {
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
                    await answerContainerPromise(i);
                    resolve();
                }
            });
        });
        i++;
    }};
   processCards();
  });


