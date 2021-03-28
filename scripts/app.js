import * as model from './model.js'
import { toggleMod } from './utils.js'
import { Element } from './classes.js'

const $page = document.querySelector('.page')

const PIANO = new Element($page, model.piano, 'afterbegin')

PIANO.render()

