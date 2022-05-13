//The latest launch section functionality
let latestLaunchSection = document.querySelector(".latest-launch");

fetch("https://api.spacexdata.com/v4/launches/latest")
  .then((res) => res.json())
  .then((data) => {
    // save the necessary data in variables
    let imgSrc = data.links.patch.large;
    let article = data.links.wikipedia;
    let youTube = data.links.webcast;
    let flightName = data.name;
    let flightDate = data.date_utc;
    // ------------------

    // create the the html elements for the aPI data
    let imgDiv = document.createElement("div");
    imgDiv.classList = "latest-launch-img";
    latestLaunchSection.appendChild(imgDiv);

    let img = document.createElement("img");
    img.src = imgSrc;
    imgDiv.appendChild(img);
    img.setAttribute("referrerpolicy", "no-referrer");

    //---------
    const contentDiv = document.createElement("div");
    contentDiv.classList = "latest-launch-content";
    latestLaunchSection.appendChild(contentDiv);
    //--- flight name
    const tripName = document.createElement("h1");
    tripName.textContent = flightName;
    contentDiv.appendChild(tripName);
    //-- flight date
    const date = document.createElement("p");
    const icon = document.createElement("i");
    icon.classList = "fa-solid fa-clock";
    date.appendChild(icon);
    const textDate = document.createElement("span");
    textDate.textContent = ` ${flightDate}`;
    date.appendChild(textDate);
    contentDiv.appendChild(date);
    //--- flight description
    const description = document.createElement("p");
    description.textContent =
      "Ratsat was carried to orbit on the first successful orbital launch of any privately funded and developed, liquid-propelled carrier rocket, the SpaceX Falcon 1";
    contentDiv.appendChild(description);
    //---- video link
    let vidBtn = document.createElement("a");
    vidBtn.classList = "latest-launch-video";
    vidBtn.textContent = "Youtube Video";
    vidBtn.href = youTube;
    contentDiv.appendChild(vidBtn);
    //---- article link
    let articleBtn = document.createElement("a");
    articleBtn.classList = "latest-launch-article";
    articleBtn.textContent = "Read more";
    articleBtn.href = article;
    contentDiv.appendChild(articleBtn);
  })
  .catch((err) => console.log(err));
///===========================================================
/// =============== next launch functionality==================
// get the necessary element
let days = document.querySelector(".days");
let hours = document.querySelector(".hours");
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");
//--- get the parent elements
let nextLaunch = document.querySelector(".next-launch");
let nextLaunchContent = document.querySelector(".next-launch-content");
fetch("https://api.spacexdata.com/v4/launches/next")
  .then((res) => res.json())
  .then((data) => {
    // save the needed data in variables
    let imgSrc = data.links.patch.large;
    let flightName = data.name;
    let flightDate = data.date_utc;
    // create an image and prepend it to its parent
    let img = document.createElement("img");
    img.src = imgSrc;
    img.setAttribute("referrerpolicy", "no-referrer");
    nextLaunch.prepend(img);
    // add the trip title
    nextLaunchContent.children[1].textContent = flightName;
    // add the timer functionality
    // save the date in the local storage for later use
    localStorage.setItem("nextDate", flightDate);
  });
function countDown() {
  // get the upcoming date from local storage
  let nextDate = localStorage.getItem("nextDate");
  let neXtLaunch = new Date(nextDate);
  let currentTime = new Date();
  // calculate the difference between the upcoming launch and current date
  let dif = neXtLaunch - currentTime;
  // calculate the days, hours, minutes, seconds
  let d = Math.floor(dif / 1000 / 60 / 60 / 24);
  let h = Math.floor(dif / 1000 / 60 / 60) % 24;
  let m = Math.floor(dif / 1000 / 60) % 60;
  let s = Math.floor(dif / 1000) % 60;
  // change the content of the static counter
  days.textContent = d < 10 ? "0" + d : d;
  hours.textContent = h < 10 ? "0" + h : h;
  minutes.textContent = m < 10 ? "0" + m : m;
  seconds.textContent = s < 10 ? "0" + s : s;
}
// invoke the function every second to create the timer
setInterval(countDown, 1000);

// let days = document.querySelector('.days');
// let hours = document.querySelector('.hours');
// let minutes = document.querySelector('.minutes');
// let seconds = document.querySelector('.seconds');

//The all launches section functionality
fetch("https://api.spacexdata.com/v4/launches/")
  .then((res) => res.json())
  .then((data) => {
    const allLaunches = document.querySelector(".all-launches-container");
    const yearsRange = document.querySelector(".years-range");
    data.forEach((item, index) => {
      // add cards
      allLaunches.appendChild(cardsRender(item));

      // add buttons
      let currentYear = item.date_local.slice(0, 4);

      let nextYear = data[index + 1];
      if (nextYear) {
        if (currentYear !== nextYear.date_local.slice(0, 4)) {
          yearsRange.appendChild(btnRender(item));
        }
      }
    });
    // display the wanted year
    const yearsBtn = document.querySelectorAll(".years-range button");
    yearsBtn.forEach((elm) => {
      elm.addEventListener("click", (item) => {
        const wantedYear = item.target.textContent;
        const allLaunches = document.querySelector(".all-launches-container");
        allLaunches.textContent = "";
        data.forEach((e) => {
          if (e.date_local.includes(wantedYear)) {
            allLaunches.appendChild(cardsRender(e));
          }
        });
      });
    });

    //  Return all launches
    const allBtn = document.querySelector(".all-btn");
    allBtn.addEventListener("click", () => {
      allLaunches.textContent = "";
      data.forEach((item) => {
        allLaunches.appendChild(cardsRender(item));
      });
    });

    // ** add the functionality to the favorite button
    const favoriteLunchesArr = [];
    const allBtnsForChangeCards = document.querySelectorAll(".btn");

    allBtnsForChangeCards.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const tripsCards = document.querySelectorAll(".trips-card");
        tripsCards.forEach((item) => {
          item.addEventListener("click", (e) => {
            e.target.classList.toggle("fa-solid");
            const launchName =
              e.target.parentNode.parentNode.childNodes[0].childNodes[0]
                .textContent;
            e.target.classList.contains("fa-solid")
              ? favoriteLunchesArr.push(launchName)
              : favoriteLunchesArr.splice(
                  favoriteLunchesArr.indexOf(launchName),
                  1
                );
            localStorage.setItem(
              "favorites",
              JSON.stringify(favoriteLunchesArr)
            );
          });
        });
      });
    });
    const heartBtn = document.querySelectorAll(".heart-icon");
    heartBtn.forEach((e) =>
      e.addEventListener("click", (e) => {
        e.target.classList.toggle("fa-solid");
        const launchName =
          e.target.parentNode.parentNode.childNodes[0].childNodes[0]
            .textContent;
        e.target.classList.contains("fa-solid")
          ? favoriteLunchesArr.push(launchName)
          : favoriteLunchesArr.splice(
              favoriteLunchesArr.indexOf(launchName),
              1
            );
        localStorage.setItem("favorites", JSON.stringify(favoriteLunchesArr));
      })
    );

    const favoriteBtn = document.querySelector(".favorite-btn");
    favoriteBtn.addEventListener("click", () => {
      allLaunches.textContent = "";
      const favoriteArr = JSON.parse(localStorage.getItem("favorites"));
      favoriteArr.forEach((lanName) => {
        data.forEach((item) => {
          if (lanName === item.name) {
            allLaunches.appendChild(cardsRender(item));
          }
        });
      });
      const heartBtn = document.querySelectorAll(".heart-icon");
      heartBtn.forEach((e) => {
        e.classList.add("fa-solid");
      });
    });
  })
  .catch((err) => console.log("error", err));

// buttons function
function btnRender(incomingData) {
  const btn = document.createElement("button");
  btn.setAttribute("class", "btn");
  btn.textContent = incomingData.date_local.slice(0, 4);
  return btn;
}
// cards function
function cardsRender(incomingData) {
  const card = document.createElement("div");
  card.setAttribute("class", "trips-card");
  // ** Start creation of an images div
  const tripImgDiv = document.createElement("div");
  const tripImg = document.createElement("img");
  tripImg.setAttribute("src", `${incomingData.links.patch.small}`);
  tripImg.setAttribute("alt", `${incomingData.name}`);
  tripImg.setAttribute("referrerpolicy", "no-referrer");
  tripImgDiv.setAttribute("class", "trip-img");
  tripImgDiv.setAttribute("class", "trip-img");
  tripImgDiv.appendChild(tripImg);
  card.appendChild(tripImgDiv);
  // !! End creation of an images div

  // ** Start creation of an trip information div

  const tripInformationDiv = document.createElement("div");
  tripInformationDiv.setAttribute("class", "trip-information");

  // ** start creation of heading title
  const headingTitle = document.createElement("h1");
  headingTitle.textContent = `${incomingData.name}`;
  headingTitle.setAttribute("class", "trip-title");
  card.appendChild(tripInformationDiv);

  // ** start creation of trip date div
  const tripDateDiv = document.createElement("div");
  tripDateDiv.setAttribute("class", "trip-date");
  tripDateDiv.appendChild(headingTitle);
  const clockIcon = document.createElement("i");
  clockIcon.classList.add("fa-regular", "fa-clock");
  const datePara = document.createElement("p");

  datePara.textContent = `${incomingData.date_local.slice(0, 10)}`;

  tripDateDiv.appendChild(clockIcon);
  tripDateDiv.appendChild(datePara);
  tripInformationDiv.appendChild(tripDateDiv);

  // !! End creation of trip date div

  // ** start creation of trip description div

  const tripDescriptionDiv = document.createElement("div");
  tripDescriptionDiv.setAttribute("class", "trip-description");
  const descriptionPara = document.createElement("p");
  descriptionPara.textContent = `${incomingData.details}`;
  tripDescriptionDiv.appendChild(descriptionPara);
  tripInformationDiv.appendChild(tripDescriptionDiv);

  // !! End creation of trip description div

  // ** start creation of trip buttons div

  const buttonsDiv = document.createElement("div");
  buttonsDiv.setAttribute("class", "trip-btns");

  // ?? create youtube button
  const youtubeBtn = document.createElement("a");
  youtubeBtn.textContent = "youtube";
  youtubeBtn.setAttribute("class", "youtube-btn");
  youtubeBtn.setAttribute("href", `${incomingData.links.webcast}`);
  youtubeBtn.setAttribute("target", "_blank");
  // ?? create read more button
  const readMoreBtn = document.createElement("a");
  readMoreBtn.textContent = "read more ";
  readMoreBtn.setAttribute("class", "more");
  readMoreBtn.setAttribute("href", `${incomingData.links.article}`);
  readMoreBtn.setAttribute("target", "_blank");

  const rightArrowIcon = document.createElement("i");
  rightArrowIcon.classList.add("fa-solid", "fa-chevron-right");
  readMoreBtn.appendChild(rightArrowIcon);
  buttonsDiv.appendChild(youtubeBtn);
  buttonsDiv.appendChild(readMoreBtn);
  tripInformationDiv.appendChild(buttonsDiv);

  // !! End creation of trip buttons div

  // ** Start creation of heart icon div
  const heartDiv = document.createElement("div");
  heartDiv.setAttribute("class", "heart");
  const heartIcon = document.createElement("i");
  heartIcon.classList.add("fa-regular", "fa-heart", "heart-icon");
  heartDiv.appendChild(heartIcon);
  tripInformationDiv.appendChild(heartDiv);
  // !! End creation of heart icon div

  // ** End creation of trip date div

  // !! End creation of an trip information div
  return card;
}

// functionality for scroll bar on mouse event

const slider = document.querySelector(".slider");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove("active");
});

slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("active");
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = x - startX;
  slider.scrollLeft = scrollLeft - walk;
});

// functionality for scroll bar on button click
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

leftArrow.addEventListener("click", (e) => {
  console.log("clicked");
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

rightArrow.addEventListener("click", (e) => {
  console.log("clicked");
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
