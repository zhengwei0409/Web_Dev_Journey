// no deboucing 
const getData = () => {
    // API call
    console.log("Fetching Data..." + this);
}

// debouncing in JS
const getDataDebounce = (fn, delay) =>  {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args)
        },delay)
    }
}

const betterFunction = getDataDebounce(getData,500);