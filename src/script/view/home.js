import Utils from '../utils.js';
import DummyData from '../data/dummy-data-note.js';

// Function to get notes from localStorage or fallback to DummyData
const getNotesFromLocalStorage = () => {
  const storedNotes = localStorage.getItem('notes');
  return storedNotes ? JSON.parse(storedNotes) : [];
};

// Function to save notes to localStorage
const saveNotesToLocalStorage = (notes) => {
  localStorage.setItem('notes', JSON.stringify(notes)); // Store notes as JSON string
};

const home = () => {
  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteListElement = noteListContainerElement.querySelector('note-list');
  const addFormElement = document.querySelector('add-form'); // Menambahkan elemen add-form

  // Menampilkan catatan dari localStorage atau DummyData
  const showNotes = () => {
    const localStorageNotes = getNotesFromLocalStorage(); // Mendapatkan catatan dari localStorage
    const dummyNotes = DummyData.getAllDataDummy(); // Mendapatkan catatan dari DummyData

    // Gabungkan catatan dari DummyData dan localStorage tanpa duplikasi
    const allNotes = [
      ...dummyNotes.filter(dummyNote => !localStorageNotes.some(existingNote => existingNote.id === dummyNote.id)),
      ...localStorageNotes
    ];

    displayResult(allNotes); // Menampilkan hasil
    showNoteList(); // Menampilkan list catatan
  };

  const displayResult = (notes) => {
    // Urutkan notes berdasarkan createdAt agar data terbaru tampil di atas
    notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement('note-item');
      noteItemElement.note = note; // Set setiap note item
      return noteItemElement;
    });
    noteListElement.innerHTML = ''; // Bersihkan catatan yang ada
    noteListElement.append(...noteItemElements); // Tambahkan catatan ke dalam list
  };

  const showNoteList = () => {
    // Menampilkan list catatan tanpa menyembunyikan atau menampilkan loading
    Utils.showElement(noteListElement);
  };

  // Fungsi untuk menangani event saat catatan baru ditambahkan
  const handleNewNote = (event) => {
    const newNote = event.detail; // Mengambil detail catatan baru dari event
    const localStorageNotes = getNotesFromLocalStorage(); // Mendapatkan catatan yang sudah ada di localStorage

    // Menambahkan catatan baru ke localStorage jika belum ada
    if (!localStorageNotes.some(existingNote => existingNote.id === newNote.id)) {
      localStorageNotes.push(newNote); // Menambahkan catatan baru
      saveNotesToLocalStorage(localStorageNotes); // Menyimpan catatan yang diperbarui ke localStorage
    }

    // Setelah catatan baru ditambahkan ke localStorage, tampilkan catatan terbaru
    showNotes(); // Menampilkan kembali daftar catatan yang telah diperbarui
  };

  // Menambahkan event listener untuk menangani event 'note-added' dari AddForm
  addFormElement.addEventListener('note-added', handleNewNote);

  // Menampilkan daftar catatan saat halaman dimuat
  showNotes();
};

export default home;
