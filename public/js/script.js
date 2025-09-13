var bgs = ['/img/bg01.jpg',
    '/img/bg02.jpg',
    '/img/bg03.png',
    '/img/bg04.jpg',
    '/img/bg05.jpg'
];
const bg1 = document.getElementById('imgBg1');
const bg2 = document.getElementById('imgBg2');
var index = 0;
var bg2On = false;

setInterval(() => {
    if(bg2On){
        bg2.classList.remove("hide");
        bg2.src = bgs[index];
    } else{
        bg2.classList.add("hide");
        bg1.src = bgs[index];
    }

    index ++;
    bg2On = !bg2On;

    if (index == bgs.length -1){
        index = 0;
    }
}, 5000);

setInterval( async () => {
    const response = await fetch("https://n3-web3.vercel.app/weatherData");
    const jsonResponse = await response.json();
    const pai = document.getElementById('list-card');

    console.log(jsonResponse);
    const message = document.createElement('p');
            
    if(jsonResponse.data.length){
        pai.removeChild(message);

        jsonResponse.data.forEach(clima => {
            const card = document.createElement('article');
            const img = document.createElement('img');
            const h1 = document.createElement('h1');
            const p = document.createElement('p');
            img.src = '/img/hero-image.png';
            img.alt = 'icon clouds and sun';
            img.style.width = '100px';
            card.classList.add("card-list");
            card.appendChild(img);

            h1.innerHTML = clima.temperatura + "°C";
            p.innerHTML = clima.umidade + "%";

            card.appendChild(h1);
            card.appendChild(p);
            pai.appendChild(card);
        });
    } else{
        pai.replaceChildren();
        message.innerHTML = "Aguardando dados...";
        message.style.fontFamily = "Arial";
        message.style.color = "#fff";
        message.style.fontSize = "2.3rem";
        pai.appendChild(message);
    }
}, 5000);
