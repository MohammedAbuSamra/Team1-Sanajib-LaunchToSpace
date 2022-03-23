//The latest launch section functionality
let latestLaunchSection = document.querySelector('.latest-launch');

fetch('https://api.spacexdata.com/v4/launches/latest')
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
    let imgDiv = document.createElement('div');
    imgDiv.classList = 'latest-launch-img';
    latestLaunchSection.appendChild(imgDiv);

    let img = document.createElement('img');
    img.src = imgSrc;
    imgDiv.appendChild(img);
    img.setAttribute('referrerpolicy', 'no-referrer');

    //---------
    const contentDiv = document.createElement('div');
    contentDiv.classList = 'latest-launch-content';
    latestLaunchSection.appendChild(contentDiv);
    //--- flight name
    const tripName = document.createElement('h1');
    tripName.textContent = flightName;
    contentDiv.appendChild(tripName);
    //-- flight date
    const date = document.createElement('p');
    const icon = document.createElement('i');
    icon.classList = 'fa-solid fa-clock';
    date.appendChild(icon);
    const textDate = document.createElement('span');
    textDate.textContent = ` ${flightDate}`;
    date.appendChild(textDate);
    contentDiv.appendChild(date);
    //--- flight description
    const description = document.createElement('p');
    description.textContent =
      'Ratsat was carried to orbit on the first successful orbital launch of any privately funded and developed, liquid-propelled carrier rocket, the SpaceX Falcon 1';
    contentDiv.appendChild(description);
    //---- video link
    let vidBtn = document.createElement('a');
    vidBtn.classList = 'latest-launch-video';
    vidBtn.textContent = 'Youtube Video';
    vidBtn.href = youTube;
    contentDiv.appendChild(vidBtn);
    //---- article link
    let articleBtn = document.createElement('a');
    articleBtn.classList = 'latest-launch-article';
    articleBtn.textContent = 'Read more';
    articleBtn.href = article;
    contentDiv.appendChild(articleBtn);
  })
  .catch((err) => console.log(err));
///===========================================================
/// =============== next launch functionality==================
// get the necessary element
let days = document.querySelector('.days');
let hours = document.querySelector('.hours');
let minutes = document.querySelector('.minutes');
let seconds = document.querySelector('.seconds');
//--- get the parent elements
let nextLaunch = document.querySelector('.next-launch');
let nextLaunchContent = document.querySelector('.next-launch-content');
fetch('https://api.spacexdata.com/v4/launches/next')
  .then((res) => res.json())
  .then((data) => {
    // save the needed data in variables
    let imgSrc = data.links.patch.large;
    let flightName = data.name;
    let flightDate = data.date_utc;
    // create an image and prepend it to its parent
    let img = document.createElement('img');
    img.src = imgSrc;
    img.setAttribute('referrerpolicy', 'no-referrer');
    nextLaunch.prepend(img);
    // add the trip title
    nextLaunchContent.children[1].textContent = flightName;
    // add the timer functionality
    // save the date in the local storage for later use
    localStorage.setItem('nextDate', flightDate);
  });
function countDown() {
  // get the upcoming date from local storage
  let nextDate = localStorage.getItem('nextDate');
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
  days.textContent = d < 10 ? '0' + d : d;
  hours.textContent = h < 10 ? '0' + h : h;
  minutes.textContent = m < 10 ? '0' + m : m;
  seconds.textContent = s < 10 ? '0' + s : s;
}
// invoke the function every second to create the timer
setInterval(countDown, 1000);
