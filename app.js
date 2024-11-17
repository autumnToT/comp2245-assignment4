//app.js
document.getElementById('searchButton').addEventListener('click', function () {
	fetch('superheroes.php')
	.then(response => {
	return response.text();
	})
	.then(data => {
		alert('Superheroes:\n' + data);
	})
	.catch(error => {
		console.error('There was a problem with the fetch operation:', error);
	});
});

