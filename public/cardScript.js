//deleteButton
document.addEventListener('DOMContentLoaded', function() {
    const deleteButtons = document.querySelectorAll('.deleteCard');
    deleteButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
    const cardId = event.target.getAttribute("dataCardId");
    const deckId = event.target.getAttribute("dataDeckId");
    try {
          const response = await fetch(`/cards/${deckId}/${cardId}`, {
              method: 'DELETE',
          });

        } catch (error) {
          console.error(error);
        }
        location.replace(`/cards/${deckId}`);
      });
    })
});

const learningButton = document.getElementById("learningButton");
learningButton.addEventListener('click', function() {
  const deckId = learningButton.getAttribute("dataDeckId");
    location.replace(`/cards/${deckId}/learning`);
});