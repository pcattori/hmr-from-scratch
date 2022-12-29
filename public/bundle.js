// app/greet.ts
let greet = (name) => `Greetings, ${name}!`

// app/friend.ts
let friend = 'friend'

// app/index.ts
let element = document.querySelector('#message')
element.innerText = greet(friend)
