let cardsNasa = document.querySelector(".cards-nasa");
let searchBtn = document.querySelector(".date-pic-btn");
searchBtn.addEventListener("click", gitPicture);
function gitPicture(date) {
  let inputDate = document.querySelector(".date-calender");
  date = inputDate.value;
  if (date !== "") {
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=gOgSf3vf2TWfjsu7isEhSNiKLxGUxlTRgk8Dy1AA&start_date=${date}&end_date=${date}`
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        let parentDiv = document.querySelector(".cards-nasa");
        parentDiv.textContent = ""; //clear cards-nasa-div

        data.forEach((item) => {
          let card = document.createElement("div");
          card.classList.add("card"); //parent

          let cardImg = document.createElement("div");
          cardImg.classList.add("card-img"); //div img

          let img = document.createElement("img");
          img.src = item.url;
          cardImg.appendChild(img);
          card.appendChild(cardImg);

          let cardText = document.createElement("div");
          cardText.classList.add("card-text"); //div text
          let nasaTitle = document.createElement("h2");
          nasaTitle.classList.add("card-text-h2")
          nasaTitle.textContent = item.title;
          cardText.appendChild(nasaTitle);

          let nasaDate = document.createElement("h4");
          nasaDate.classList.add("card-text-h4")
          nasaDate.textContent = item.date;
          cardText.appendChild(nasaDate);

          let nasaDesc = document.createElement("p");
          nasaDesc.classList.add("card-text-p")
          nasaDesc.textContent = item.explanation;
          cardText.appendChild(nasaDesc);

          card.appendChild(cardText);
          cardsNasa.appendChild(card);
        });
      })

      .catch((error) => {
        console.log("something went wrong", error);
      });
  } else {
    alert("input date");
  }
}
