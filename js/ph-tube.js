const loadTubeData = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    displayTubeData(data.data);
}

const displayTubeData = (data) => {
    const tabContainer = document.getElementById('tab-container');
    data.forEach(item => {
        const { category_id, category } = item;
        const a = document.createElement('a');
        a.innerHTML = `<a onclick="loadSingleCategoryData('${category_id}')" class="text-sm sm:text-base text-gray-500 mr-2 sm:mr-4 cursor-pointer bg-gray-200 hover:bg-red-600 hover:text-white px-1 py-1 md:px-3 md:py-2 rounded">${category}</a>`;
        tabContainer.appendChild(a);
    });
}

const loadSingleCategoryData = async (categoryId = 1000) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    displayCategoryData(data.data);
}

const displayCategoryData = items => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerText = '';

    handleEmptyData(items);

    items.forEach(item => {
        const { thumbnail, title } = item;
        const { posted_date, views } = item.others;
        const { profile_picture, profile_name, verified } = item.authors[0];

        const postedTime = parseFloat(posted_date);

        const second = postedTime % 60;
        const totalMinute = (postedTime - second) / 60;
        const minute = totalMinute % 60;
        const hour = (totalMinute - minute) / 60;


        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card card-compact bg-base-100 shadow-xl">
                <figure class="relative">
                    <img class="h-40 w-full" src="${thumbnail}" alt="Shoes" />
                    ${postedTime > 0 ? `<h3 id="posted-time" class="text-sm absolute bottom-2 right-2 px-2 rounded bg-black text-white">${hour}hrs ${minute} min ago</h3>` : ''}
                </figure>
                <div class=" flex gap-5 mt-3 ml-2">
                    <img class="h-10 w-10 rounded-full" src="${profile_picture}" alt="">
                    <div class="pb-5">
                        <h2 class="card-title">${title}</h2>
                        <div class="flex gap-1 items-center">
                            <p>${profile_name} </p>
                            ${verified ? '<img id="verified-icon" class="" width="20" height="20" src="https://img.icons8.com/color/48/verified-badge.png" alt="verified-badge"/>' : ''}
                        </div>
                        <p class="text-sm">${views} Views</p>
                    </div>
                </div>
            </div>
        `;
        cardContainer.appendChild(div);
    })
};

const handleEmptyData = data => {
    const emptyDataImg = document.getElementById('empty-data-img');

    if (data.length === 0) {
        emptyDataImg.classList.remove('hidden');
    }
    else {
        emptyDataImg.classList.add('hidden');
    }
}

//blog page functionality
document.getElementById('blog-section').addEventListener('click', function(){
    location.href = "../blog.html";
})

loadTubeData();
loadSingleCategoryData();