document.getElementById('category').addEventListener('click', (e) => {
    console.log(e.target.id)
    window.location.href = '/' + e.target.id
});

// note: some element do not bubble up / stopPropagation