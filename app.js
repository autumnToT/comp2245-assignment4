//app.js

document.getElementById('searchButton').addEventListener('click', function () {
  fetch('superheroes.php')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.text();
    })
    .then(html => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;

      const items = tempDiv.querySelectorAll('li');
      const superheroList = Array.from(items).map(item => item.textContent).join('\n');

      alert('Superheroes:\n' + superheroList);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
});

