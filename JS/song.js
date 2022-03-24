const root = document.querySelector(".root");

fetch("https://api.lyrics.ovh/suggest/einaudiv")
  .then((res) => res.json())
  .then((data) => {
    console.log(data.data[0].preview);

    const song = document.createElement("audio");
    const source = document.createElement("source");
    source.src = data.data[0].preview;
    source.type = "audio/mpeg";
    song.appendChild(source);
    root.appendChild(song);
    song.play();
    

    song.controls = "controls";
    console.log(song);
    root.appendChild(song);
    
    song.autoplay = true;
    song.load();
    song.addEventListener(
      "load",
      function () {
        song.play();
      },
      true
    );
    
    song.addEventListener(
      "ended",
      function () {
        song.play();
      },
      true
    );

    document.body.addEventListener("load", function () {
        song.play();
        }
    );
    

    
  })
  .catch((err) => console.log(err));

