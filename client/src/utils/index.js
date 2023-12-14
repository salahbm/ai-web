import {
    surpriseMePrompts
} from '../constants/index';
import FileSaver from 'file-saver'

export function getRandomPrompt() {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
    const randomPrompt = surpriseMePrompts[randomIndex]

    if (randomPrompt === prompt) return getRandomPrompt(prompt)
    return randomPrompt
}

export async function downloadImage({
    _id,
    photo
}) {
    FileSaver.saveAs(photo, `-${_id}.jpg`)
}