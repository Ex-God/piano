export function toggleMod(element, mod) {
    element.classList.toggle(`${element.classList[0]}_${mod}`)
}