import * as model from './model.js'
import { Element } from './classes.js'
import {toggleMod} from './utils.js'

const $page = document.querySelector('.page')
const PIANO = new Element($page, model.piano, 'afterbegin')

PIANO.render()

const options = {
    track: [],
    record: false
}

let $pianoKeys = document.querySelectorAll('.piano-key')
const $recordBtn = document.querySelector('.record')
const $playBtn = document.querySelector('.play')

$playBtn.disable = !options.record

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

    if (options.record) {
        let date = getDate()
        let time = date.getTime()

        options.track.push([note, time])
    }
}

function getDate() {
    return new Date()
}

$recordBtn.addEventListener('click', recordTrack)

function recordTrack() {
    toggleMod($recordBtn, 'active')

    if (options.record) {
        options.track = []
    }

    options.record = !options.record
    $playBtn.disable = !options.record
}

$playBtn.addEventListener('click', playTrack)

function playTrack() {
    for (let i = 0; i < options.track.length; i++) {
        let note = options.track[i]
        let delay = (note[1] - options.track[0][1])
        
        sleep(delay).then(() => {
            note[0].currentTime = 0
            note[0].play()
        })
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }