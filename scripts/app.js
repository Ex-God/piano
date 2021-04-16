import * as model from './model.js'
import { Element } from './classes.js'
import {toggleMod} from './utils.js'

const $page = document.querySelector('.page')

const PIANO = new Element($page, model.piano, 'afterbegin')

PIANO.render()

let $pianoKeys = document.querySelectorAll('.piano-key')
let track = []
let record = false

$pianoKeys.forEach(key => {
    key.addEventListener('click', playNote)
})

function playNote(event) {
    let key = event.target
    let note = document.getElementById(key.dataset.note)
    
    note.currentTime = 0
    note.playbackRate = 2
    note.play()

    if (key.classList.contains('piano-key_black')) {
        key.classList.add('piano-key_black-active')
        note.addEventListener('ended', () => key.classList.remove('piano-key_black-active'))
    } else {
        key.classList.add('piano-key_white-active')
        note.addEventListener('ended', () => key.classList.remove('piano-key_white-active'))
    }    

    if (record) {
        track.push(note)
        console.log(track)
    }
}

const $recordBtn = document.querySelector('.record')

$recordBtn.addEventListener('click', recordTrack)

function recordTrack() {
    toggleMod($recordBtn, 'active')

    if (record) {
        track = []
    }

    record = !record
}

const $playBtn = document.querySelector('.play')
let currency = 0

$playBtn.addEventListener('click', playTrack)

function playTrack() {
    toggleMod($playBtn, 'active')

    let count = 0
    currency = 0

    track.forEach(note => {
        setTimeout(() => {
            note.currentTime = 0
            note.play()

            count ++

            if (count === track.length) {
                toggleMod($playBtn, 'active')
            }
        }, currency)

        currency += 500
    })
}