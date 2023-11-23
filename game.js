
const urlParams = new URLSearchParams(window.location.search);
const indexToLoad = parseInt(urlParams.get('index')) || 0;
rightColumn = document.getElementById('right-column')
leftColumn = document.getElementById('left-column')
mainColumn = document.getElementById('main-column')
button = document.getElementById('button')

const plusIndex = function () {
    updateURL(indexToLoad + 1)
}

const minusIndex = function () {
    updateURL(indexToLoad - 1)
}

rightColumn.addEventListener('click', plusIndex);

leftColumn.addEventListener('click', minusIndex);


function updateURL(index) {
    const currentURL = new URL(window.location.href);
    currentURL.searchParams.set('index', index);
    window.location.href = currentURL
}


document.addEventListener('DOMContentLoaded', async function () {
    const response = await fetch('data.json');
    const data = await response.json();

    if (indexToLoad >= data.length - 1){
        rightColumn.removeEventListener('click', plusIndex)
        rightColumn.addEventListener('click', function (){
            window.location.href = '/Guess-that-Movie/winner.html'
        })
    }

    if (indexToLoad <= 0){
        leftColumn.removeEventListener('click', minusIndex)
        leftColumn.addEventListener('click', function (){
            window.location.href = '/Guess-that-Movie/index.html'
        })
    }

    const details = data[indexToLoad]
    const emoji = document.getElementById('emoji').children[0]
    const year = document.getElementById('year').children[0]
    emoji.innerHTML = details['emoji']
    year.innerHTML = details['year']

    const title = document.getElementById('title')
    const facts = document.getElementById('facts').children[0]
    const rating = document.getElementById('rating')
    const img = document.getElementById('img')

    button.addEventListener('click', function() {
        mainColumn.classList = ['reveal']
        title.innerHTML = details['title'] + ' (' + details['year'] + ')'
    })

    img.src = details['image_link']
    for(let i=0; i<3;i++){
        facts.children[i].innerHTML = details['facts'][i]
    }
    rating.innerHTML = "IMDb: " + details['rating'] + "/10"


})



