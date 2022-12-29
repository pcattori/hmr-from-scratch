import { friend } from './friend'
import { greet } from './greet'

let element = document.querySelector<HTMLHeadingElement>('#message')
if (element) element.innerText = greet(friend)
