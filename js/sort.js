const loadData = async (categoryId = 1000) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    displayData(data.data);
}

const displayData = (allData) => {
    allData.forEach(data => {
        let { views } = data.others;
        const totalViewsString = (views.split('K')[0]);
        const totalViews = parseFloat(totalViewsString);
        data.others.views = totalViews;


        allData.sort((a, b) => b.others.views - a.others.views);
        displaySingleData(allData);
    });
}

const displaySingleData = allData => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerText = '';

    allData.forEach(data => {
        let { posted_date, views } = data.others;
        const { thumbnail, title } = data;
        const { profile_picture, profile_name, verified } = data.authors[0];


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
                ${postedTime > 0 ? `<h4 id="posted-time" class="text-sm absolute bottom-2 right-2 px-2 rounded bg-black text-white">${hour}hrs ${minute} min ago</h4>` : ''}
                </figure>
                <div class=" flex gap-5 mt-3 ml-2">
                    <img class="h-10 w-10 rounded-full" src="${profile_picture}" alt="">
                    <div class="pb-5">
                        <h2 class="card-title">${title}</h2>
                        <div class="flex gap-1 items-center">
                            <p>${profile_name} </p>
                            ${verified ? '<img id="verified-icon" class="" width="20" height="20" src="https://img.icons8.com/color/48/verified-badge.png" alt="verified-badge"/>' : ''}
                        </div>
                        <p class="text-sm">${views}K Views</p>
                    </div>
                </div>
            </div>
        `;
        cardContainer.appendChild(div);
    });
};