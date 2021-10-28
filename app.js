const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");

let playerLives = 10;

//Link text

playerLivesCount.textContent = playerLives;

//Generate Data
const getData = () => [
  { imgSrc: "./imgs/blackAlien.jpg", name: "Black Alien" },
  { imgSrc: "./imgs/bnegao.jpg", name: "BNegao" },
  { imgSrc: "./imgs/Bordello.jpg", name: "Gogol Bordello" },
  { imgSrc: "./imgs/idles.jpg", name: "idles" },
  { imgSrc: "./imgs/kingkhan.jpg", name: "King Khan" },
  { imgSrc: "./imgs/ramones.jpg", name: "Ramones" },
  { imgSrc: "./imgs/russkaja.jpg", name: "Russkaja" },
  { imgSrc: "./imgs/theClash.jpg", name: "The Clash" },
  { imgSrc: "./imgs/blackAlien.jpg", name: "Black Alien" },
  { imgSrc: "./imgs/bnegao.jpg", name: "BNegao" },
  { imgSrc: "./imgs/Bordello.jpg", name: "Gogol Bordello" },
  { imgSrc: "./imgs/idles.jpg", name: "idles" },
  { imgSrc: "./imgs/kingkhan.jpg", name: "King Khan" },
  { imgSrc: "./imgs/ramones.jpg", name: "Ramones" },
  { imgSrc: "./imgs/russkaja.jpg", name: "Russkaja" },
  { imgSrc: "./imgs/theClash.jpg", name: "The Clash" },
];

// randomize

const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

//card Generator

const cadrGen = () => {
  const cardData = randomize();
  //html

  cardData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    //Attach the info to the cards
    face.src = item.imgSrc;
    card.setAttribute("name", item.name);
    //attach the cards
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};

const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const toggledCard = document.querySelectorAll(".toggleCard");
  //logic

  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), 1000);
      });
      playerLives--;
      playerLivesCount.textContent = playerLives;
      if (playerLives === 0) restart("Try Again");
    }
  }

  //check to see if we won

  if (toggledCard.length === 16) setTimeout(() => restart("You won"), 1000);
};

//Restart

const restart = (text) => {
  let cardData = randomize();
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";
  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");
    //Randomize
    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      faces[index].src = item.imgSrc;
      cards[index].setAttribute("name", item.name);
      section.style.pointerEvents = "all";
    }, 1000);
  });

  playerLives = 10;
  playerLivesCount.textContent = playerLives;

  setTimeout(() => window.alert(text), 100);
};

cadrGen();
