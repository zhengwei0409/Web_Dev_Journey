const arr = ['zheng','wei','is','getting','more','offer']

const h1element = document.getElementById('h1tag');

let i = 0

h1element.addEventListener('click', () => {
    if(i === arr.length) i = 0;
    h1element.innerHTML = arr[i];
    i++;
})