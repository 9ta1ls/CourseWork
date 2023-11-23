//deleteButton
document.addEventListener('DOMContentLoaded', function() {
  
  const logoutButton = document. getElementById('logoutButton');
  logoutButton.addEventListener('click', () =>{
    console.log('meow')
    document.cookie = "access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    location.replace('/api/login');
  });

    const deleteButtons = document.querySelectorAll('.deleteDeck');
    deleteButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
    const deckId = event.target.getAttribute("dataDeckId");
    try {
          const response = await fetch(`/Decks/${deckId}`, {
              method: 'DELETE'
          });

        } catch (error) {
          console.error(error);
        }
        location.replace("/decks");
      });
    });

    //editButton

        const editButtons = document.querySelectorAll('.editDeck');
        editButtons.forEach(button => {
          button.addEventListener('click', (event) => {
          const row = event.target.closest('tr');
          const nameSpan = row.querySelector('.deckName');
          const inputField = row.querySelector('.deckInput');
          const saveButton = row.querySelector('.saveDeck');
          const editButton = row.querySelector('.editDeck');
          const deckNameTb = row.querySelector('.deckName'); 
        
          deckNameTb.style.display = 'none';
          nameSpan.style.display = 'none';
          inputField.style.display = 'inline-block';
          saveButton.style.display = 'inline-block';
          editButton.style.display = 'none';
        });
        

        //saveButton
        const saveButtons = document.querySelectorAll('.saveDeck');

        saveButtons.forEach(button => {
          button.addEventListener('click', async (event) => {
            if (!button.disabled) {
              button.disabled = true;

              const row = event.target.closest('tr');
              const deckId = row.querySelector('.saveDeck').getAttribute('dataDeckId');
              const newName = row.querySelector('.deckInput').value;
              const response = await fetch(`/Decks/${deckId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: newName })
              });

              button.disabled = false;
              location.replace("/decks");
            }
          });
        });

        


  });
 })