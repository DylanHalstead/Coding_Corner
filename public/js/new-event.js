// image/file btn handling
document.querySelector('#file-btn').addEventListener('click', () => {
  document.querySelector('#image').click();
});

document.querySelector('#image').addEventListener('change', (e) => {
  document.querySelector('#file-text').textContent = e.target.files[0].name;
  const fileBtn = document.querySelector('#file-btn');
  fileBtn.style.backgroundColor = 'rgba(111, 83, 202, .8)';
  fileBtn.style.boxShadow = '0 0 20px #6F53CA';
});