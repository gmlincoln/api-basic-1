// Display Button Dynamically
const loadBtn = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
  const data = await res.json();
  const dataCategories = data.data;
  displayBtn(dataCategories);
}
const displayBtn = (dataCategories) => {
  // console.log(dataCategories);
  const displayAllBtn = document.getElementById('display-all-btn');
  dataCategories.forEach(dataCategory => {
    const categoryBtn = document.createElement('button');
    categoryBtn.classList = 'text-[#252525] font-medium px-4 py-2 border rounded-md bg-[rgba(37,37,37,0.20)] active:bg-[#FF1F3D] hover:bg-[#FF1F3D] hover:text-white';
    // console.log();
    categoryBtn.innerText = `${dataCategory.category}`;
    displayAllBtn.appendChild(categoryBtn);

    // pass category id to find category wise video
    categoryBtn.addEventListener('click', function () {
      loadData(dataCategory.category_id);

    });

  });
}

loadBtn();

let viewsData;
// Load Data Dynamically
const loadData = async (categoryId = '1000') => {
  const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
  const data = await res.json();
  const allData = data.data;
  viewsData = allData;
  showMedia(allData);
}



// Show Data
const showMedia = (allData) => {
  //Length of allData
  const dataLength = allData.length;
  if (dataLength > 0) {
    const showAllSection = document.getElementById('display-all-video');
    showAllSection.textContent = '';
    showAllSection.classList.add('grid');
    allData.forEach(data => {
      const displayAllVideo = document.createElement('div');
      displayAllVideo.classList = 'p-4 mb-3';

      // Calculate Hours and Minutes
      const hour = parseInt((data.others?.posted_date / 3600).toFixed(0));
      const minute = parseInt(((data.others?.posted_date % 3600) / 60).toFixed(0));

      displayAllVideo.innerHTML =
        `
        <a href="">
          <!-- video thumbnail -->
          <div class="flex justify-center relative">
            <img src="${data.thumbnail}" alt="" class="relative rounded-lg max-h-[140px] w-full" />
            ${data.others.posted_date === "" ?
          `<p class="hidden"></p>` :
          `<p id="hour-min" 
                class="text-white bg-[#171717] rounded-md absolute text-[12px] p-1 right-[5%] bottom-[5%]">
                  ${hour}hrs ${minute}min ago
          </p >`
        }
        </div >
        <!-- user photo, video title, user and view -->
          <div class="flex flex-row mt-2 gap-2">
            <!-- User Image -->
            <div>
              <a href="">
                <img
                  src="${data.authors[0].profile_picture}"
                  alt=""
                  class="object-center rounded-full w-[50px] h-[50px]"
                />
              </a>
            </div>
            <!-- Title, User and Views -->
            <div>
              <div>
                <!-- Title -->
                <a href="">
                  <p class="text-[#171717] font-bold">
                    ${data.title}
                  </p>
                </a>
              </div>
              <!-- user name -->
              <div class="flex flex-row gap-2 mt-1.5">
                <a href="#" class="text-gray-400">${data.authors[0].profile_name}</a>
                <i>${data.authors[0].verified === "" || data.authors[0].verified === false ? `` : `<img id="verified" src="assets/fi_10629607.svg" alt="" />`}</i>
              </div>
              <!-- views -->
              <div class="mt-1.5">
                <p class="text-gray-400">${data.others?.views} views</p>
              </div>
            </div>
          </div>
      </a >
  `;
      showAllSection.appendChild(displayAllVideo);
    });
  }
  else {
    const showAllSection = document.getElementById('display-all-video');
    showAllSection.classList.remove('grid');
    showAllSection.textContent = '';
    const notFound = document.createElement('div');
    notFound.classList = 'text-center my-6 md:my-20';
    notFound.innerHTML =
      `
    <img src = "assets/Icon.png" alt = "Not Found" class="mx-auto" />
    <h2 class="text-2xl md:text-[32px] text-[#171717;] font-bold">Oops!! Sorry, There is <br /> no content here.</h2>
    `;
    showAllSection.appendChild(notFound);
  }

}

// Sort Video Click Function
document.getElementById('short-video').addEventListener('click', function () {
  sortViews(viewsData); // argument from global variable
})

// sorting video views
const sortViews = (allData) => {
  const sortAllData = allData.sort((a, b) => b.others?.views.slice(0, 3) - a.others?.views.slice(0, 3));
  displaySortVideo(sortAllData)
}

// Display sort videos
const displaySortVideo = (sortAllData) => {
  // console.log(allData, viewsArray);
  if (sortAllData.length > 0) {
    const showAllSection = document.getElementById('display-all-video');
    showAllSection.textContent = '';
    showAllSection.classList.add('grid');
    sortAllData.forEach(data => {
      const displayAllVideo = document.createElement('div');
      displayAllVideo.classList = 'p-4 mb-3';
      // displayAllVideo.innerText = "Hello";
      // Calculate Hours and Minutes
      const hour = parseInt((data.others?.posted_date / 3600).toFixed(0));
      const minute = parseInt(((data.others?.posted_date % 3600) / 60).toFixed(0));

      displayAllVideo.innerHTML =
        `
          <a href="">
            <!-- video thumbnail -->
            <div class="flex justify-center relative">
              <img src="${data.thumbnail}" alt="" class="relative rounded-lg max-h-[140px] w-full" />
              ${data.others.posted_date === "" ?
          `<p class="hidden"></p>` :
          `<p id="hour-min" 
                  class="text-white bg-[#171717] rounded-md absolute text-[12px] p-1 right-[5%] bottom-[5%]">
                    ${hour}hrs ${minute}min ago
            </p >`
        }
          </div >
          <!-- user photo, video title, user and view -->
            <div class="flex flex-row mt-2 gap-2">
              <!-- User Image -->
              <div>
                <a href="">
                  <img
                    src="${data.authors[0].profile_picture}"
                    alt=""
                    class="object-center rounded-full w-[50px] h-[50px]"
                  />
                </a>
              </div>
              <!-- Title, User and Views -->
              <div>
                <div>
                  <!-- Title -->
                  <a href="">
                    <p class="text-[#171717] font-bold">
                      ${data.title}
                    </p>
                  </a>
                </div>
                <!-- user name -->
                <div class="flex flex-row gap-2 mt-1.5">
                  <a href="#" class="text-gray-400">${data.authors[0].profile_name}</a>
                  <i>${data.authors[0].verified === "" || data.authors[0].verified === false ? `` : `<img id="verified" src="assets/fi_10629607.svg" alt="" />`}</i>
                </div>
                <!-- views -->
                <div class="mt-1.5">
                  <p class="text-gray-400">${data.others?.views} views</p>
                </div>
              </div>
            </div>
        </a >
    `;
      showAllSection.appendChild(displayAllVideo);
    })
  }

}
loadData();

// Home 
const homeBtn = () => {
  window.location.href = 'index.html';
}
// Blog 
const blogBtn = () => {
  window.location.href = 'blog.html';
}





