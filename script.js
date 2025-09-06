document.getElementById('year').innerText = new Date().getFullYear();

// Toggle nav (mobile later)
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
if(navToggle){
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    navToggle.classList.toggle('open');
  });
}

// Load subjects & notes from JSON
fetch('data/notes.json')
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById('subjectGrid');
    data.subjects.forEach(sub => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<h3>${sub.name}</h3><p>${sub.desc}</p>`;
      card.addEventListener('click', () => showNotes(sub));
      grid.appendChild(card);
    });
  });

// Modal
const modal = document.getElementById('notesModal');
const modalTitle = document.getElementById('modalTitle');
const notesList = document.getElementById('notesList');
const closeModal = document.getElementById('closeModal');

function showNotes(subject){
  modalTitle.innerText = subject.name + " Notes";
  notesList.innerHTML = '';
  subject.notes.forEach(note => {
    const link = document.createElement('a');
    link.href = note.file;
    link.setAttribute('download', note.title);
    link.innerText = `⬇ ${note.title}`;
    notesList.appendChild(link);
  });
  modal.style.display = 'flex';
}
closeModal.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if(e.target === modal){ modal.style.display = 'none'; } }
