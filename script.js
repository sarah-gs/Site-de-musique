console.log(data);

var listeMusiquesDiv = document.querySelector('.liste-musiques');
var confirmationMessage = document.querySelector('#confirmation-message');

var modeleBloc = `
    <section class="music-item"> 
    <h3>{{musique}}</h3>
        <img src="{{imageAlbumURL}}" alt="Album Cover" class="album-cover">
        <div class="music-info">
           
            <audio class="audio-player" controls src="{{extraitAudioURL}}"></audio>
            <button class="play-pause">⏵</button>
            <p>{{texteExplicatif}}</p>
            <p>
                <a href="{{Youtube}}" target="_blank">
                    <img src="image/youtube.png" alt="YouTube" class="logo">
                </a>
                <a href="{{Spotify}}" target="_blank">
                    <img src="image/spotify.png" alt="Spotify" class="logo">
                </a>
            </p>
        </div>
    </section>

`;

data.forEach(function(item, index) {
    var codeDuBloc = modeleBloc
        .replace("{{musique}}", item.musique)
        .replace("{{texteExplicatif}}", item.texteExplicatif)
        .replace("{{extraitAudioURL}}", item.extraitAudioURL)
        .replace("{{imageAlbumURL}}", item.imageAlbumURL)
        .replace("{{Youtube}}", item.proprieteIntellectuelle.Youtube)
        .replace("{{Spotify}}", item.proprieteIntellectuelle.Spotify)

        listeMusiquesDiv.insertAdjacentHTML('beforeend', codeDuBloc);

});


function attachPlayPauseEvents() {
    var playPauseButtons = document.querySelectorAll('.play-pause');
    var audioElements = document.querySelectorAll('.audio-player');

    playPauseButtons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            var audio = audioElements[index];

            setTimeout(function() {
                audioElements.forEach(function(otherAudio, i) {
                    if (i !== index) {
                        otherAudio.pause();
                        playPauseButtons[i].textContent = '⏵';
                    }
                });

                if (audio.paused) {
                    audio.play();
                    button.textContent = '⏸';
                } else {
                    audio.pause();
                    button.textContent = '⏵';
                }
            }, 100);
        });
    });
}


attachPlayPauseEvents();


var champTitre = document.querySelector('#titre');
var champDescription = document.querySelector('#descriptionMusique');
var champAudioURL = document.querySelector('#userAudio');
var champAlbumCover = document.querySelector('#album-cover');


champTitre.addEventListener('keyup', function () {
    console.log('Titre :', champTitre.value);
});

champDescription.addEventListener('keyup', function () {
    console.log('Description :', champDescription.value);
});


var formulaire = document.querySelector('#Formulaire');
formulaire.addEventListener('submit', function (event) {
    event.preventDefault();

    var titreMusique = champTitre.value;
    var descriptionMusique = champDescription.value;
    var audioFile = champAudioURL.files[0];
    var albumCoverFile = champAlbumCover.files[0];

    if (titreMusique && descriptionMusique && audioFile && albumCoverFile) {
        var reader = new FileReader();
        var albumCoverReader = new FileReader();

        reader.onload = function(e) {
            var audioURL = e.target.result;

            albumCoverReader.onload = function(ev) {
                var albumCoverURL = ev.target.result;

                var nouvelleMusique = {
                    musique: titreMusique,
                    texteExplicatif: descriptionMusique,
                    extraitAudioURL: audioURL,
                    imageAlbumURL: albumCoverURL,
                    proprieteIntellectuelle: {
                        Youtube: document.querySelector('#userYoutube').value,
                        Spotify: document.querySelector('#userSpotify').value,
                       
                    }
                };

                var codeDuBloc = modeleBloc
                    .replace("{{musique}}", nouvelleMusique.musique)
                    .replace("{{texteExplicatif}}", nouvelleMusique.texteExplicatif)
                    .replace("{{extraitAudioURL}}", nouvelleMusique.extraitAudioURL)
                    .replace("{{imageAlbumURL}}", nouvelleMusique.imageAlbumURL)
                    .replace("{{Youtube}}", nouvelleMusique.proprieteIntellectuelle.Youtube)
                    .replace("{{Spotify}}", nouvelleMusique.proprieteIntellectuelle.Spotify)
                    
            

          
                listeMusiquesDiv.insertAdjacentHTML('beforeend', codeDuBloc);

                
                attachPlayPauseEvents();

               
                confirmationMessage.style.display = 'block';
                setTimeout(function() {
                    confirmationMessage.style.display = 'none';
                }, 3000);

              
                formulaire.reset();
            };

            albumCoverReader.readAsDataURL(albumCoverFile);
        };

        reader.readAsDataURL(audioFile);
    } else {
        alert('Veuillez remplir tous les champs avant de soumettre.');
    }
});
