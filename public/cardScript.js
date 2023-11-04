//deleteButton
document.addEventListener('DOMContentLoaded', function() {
    const deleteButtons = document.querySelectorAll('.deleteCard');
    deleteButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
    const cardId = event.target.getAttribute("dataCardId");
    const deckId = event.target.getAttribute("dataDeckId");
    try {
          const response = await fetch(`/Cards/${deckId}/${cardId}`, {
              method: 'DELETE',
          });

        } catch (error) {
          console.error(error);
        }
        location.replace(`/Cards/${deckId}`);
      });
    })
});