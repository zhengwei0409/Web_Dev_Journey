document.getElementById('grandparent').addEventListener('click', (e) => {
    console.log("Grandparent Clicked!");
    e.stopPropagation();
}, true)

document.getElementById('grandparent').addEventListener('click', () => {
    console.log("Grandparent Clicked!")
})

document.getElementById('parent').addEventListener('click', (e) => {
    console.log("parent Clicked!");
    
})

document.getElementById('child').addEventListener('click', (e) => {
    console.log("child Clicked!");
    
})

// Event Propagation (capturing -> bubbling)