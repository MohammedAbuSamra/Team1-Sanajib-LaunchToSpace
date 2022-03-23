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

// let days = document.querySelector('.days');
// let hours = document.querySelector('.hours');
// let minutes = document.querySelector('.minutes');
// let seconds = document.querySelector('.seconds');
