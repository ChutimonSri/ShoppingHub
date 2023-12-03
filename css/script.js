let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');

searchBtn .addEventListener('cick', () =>{
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');

});
