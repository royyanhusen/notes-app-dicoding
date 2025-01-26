class AddForm extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this._style = document.createElement('style');
    }
  
    connectedCallback() {
      this._render();
      this._setupEventListeners();
    }
  
    _render() {
      this._style.textContent = `
        :host {
          display: block;
          margin: 20px;
        }
  
        form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
  
        label {
          font-size: 1.2em;
        }
  
        input, textarea {
          padding: 8px;
          font-size: 1em;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
  
        button {
          padding: 10px;
          background-color: #2980b9;
          color: white;
          font-size: 1em;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
  
        button:hover {
          background-color: #3498db;
        }
      `;
      this._shadowRoot.appendChild(this._style);
      this._shadowRoot.innerHTML += `
        <form id="addNoteForm">
          <label for="title">Title:</label>
          <input type="text" id="title" name="title" required placeholder="Enter note title">
          
          <label for="body">Body:</label>
          <textarea id="body" name="body" required placeholder="Enter note body"></textarea>
          
          <button type="submit">Add Note</button>
        </form>
      `;
    }
  
    _setupEventListeners() {
      const form = this._shadowRoot.querySelector('#addNoteForm');
      form.addEventListener('submit', (event) => this._handleSubmit(event));
    }
  
    _handleSubmit(event) {
      event.preventDefault();
  
      // Mengambil nilai inputan
      const title = this._shadowRoot.querySelector('#title').value;
      const body = this._shadowRoot.querySelector('#body').value;
      const createdAt = new Date().toISOString();
  
      // Membuat objek newNote
      const newNote = {
        id: `note-${Date.now()}`,
        title: title,
        body: body,
        createdAt: createdAt,
        archived: false,
      };
  
      // Menyimpan catatan ke localStorage
      let notes = JSON.parse(localStorage.getItem('notes')) || [];
      notes.push(newNote);
      localStorage.setItem('notes', JSON.stringify(notes));
  
      // Menampilkan catatan baru di console
      console.log('New note added:', newNote);
  
      // Mengirimkan event bahwa catatan baru telah ditambahkan
      this.dispatchEvent(new CustomEvent('note-added', {
        detail: newNote,
        bubbles: true,
        composed: true,
      }));
  
      // Mengosongkan input setelah submit
      this._shadowRoot.querySelector('#title').value = '';
      this._shadowRoot.querySelector('#body').value = '';
    }
  }
  
  customElements.define('add-form', AddForm);
  