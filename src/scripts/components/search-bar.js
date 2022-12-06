class SearchBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    set clickEvent(event) {
        this._clickEvent = event;
        this.render();
    }

    set resetSearchColumn(event) {
        this._resetSearchColumn = event;
        this.render();
    }

    get value() {
        return this.querySelector('#search-input').value;
    }

    render() {
        this.innerHTML = `
        <div class="search-column">
            <input type="text" placeholder="Search Restaurants by name, category, or menu" id="search-input">
            <button type="submit" id="search-button">Search</button>
        </div> 
        `;
        this.querySelector('#search-button').addEventListener('click', this._clickEvent);
        this.querySelector('#search-input').addEventListener('keydown', this._resetSearchColumn);
    }
}
customElements.define('search-bar', SearchBar);
