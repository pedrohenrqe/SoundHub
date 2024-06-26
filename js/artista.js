let search = document.getElementById('search');

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    search.value = localStorage.getItem('searchValue');
    showAllArtists(search.value);
})

let btnSearch = document.getElementById('#btnSearch');
btnSearch.addEventListener('click', (e) => {
    e.preventDefault();
    let busqueda = search.value;
    localStorage.setItem('searchValue', busqueda);
    showAllArtists(busqueda);
})

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd4c45a2ccemsh4c7f0da2d8647eap1d8471jsnbd7511e676db',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};

const getDataSearched = async (search) => {
    let res = await (await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${search}`, options)).json();
    return res;
}

const getInfoArtist = async (id) => {
    let res = await (await fetch(`https://deezerdevs-deezer.p.rapidapi.com/artist/${id}`, options)).json();
    return res;
}

const showAllArtists = async (search) => {
    const dataAll = await getDataSearched(search);
    let containerArtists = document.getElementById('#containerArtists');
    containerArtists.innerHTML = "";
    for(let i=0; i<dataAll.data.length; i++){
        const AllDataArtist = await getInfoArtist(dataAll.data[i].artist.id);
        let div = document.createElement('div');
        div.classList = "content-mejor-resultado";
        div.classList = "artits-direction";
        div.innerHTML = `
        <div class="img-mejorResultado">
            <figure class="img-artist">
                <img src="${dataAll.data[i].artist.picture}" alt="">
            </figure>
        </div>
        <div class="info-mejorResultado2">
            <div class="heading-3 ellipsis"><a href="#">${dataAll.data[i].artist.name}</a></div>
            <div class="heading-3-sub ellipsis">${AllDataArtist.nb_fan} fans</div>
        </div>
        `;
        containerArtists.appendChild(div);
    }
}



