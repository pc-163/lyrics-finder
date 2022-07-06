//https://api.lyrics.ovh/suggest/Adventure%20of%20a%20Lifetime
//https://github.com/rajeshdh/lyrics-finder
//https://lyricsovh.docs.apiary.io/#reference/0/lyrics-of-a-song/search
//http://127.0.0.1:5500/apiwork/api.html



function searchSong() {
    document.getElementById('loader').style.display = 'block'; //loader visible
    //let song = document.getElementById('search').value;
    let artist = document.getElementById('search').value;
    const url = `https://api.lyrics.ovh/suggest/${artist}`;

    fetch(url)
        .then(res => res.json())
        .then(jsonData => {
            let addmusic = '';
            document.getElementById('loader').style.display = 'none';  //loader hide
            jsonData.data.map((values) => {
                //console.log('title', values);

              
                    addmusic += `
                    <ul class="list_data set-list" id= "${values.id}">
                       <li class="_sno track"><img src="${values.artist.picture}"><span>${values.title}</span></li>
                       <li class="_sno artist"><span>${values.artist.name}</span></li>
                       <li class="_sno album"><span>${values.album.title}</span></li>
                       <li class="_sno duration"><button class="btn btn-warning rounded-0" onclick="lyrics('${values.title}','${values.artist.name}')">Lyrics</button></li>
                   </ul>`;
                
              
            });
            document.getElementById("getmusic").innerHTML = addmusic;
            //document.getElementById('search').value = '';
        })
        .catch(error => console.log('error'));

}

function lyrics(title, artist) {

    document.getElementById('getmusic').style.display = 'none'; //music list hide
    document.getElementById('heading-hide').style.display = 'none'; //Lyrics titles hide
    document.getElementById('loader').style.display = 'block'; //loader visible
    document.getElementById('lyrics-hide').style.display = 'flex'; //lyrics title show

    const fetchLyricsurl = `https://api.lyrics.ovh/v1/${artist}/${title}`;

        fetch(fetchLyricsurl)
            .then(res => res.json())
            .then(lyricsData => {
                //console.log('lyricsData', lyricsData);
                if (lyricsData.lyrics.length == 0) {
                    alert('No Lyrics found');
                } else {

                    document.getElementById('loader').style.display = 'none'; //loader hide

                    document.getElementById('getmusic').style.display = 'none';
                    // document.getElementById('heading-hide').style.display = 'none';
                    // document.getElementById('lyrics-hide').style.display = 'flex';
                    document.getElementById('setLyrics').style.display = 'block';
                    let x = lyricsData.lyrics.trim(); //replace(/\n/g);
                    document.getElementById('addLyrics').innerHTML =  `<p>${x}</p>`;
                }
                
            })
            .catch(error => console.log('error'));

}

function clickme(){
    document.getElementById('setLyrics').style.display = 'none';
    document.getElementById('lyrics-hide').style.display = 'none';
    document.getElementById('heading-hide').style.display = 'flex';
    document.getElementById('getmusic').style.display = 'block';
}


