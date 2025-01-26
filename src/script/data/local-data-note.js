const LocalDataNote = {
  getAllNotes() {
    // Mengambil data dari localStorage atau mengembalikan array kosong jika tidak ada data
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    return storedNotes;
  },
  
  addNote(newNote) {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    storedNotes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(storedNotes)); // Menyimpan data ke localStorage
  }
};

export default LocalDataNote;
