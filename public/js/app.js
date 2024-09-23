console.log('Client side js running')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#message-1')
const msgTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    msgOne.textContent = 'loading...'
    msgTwo.textContent = ''

    const location = search.value
    // console.log()
    const url = 'http://localhost:3000/weather?address=' + location
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error
            } else {
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecast
                // console.log(data)
            }
        })
    })
})