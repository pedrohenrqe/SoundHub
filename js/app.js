const pesquisa = document.getElementById('pesquisa');
const btnPesquisa = document.getElementById('btnPesquisa');

document.addEventListener('DOMContentLoaded', () => {
    const pesquisaSalva = localStorage.getItem('searchValue');
    if (pesquisaSalva) {
        pesquisa.value = pesquisaSalva;
        handleSearch(pesquisaSalva);
    }
});

btnPesquisa.addEventListener('click', (e) => {
    e.preventDefault();
    const busca = pesquisa.value;
    localStorage.setItem('searchValue', busca);
    handleSearch(busca);
});

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'd4c45a2ccemsh4c7f0da2d8647eap1d8471jsnbd7511e676db',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
};

const getDataSearched = async (search) => {
    const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${search}`, options);
    const data = await response.json();
    return data;
};

const getInfoArtist = async (id) => {
    const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/artist/${id}`, options);
    const data = await response.json();
    return data;
};

const showBestResult = async (search) => {
    const imgArtista = document.getElementById('imgArtista');
    const nomeArtista = document.getElementById('nomeArtista');
    const fãsArtista = document.getElementById('fãsArtista');
    const tipo = document.getElementById('tipo');
    const dataAll = await getDataSearched(search);
    const infoArtist = await getInfoArtist(dataAll.data[0].artist.id);

    imgArtista.src = dataAll.data[0].artist.picture;
    nomeArtista.textContent = dataAll.data[0].artist.name;
    fãsArtista.textContent = infoArtist.nb_fan;
    tipo.textContent = dataAll.data[0].type;
};

const showSongs = async (search) => {
    const conteúdoMúsicas = document.getElementById('conteúdoMúsicas');
    const dataAll = await getDataSearched(search);

    conteúdoMúsicas.innerHTML = "";
    for (let i = 0; i < 6; i++) {
        const div = document.createElement('div');
        div.classList = "content-cancion";
        div.innerHTML = `
            <div class="column-1">
                <div class="left-cancion">
                    <figure>
                        <img src="${dataAll.data[i].album.cover}" alt="">
                    </figure>
                    <p>${dataAll.data[i].title}</p>
                </div>
                <div class="btn-microfono">
                    <button class="btnMicrofono" id="btnAudio${i}" data-index="${i}">
                        <svg viewBox="0 0 16 16" focusable="false" class="chakra-icon css-1yk3h4a e3mndjk0" data-testid="MicrophoneStandIcon" aria-hidden="true"><path d="M15 4.5a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0zm1 0a4.5 4.5 0 0 1-5.099 4.46L3.048 15 0 12l7-7.58v.08a4.5 4.5 0 1 1 9 0zM7.166 5.715l-6.57 7.12L2.62 14.86l7.12-6.57a5.48 5.48 0 0 1-2.573-2.573z" fill="currentColor"></path></svg>
                    </button>
                </div>
            </div>
        `;
        conteúdoMúsicas.appendChild(div);

        const btnMicrofono = document.getElementById(`btnAudio${i}`);
        btnMicrofono.addEventListener('click', () => {
            const audio = document.getElementById('audio');
            const nomeMúsicaTocando = document.getElementById('nomeMúsicaTocando');
            audio.src = dataAll.data[btnMicrofono.dataset.index].preview;
            nomeMúsicaTocando.textContent = dataAll.data[btnMicrofono.dataset.index].title;
            audio.play();
        });
    }
};

const showAlbums = async (search) => {
    const conteúdoÁlbum = document.getElementById('conteúdoÁlbum');
    const dataAll = await getDataSearched(search);

    conteúdoÁlbum.innerHTML = "";
    for (let i = 0; i < 6; i++) {
        const div = document.createElement('div');
        div.classList = "content-album";
        div.innerHTML = `
            <div class="column-1">
                <div class="left-album">
                    <figure>
                        <img src="${dataAll.data[i].album.cover}" alt="">
                    </figure>
                    <p>${dataAll.data[i].album.title}</p>
                </div>
            </div>
        `;
        conteúdoÁlbum.appendChild(div);
    }
};

const handleSearch = (search) => {
    showBestResult(search);
    showSongs(search);
    showAlbums(search);
};