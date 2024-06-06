document.getElementById('playlist-image').addEventListener('change', function (event) {
  const file = event.target.files[0];
  const preview = document.getElementById('image-preview');
  const addImageText = document.getElementById('add-image-text');

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.innerHTML = '<img id="playlist-img" src="' + e.target.result + '" class="w-full h-full object-cover rounded-md cursor-pointer" />';
      document.getElementById('playlist-image').style.display = 'none'; // Oculta o input
      addImageText.style.display = 'none'; // Oculta o texto "Adicionar Imagem"
    }
    reader.readAsDataURL(file);
  } else {
    preview.innerHTML = '';
    document.getElementById('playlist-image').style.display = 'block'; // Mostra o input
    addImageText.style.display = 'block'; // Mostra o texto "Adicionar Imagem"
  }
});

document.addEventListener('click', function (event) {
  if (event.target && event.target.id === 'playlist-img') {
    document.getElementById('playlist-image').click();
  }
});

document.getElementById('create-playlist-btn').addEventListener('click', function () {
  var playlistName = document.getElementById('playlist-name').value;
  var playlistImage = document.getElementById('playlist-image').value;
  var privacy = document.querySelector('input[name="privacy"]:checked').value;

  console.log('Nome da Playlist:', playlistName);
  console.log('Imagem da Playlist:', playlistImage);
  console.log('Privacidade:', privacy);
});
  