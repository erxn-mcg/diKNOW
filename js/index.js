
var chooseCardMsg = "(Choose card)";
var noCardSelectionMsG = "No card selected";
var noCategorySelectionMsG = "Select exactly five categories";
var turnWonMsg = "You won!"; 
var turnLostMsg = "You lost..."; 
var turnDrawMsg = "Draw.";
var gameWonMsg = "You won the Game: ";
var gameLostMsg = "You lost the Game: "; 
var gameDrawMsg = "It was a Draw: "; 
var turnWaitMsg = "Chose categories";
var gameOverMsg = "Game over";
var gameWaitMsg = "Start a new game?";


var numberOfRounds =5;
var numberOfCategories = 5;
var progressBarPercentage = "width: 14.29%";
var currentRound = 1;

var data_header = ["Dinosaur", "Height", "Weight", "Strength",
				   "Danger", "Coolness", "Life expectancy"];

var summary_header = ["", "Height", "Weight", "Strength",
					  "Danger", "Coolness", "Life expectancy"];

var data_suffix = ["", " meters", " kg", " /10", " %", " %", " yrs"];

var data_comparison = ["", "larger", "larger", "larger", "larger", "larger", "larger"];

var austria = ["T-Rex", 5.6, 6000, 8, 90, 95, 30];
var belgium = ["Triceratops", 3, 6500, 6, 40, 83, 75];
var bulgaria = ["Velociraptor", 0.5, 40, 4, 67, 72, 25];
var croatia = ["Pterodactyl", 9, 200, 5, 72, 98, 37];
var cyprus = ["Silvisaurus", 1.6, 2000, 5, 30, 45, 40];
var czechrepublic = ["Lirainosaurus", 8, 10000, 7, 65, 70, 39];
var denmark = ["Gallimimus", 2, 200, 6, 55, 80, 25];
var estonia = ["Isanosaurus", 6.5, 9000, 8, 85, 60, 45];
var finland = ["Ichthyosaurus", 10, 91, 4, 30, 70, 20];
var france = ["Styracosaurus", 1.8, 1000, 6, 50, 55, 40];
var germany = ["Baryonyx", 8, 2000, 9, 95, 90, 45];
var greece = ["Spinosaurus", 6, 5000, 7, 85, 98, 50];
var hungary = ["Iguanodon", 2.7, 1000, 6, 70, 60, 43];
var ireland = ["Stegosaurus", 4, 7000, 8, 70, 82, 52];
var italy = ["Allosaurus", 5, 4000, 7, 75, 63, 44];
var latvia = ["Brachiosaurus", 12, 8000, 6, 45, 95, 55];
var lithuania = ["Dilophosaurus", 2.8, 2000, 6, 55, 60, 34];
var luxembourg = ["Diplodocus", 20, 8000, 7, 45, 80, 52];
var malta = ["Brontosaurus", 25, 15000, 8, 60, 100, 67];
var netherlands = ["Megalosaurus", 3, 5000, 7, 90, 60, 22];
var poland = ["Yinlong", 4.5, 3000, 5, 69, 67, 38];
var portugal = ["Chubutisaurus", 5, 6000, 7, 50, 70, 22];
var romania = ["Supersaurus", 3, 2000, 4, 60, 35, 35];
var slovakia = ["Platosaurus", 2.5, 3000, 6, 58, 80, 47];
var slovenia = ["Mussaurus", 4, 3500, 7, 85, 45, 31];
var spain = ["Eoraptor", 0.8, 1000, 5, 45, 90, 23];
var sweden = ["Erikosaurus", 4, 2000, 7, 67, 48, 33];
var uk = ["Parasaurolophus", 3.5, 2000, 3, 59, 67, 32];

var allCards = [austria, belgium, bulgaria, croatia, cyprus, czechrepublic,
				denmark, estonia, finland, france, germany, greece, hungary,
				ireland, italy, latvia, lithuania, luxembourg, malta, netherlands,
				poland, portugal, romania, slovakia, slovenia, spain,
				sweden, uk];

// list of cards in case player wants to choose a specific card to play with
// list of arrays with variable name and titel of card
var cardsList = [["austria", "Austria"], ["belgium", "Belgium"],
	["bulgaria", "Bulgaria"], ["croatia", "Croatia"], ["cyprus", "Cyprus"],
	["czechrepublic", "Czech Republic"], ["denmark", "Denmark"], ["estonia", "Estonia"],
	["finland", "Finland"], ["france", "France"], ["germany", "Germany"],
	["greece", "Greece"], ["hungary", "Hungary"], ["ireland", "Ireland"],
	["italy", "Italy"], ["latvia", "Latvia"], ["lithuania", "Lithuania"],
	["luxembourg", "Luxembourg"], ["malta", "Malta"],
	["netherlands", "Netherlands"], ["poland", "Poland"], ["portugal", "Portugal"],
	["romania", "Romania"], ["slovakia", "Slovakia"], ["slovenia", "Slovenia"],
	["spain", "Spain"], ["sweden", "Sweden"], ["uk", "United Kingdom"]];



// Inititate buttons and information displays
var startGameButton;
var startTurnButton;
var newGameButton;
var showSummaryButton;
var waitingButton;
var infoLine;
var summaryList;
var gameProgressBar;
var computerCardDiv;


var viewportWidth = $(window).width();

if (viewportWidth <= 576) {
  $("#hudcontent").css( "maxWidth", viewportWidth );
  $("#buttons").css( "maxWidth", viewportWidth );
  $("#infocontent").css( "maxWidth", viewportWidth );
}

var gameMode;
var chosenCard;
var chosenCategories;
var playerCards;
var computerCards;
var playerPoints;
var computerPoints;
var playerCount;
var computerCount;
var currentPlayerCard;
var currentComputerCard;
var stateOfGame;

function formatNumbers(num){
  return (
    num
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
}

function shuffleCards() {
  var currentIndex = allCards.length;
  var temporaryValue;
  var randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = allCards[currentIndex];
    allCards[currentIndex] = allCards[randomIndex];
    allCards[randomIndex] = temporaryValue;
  }

}



function updateButtons(state) {
  stateOfGame = state;
  switch(state) {
    case 1:
      document.getElementById("hud").style.display = "none";
      document.getElementById("hud2").style.display = "none";
      document.getElementById("getMode").style.display = "flex";
      document.getElementById("getCategories").style.display = "none";
      document.getElementById("summary").style.display = "none";
      document.getElementById("cards").style.display = "none";
      document.getElementById("buttons").style.display = "none";
      newGameButton.style.display = "none";
      while (summaryList.hasChildNodes()) {
        summaryList.removeChild(summaryList.lastChild);
      }

      getMode();
      break;
    case 2:
      document.getElementById("hud").style.display = "none";
      document.getElementById("hud2").style.display = "none";
      document.getElementById("getMode").style.display = "none";
      document.getElementById("getCategories").style.display = "flex";
      document.getElementById("summary").style.display = "none";
      document.getElementById("cards").style.display = "none";
      document.getElementById("buttons").style.display = "none";
      getCategories();
      break;
    case 3:
      document.getElementById("hud").style.display = "block";
      document.getElementById("getMode").style.display = "none";
      document.getElementById("getCategories").style.display = "none";
      document.getElementById("summary").style.display = "none";
      document.getElementById("cards").style.display = "block";
      document.getElementById("buttons").style.display = "flex";
      startGameButton.style.display = "none";
      startTurnButton.style.display = "none";
      newGameButton.style.display = "none";
      waitingButton.style.display = "inline";
      showSummaryButton.style.display = "none";
      infoLine.innerHTML = "";
      break;
    case 4:
      startGameButton.style.display = "none";
      startTurnButton.style.display = "inline";
      newGameButton.style.display = "none";
      waitingButton.style.display = "none";
      showSummaryButton.style.display = "none";
      break;
    case 5:
      startGameButton.style.display = "none";
      startTurnButton.style.display = "none";
      newGameButton.style.display = "none";
      waitingButton.style.display = "inline";
      showSummaryButton.style.display = "none";
      infoLine.classList.remove("text-success");
      infoLine.classList.remove("text-danger");
      infoLine.classList.remove("text-warning");
      infoLine.classList.add("text-light");
      infoLine.innerHTML = "<h4 class='mb-1'>Round " + currentRound + " of " +
                           numberOfRounds + "</h4>";
      break;
    case 6:
      startGameButton.style.display = "none";
      startTurnButton.style.display = "none";
      newGameButton.style.display = "none";
      waitingButton.style.display = "none";
      showSummaryButton.style.display = "inline";
      break;
    case 7:
      startGameButton.style.display = "none";
      startTurnButton.style.display = "none";
      newGameButton.style.display = "inline";
      waitingButton.style.display = "none";
      showSummaryButton.style.display = "none";
      infoLine.style.display = "none";
      document.getElementById("summary").style.display = "block";
      document.getElementById("cards").style.display = "none";
      document.getElementById("hud2").style.display = "none";
      break;
  }
}

function getMode() {

  var cardsListDropdown = document.getElementById("chosenCardSelect");
  var noCardSelectionDiv = document.getElementById("noCardSelection");
  noCardSelectionDiv.innerHTML = "";
  while (cardsListDropdown.hasChildNodes()) {
    cardsListDropdown.removeChild(cardsListDropdown.lastChild);
  }

  var chooseCardMsgElement = document.createElement("option");
  chooseCardMsgElement.value = "noSelection";
  var chooseCardMsgContent = document.createTextNode(chooseCardMsg);
  chooseCardMsgElement.appendChild(chooseCardMsgContent);
  cardsListDropdown.appendChild(chooseCardMsgElement);

  var newCardInList;
  var newCardInListContent;

  for (i = 0; i < cardsList.length; i+=1) {
    newCardInList = document.createElement("option");
    newCardInList.value = cardsList[i][0];
    newCardInListContent = document.createTextNode(cardsList[i][1]);
    newCardInList.appendChild(newCardInListContent);
    cardsListDropdown.appendChild(newCardInList);
  }



  chosenCategories = [];
  for (i = 1; i < data_header.length; i+=1) {
    chosenCategories.push(i);
  }

  var currentCatIndex = chosenCategories.length;
  var temporaryCatValue;
  var randomCatIndex;

  while (0 !== currentCatIndex) {

    // Pick a remaining element...
    randomCatIndex = Math.floor(Math.random() * currentCatIndex);
    currentCatIndex -= 1;

    // And swap it with the current element.
    temporaryCatValue = chosenCategories[currentCatIndex];
    chosenCategories[currentCatIndex] = chosenCategories[randomCatIndex];
    chosenCategories[randomCatIndex] = temporaryCatValue;
  }

  // Use number (specified before) of categories of shuffled list
  chosenCategories = chosenCategories.slice(0, numberOfCategories);



  // Let player choose game mode
  $(document).on("click", "#randomCards", function() {
    gameMode = "random";
    initGame();
  });

  $(document).on("click", "#chosenCardButton", function() {
    gameMode = "fixedCard";
    chosenCard = $("#chosenCardSelect :selected").val();

    if (chosenCard == "noSelection") {
      noCardSelectionDiv.innerHTML = noCardSelectionMsG;
    } else {
      initGame();
    }

  });

}

function getCategories() {
  // function to let user select, which categories to play with:
  // either with five random categories
  // or with five fixed categories

  var categoriesList = document.getElementById("chosenCategoriesList");
  var noCategorySelectionDiv = document.getElementById("noCategorySelection");
  noCategorySelectionDiv.innerHTML = "";

  // Reset checkboxes for categories
  while (categoriesList.hasChildNodes()) {
    categoriesList.removeChild(categoriesList.lastChild);
  }

  // Build checkboxes with categories
  var newCategoryCheckbox;
  var newCategoryInput;
  var newCategoryLabel;
  var newCategoryLabelContent;

  for (i = 1; i < data_header.length; i+=1) {
    newCategoryCheckbox = document.createElement("div");
    newCategoryCheckbox.classList.add("custom-control", "custom-checkbox",
                                      "custom-control-inline");

    newCategoryInput = document.createElement("input");
    newCategoryInput.id = i;
    newCategoryInput.classList.add("custom-control-input");
    newCategoryInput.type = "checkbox";

    newCategoryLabel = document.createElement("label");
    newCategoryLabel.classList.add("custom-control-label");
    newCategoryLabel.setAttribute("for", i);
    newCategoryLabelContent = document.createTextNode(data_header[i]);
    newCategoryLabel.appendChild(newCategoryLabelContent);

    newCategoryCheckbox.appendChild(newCategoryInput);
    newCategoryCheckbox.appendChild(newCategoryLabel);

    categoriesList.appendChild(newCategoryCheckbox);
  }

  // Let player choose categories

  // If player chooses random categories, create random array of five numbers
  $(document).on("click", "#randomCategories", function() {
    chosenCategories = [];
    for (i = 1; i < data_header.length; i+=1) {
      chosenCategories.push(i);
    }

    var currentCatIndex = chosenCategories.length;
    var temporaryCatValue;
    var randomCatIndex;

    // While there remain elements to shuffle...
    while (0 !== currentCatIndex) {

      // Pick a remaining element...
      randomCatIndex = Math.floor(Math.random() * currentCatIndex);
      currentCatIndex -= 1;

      // And swap it with the current element.
      temporaryCatValue = chosenCategories[currentCatIndex];
      chosenCategories[currentCatIndex] = chosenCategories[randomCatIndex];
      chosenCategories[randomCatIndex] = temporaryCatValue;
    }

    // Use first five categories of shuffled list
    chosenCategories = chosenCategories.slice(0, numberOfCategories);

    initGame();

  });

  // if player chooses own categories, store in array
  $(document).on("click", "#chosenCategoriesButton", function() {
    chosenCategories = [];
    for (i = 1; i < data_header.length; i+=1) {
      currentCatID = "#" + i;
      if ($(currentCatID).is(":checked"))
        chosenCategories.push(i);
    }

    if (chosenCategories.length != numberOfCategories) {
      noCategorySelectionDiv.innerHTML = noCategorySelectionMsG;
    } else {
      initGame();
    }
  });

}

function buildDecks() {
  // Assign cards to player and computer according to game mode selection

  if (gameMode == "random") {
    // Deal 7 random cards each
    playerCards = allCards.slice(0, numberOfRounds);
    computerCards = allCards.slice(numberOfRounds, 14);
  } else {
    // assign the chosen card to player seven times
    playerCards = [];
    for (i = 0; i < numberOfRounds; i+=1) {
      playerCards.push(eval(chosenCard));
    }
    // remove chosen player card from cards, assign computer random cards
    chosenCardIndex = allCards.indexOf(eval(chosenCard));
    allCards.splice(chosenCardIndex, 1);
    computerCards = allCards.slice(0, numberOfRounds);
  }

}

function updateScore() {
  // function to display the current score
  playerCount = document.getElementById("player_count");
  computerCount = document.getElementById("computer_count");
  playerCount.innerHTML = playerPoints;
  computerCount.innerHTML = computerPoints;
}

function buildComputerCard() {
  // function to display the current card of the computer
  computerCardDiv.classList.toggle("flip");

  var computerCardBack = document.getElementById("computerCardBack");
  computerCardBack.style.height = $(playercard).height() + "px";
  var computercardBackHeader=document.getElementById("computercardBackHeader");
  computercardBackHeader.innerHTML =  currentComputerCard[0];


  setTimeout(function(){
    //wait with card content so as not to display it before card is flipped back

    // Change heading of computer card
    var computercardHeader = document.getElementById("computercard_header");
    computercardHeader.innerHTML = "<h3 class='m-3 card-title'>" +
                                   currentComputerCard[0] + "</h3>";

    // Fill in computer card by looping through card-array
    var computercardCategories = document
      .getElementById("computercard_categories");
    computercardCategories.innerHTML = "";
    for (i = 0; i < chosenCategories.length; i+=1) {

      var currentCategory = chosenCategories[i];

      // make new row
      var newRow = document.createElement("div");
      newRow.id = "computer_category_row" + currentCategory;
      newRow.classList.add("list-group-item", "d-flex",
                           "w-100", "justify-content-between");
      document.getElementById("computercard_categories").appendChild(newRow);

      // category
      var newCat = document.createElement("h6");
      var newCatContent = document.createTextNode(data_header[currentCategory]);
      newCat.appendChild(newCatContent);
      document.getElementById("computer_category_row" + currentCategory)
        .appendChild(newCat);

      // show value
      var newVal = document.createElement("span");
      var currentValue = formatNumbers(currentComputerCard[currentCategory]);
      var newValContent = document
        .createTextNode(currentValue + data_suffix[currentCategory]);
      newVal.appendChild(newValContent);
      newVal.id = "computercardCategory" + currentCategory;
      newVal.classList.add("category_nolink");
      document.getElementById("computer_category_row" + currentCategory)
        .appendChild(newVal);
    }
  }, 500);
}


// functions needed when page loads
$(document).ready(function() {

  startGameButton = document.getElementById("startGame");
  startGameButton.addEventListener("click", initGame);

  startTurnButton = document.getElementById("startTurn");
  startTurnButton.addEventListener("click", initTurn);

  newGameButton = document.getElementById("newGame");
  newGameButton.addEventListener("click", initNewGame);

  showSummaryButton = document.getElementById("showSummary");
  showSummaryButton.addEventListener("click", initSummary);

  waitingButton = document.getElementById("waiting");

  infoLine = document.getElementById("info_line");
  summaryList = document.getElementById("summary_list");
  gameProgressBar = document.getElementById("gameProgress");

  computerCardDiv = document.getElementById("computercard");


  // Players turn: player chooses category
  $(document).on("click", ".category_link", function(event) {

    if (stateOfGame == 5) {

      var computerCardDiv = document.getElementById("computercard");
      var firstComputerCard = currentComputerCard;
      var firstPlayerCard = currentPlayerCard;

      // turn over computer card
      computerCardDiv.classList.toggle("flip");

      // log the chosen category
      var categoryID = parseInt(this.id.slice(-1));
      if (categoryID == 0) {
        categoryID = 10;
      }
      var chosenPlayerCategory = document
        .getElementById("playercardCategory" + categoryID);
      var chosenComputerCategory = document
        .getElementById("computercardCategory" + categoryID);

      // Prepare summary entry

      var newSummaryLine = document.createElement("div");
      newSummaryLine.classList.add("d-flex", "w-100", "border-top", "py-1");


      var newSummaryPlayer = document.createElement("div");
      newSummaryPlayer.classList.add("text-right", "summary_left")
      newSummaryPlayer.innerHTML = currentPlayerCard[0] + "<br>" +
        formatNumbers(currentPlayerCard[categoryID]) + data_suffix[categoryID];

      var newSummaryCat = document.createElement("div");
      newSummaryCat.classList
        .add("text-center", "d-inline-block", "px-1", "text-secondary", "summary_center")
      newSummaryCat.innerHTML = "<i>" + summary_header[categoryID] + "</i>";

      var newSummaryComputer = document.createElement("div");
      newSummaryComputer.classList.add("text-left", "summary_right")
      newSummaryComputer.innerHTML = currentComputerCard[0] + "<br>" +
        formatNumbers(currentComputerCard[categoryID]) +data_suffix[categoryID];

      if (data_comparison[categoryID] == "larger") {
        if (firstPlayerCard[categoryID] > firstComputerCard[categoryID]) {
          newSummaryPlayer.classList.add("winner");
        } else if (firstPlayerCard[categoryID] < firstComputerCard[categoryID]){
          newSummaryComputer.classList.add("winner");
        }
      } else {
        if (firstPlayerCard[categoryID] < firstComputerCard[categoryID]) {
          newSummaryPlayer.classList.add("winner");
        } else if (firstPlayerCard[categoryID] > firstComputerCard[categoryID]){
          newSummaryComputer.classList.add("winner");
        }
      }

      newSummaryLine.appendChild(newSummaryPlayer);
      newSummaryLine.appendChild(newSummaryCat);
      newSummaryLine.appendChild(newSummaryComputer);

      summaryList.appendChild(newSummaryLine);

      // Prepare progress-bar

      var progressBarWin = document.createElement("div");
      progressBarWin.classList.add("progress-bar", "bg-success");
      progressBarWin.style = progressBarPercentage;
      progressBarWin.role = "progressbar";

      var progressBarLose = document.createElement("div");
      progressBarLose.classList.add("progress-bar", "bg-danger");
      progressBarLose.style = progressBarPercentage;
      progressBarLose.role = "progressbar";

      var progressBarDraw = document.createElement("div");
      progressBarDraw.classList.add("progress-bar", "bg-warning");
      progressBarDraw.style = progressBarPercentage;
      progressBarDraw.role = "progressbar";

      // compare values, change message accordingly, update score

      if (data_comparison[categoryID] == "larger") {
        if (firstPlayerCard[categoryID] > firstComputerCard[categoryID]) {
          chosenPlayerCategory.classList.add("text-success");
          chosenComputerCategory.classList.add("text-danger");
          infoLine.classList.remove("text-light");
          infoLine.classList.add("text-success");
          infoLine.innerHTML = "<h4 class='mb-1'>" + turnWonMsg + "</h4>";
          gameProgressBar.appendChild(progressBarWin);
          playerPoints += 1;
        } else if (firstPlayerCard[categoryID] < firstComputerCard[categoryID]){
          chosenPlayerCategory.classList.add("text-danger");
          chosenComputerCategory.classList.add("text-success");
          infoLine.classList.remove("text-light");
          infoLine.classList.add("text-danger");
          infoLine.innerHTML = "<h4 class='mb-1'>" + turnLostMsg + "</h4>";
          gameProgressBar.appendChild(progressBarLose);
          computerPoints += 1;
        } else {
          chosenPlayerCategory.classList.add("text-warning");
          chosenComputerCategory.classList.add("text-warning");
          infoLine.classList.remove("text-light");
          infoLine.classList.add("text-warning");
          infoLine.innerHTML = "<h4 class='mb-1'>" + turnDrawMsg + "</h4>";
          gameProgressBar.appendChild(progressBarDraw);
        }
      } else {
        if (firstPlayerCard[categoryID] < firstComputerCard[categoryID]) {
          chosenPlayerCategory.classList.add("text-success");
          chosenComputerCategory.classList.add("text-danger");
          infoLine.classList.remove("text-light");
          infoLine.classList.add("text-success");
          infoLine.innerHTML = "<h4 class='mb-1'>" + turnWonMsg + "</h4>";
          playerPoints += 1;
          gameProgressBar.appendChild(progressBarWin);
        } else if (firstPlayerCard[categoryID] > firstComputerCard[categoryID]){
          chosenPlayerCategory.classList.add("text-danger");
          chosenComputerCategory.classList.add("text-success");
          infoLine.classList.remove("text-light");
          infoLine.classList.add("text-danger");
          gameProgressBar.appendChild(progressBarLose);
          infoLine.innerHTML = "<h4 class='mb-1'>" + turnLostMsg + "</h4>";
          computerPoints += 1;
        } else {
          chosenPlayerCategory.classList.add("text-warning");
          chosenComputerCategory.classList.add("text-warning");
          infoLine.classList.remove("text-light");
          infoLine.classList.add("text-warning");
          infoLine.innerHTML = "<h4 class='mb-1'>" + turnDrawMsg + "</h4>";
          gameProgressBar.appendChild(progressBarDraw);
        }
      }

      updateScore();


      //remove current card from decks

      playerCards.shift();
      computerCards.shift();
      currentRound += 1;

      // Proceed: Next card, if cards left or summary, if no cards left

      if (playerCards.length > 0) {
        updateButtons(4);
      } else {
        updateButtons(6);
        infoLine.classList.remove("text-success");
        infoLine.classList.remove("text-warning");
        infoLine.classList.remove("text-danger");
        infoLine.classList.add("text-light");
        infoLine.innerHTML = "<h4 class='mb-1'>" + gameOverMsg + "</h4>";
      }

    }

  } );

  // Show gameMode-Chooser on load - GAME IS STARTED HERE
  updateButtons(1);

});


// initiate new game after a game is finished
function initNewGame() {
  // updateButtons(1);
  window.location.reload()
}


function initGame() {
  //Function to initiate the actual game

  // Shuffle and deal cards
  shuffleCards();
  buildDecks();

  // Show cards and beginn game
  updateButtons(3);

  // Reset score
  playerPoints = 0;
  computerPoints = 0;
  updateScore();

  // Reset progress bar
  while (gameProgressBar.hasChildNodes()) {
    gameProgressBar.removeChild(gameProgressBar.lastChild);
  }

  // Start turn
  initTurn()
}

function initSummary() {
  //Function to display a summary of each turn after the game

  // Change buttons when summary is shown
  updateButtons(7)

  var summaryHeadline = document.getElementById("summaryHeadline");

  if (playerPoints > computerPoints) {
    summaryHeadline.innerHTML = "<h3 class='text-success'>" + gameWonMsg +
      playerPoints + ":" + computerPoints + "</h3>";
  }
  if (playerPoints < computerPoints) {
    summaryHeadline.innerHTML = "<h3 class='text-danger'>" + gameLostMsg +
      playerPoints + ":" + computerPoints + "</h3>";
  }
  if (playerPoints == computerPoints) {
    summaryHeadline.innerHTML = "<h3 class='text-warning'>" + gameDrawMsg +
      playerPoints + ":" + computerPoints + "</h3>";
  }
}

function initTurn() {
  //Function to initiate the next turn by showing the topmost player card

  updateButtons(5);

  // choose first card from each deck
  currentPlayerCard = playerCards[0];
  currentComputerCard = computerCards[0];

  // Change heading of player card
  var playercardHeader = document.getElementById("playercard_header");
  playercardHeader.innerHTML = "<h3 class='m-3 card-title'>" +
    currentPlayerCard[0] + "</h3>";

  // Fill in player card by looping through card-array
  var playercardCategories = document.getElementById("playercard_categories");
  playercardCategories.innerHTML = "";
  for (i = 0; i < chosenCategories.length; i+=1) {

    var currentCategory = chosenCategories[i];

    // make new row
    var newRow = document.createElement("div");
    newRow.id = "player_category_row" + currentCategory;
    newRow.classList
      .add("list-group-item");
    document.getElementById("playercard_categories").appendChild(newRow);

    // category
    var newCat = document.createElement("h6");
    var newCatContent = document.createTextNode(data_header[currentCategory]);
    newCat.appendChild(newCatContent);

    // value


    var newVal = document.createElement("h6");
    var currentValue = formatNumbers(currentPlayerCard[currentCategory]);
    var newValContent = document
      .createTextNode(currentValue + data_suffix[currentCategory]);
    newVal.appendChild(newValContent);

    // link whole row
    var newRowLink = document.createElement("a");
    newRowLink.id = "playercardCategory" + currentCategory;
    newRowLink.href = "#";
    newRowLink.classList
      .add("category_link", "d-flex", "w-100", "justify-content-between");
    newRowLink.appendChild(newCat);
    newRowLink.appendChild(newVal);
    document.getElementById("player_category_row" + currentCategory)
      .appendChild(newRowLink);

  }

  buildComputerCard();

}
