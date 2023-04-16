/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
let choiceMap = {};

console.log("Lunghezza dict: " + Object.keys(choiceMap).length);

function addChoice(event){

    const choice = event.currentTarget;
    const toCheck = choice.querySelector('.checkbox');
    const element = choice.parentNode.querySelectorAll('div');
    
    element.forEach((el) => {
        el.classList.remove('chosen');
        el.querySelector('.checkbox').src =  'images/unchecked.png';
        el.classList.add('notChosen');
    });

    choice.classList.remove('notChosen');
    choice.classList.add('chosen');
    toCheck.src = 'images/checked.png';
    choiceMap[choice.dataset.questionId] = choice.dataset.choiceId;

    console.log(choiceMap);

    checkEnd();
}

function checkEnd(){
    /*for(let key in choiceMap)
        if(choiceMap[key] === null)
            return;*/
    
    if(Object.keys(choiceMap).length < 3)
        return;

    const choices = document.querySelectorAll('.choice-grid div');
    for(const choice of choices){
        choice.removeEventListener('click', addChoice);
    }
    
    evaluateWinner();
}

function evaluateWinner(){
    console.log();
    let winner = '';
    let count = 0;
    for(let key in choiceMap){
        let newCount = 0;
        const toBeEvaluated = choiceMap[key];
        console.log(toBeEvaluated);
        for(let k in choiceMap){
            if(choiceMap[k] === toBeEvaluated){
                newCount = newCount +1;
            }
        }
        console.log(newCount);
        if(newCount > count){
            count = newCount;
            winner=choiceMap[key];
        }
    }
    console.log("winner is: "+winner);

    showWinner(winner);
}

function showWinner(winner){
    const results = document.getElementById('result');
    results.classList.remove('hidden');

    const title = document.getElementById('resultTitle');
    title.innerHTML = '';
    title.innerHTML = RESULTS_MAP[winner].title;


    const contents = document.getElementById('resultContents');
    contents.innerHTML = '';
    contents.innerHTML = RESULTS_MAP[winner].contents;

    window.scrollTo({
        top: 90000,
        left: 0,
        behavior: "smooth"
    });

    /*document.getElementById('resultTitle').innerHTML = 
    document.getElementById('resultContents').innerHTML = RESULTS_MAP[winner].contents;*/
}

function inizializePage(){
    const choices = document.querySelectorAll('.choice-grid div');
    for(const choice of choices){
        choice.classList.remove('chosen');
        choice.classList.remove('notChosen');
        choice.querySelector('.checkbox').src = 'images/unchecked.png';
        choice.addEventListener('click', addChoice);

        document.getElementById('result').classList.add('hidden');
    }

    choiceMap = {};

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    });

}

//----------------------MAIN-----------------------//
inizializePage();

const reload = document.getElementById('restart');
reload.addEventListener('click', inizializePage);
