import * as model from './model.js'
import { Element } from './classes.js'

const $page = document.querySelector('.page')

const PIANO = new Element($page, model.piano, 'afterbegin')

PIANO.render()

let pianoKeys = document.querySelectorAll('.piano-key')

pianoKeys.forEach(key => {
    key.addEventListener('click', playNote)
})

function playNote(event) {
    let key = event.target
    let note = document.getElementById(key.dataset.note)
    
    note.currentTime = 0.4
    note.play()

    if (key.classList.contains('piano-key_black')) {
        key.classList.add('piano-key_black-active')
        note.addEventListener('ended', () => key.classList.remove('piano-key_black-active'))
    } else {
        key.classList.add('piano-key_white-active')
        note.addEventListener('ended', () => key.classList.remove('piano-key_white-active'))
    }    
}