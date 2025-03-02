const apiKey = "4c647f1bc4ef4eec882e42f18d0804bd";
const newsContainer = document.getElementById("newsContainer");
const fetchNewsBtn = document.getElementById("fetchNews");

fetchNewsBtn.addEventListener("click",fetchNews);

async function fetchNews(){
    newsContainer.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
        const data = await response.json();

        if(data.articles){
            newsContainer.innerHTML = "";
            data.articles.slice(0,5).forEach(article => {
                const newsItem = document.createElement("div");
                newsItem.classList.add("news-item");

                newsItem.innerHTML = `
                    <img src="${article.urlToImage || 'icon.png'}" alt="News">
                    <a href="${article.url}" target="_blank">${article.title}</a>
                    `;
                    newsContainer.appendChild(newsItem);
                
            });
        }else{
            newsContainer.innerHTML = "<p>No news available.</p>"
        }


        
    } catch (error) {
        newsContainer.innerHTML = "<p>Error fetching news.</p>";
        console.error(error);
    }
}