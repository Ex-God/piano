export class Element {
    constructor(parent, html, placeForInsert) {
        this.parent = parent
        this.html = html
        this.placeForInsert = placeForInsert
    }

    render() {
        this.parent.insertAdjacentHTML(this.placeForInsert, this.html)
    }
}