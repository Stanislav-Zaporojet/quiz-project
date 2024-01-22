const cards = document.querySelectorAll('.plate');
cards.forEach(function(card) {
    card.classList.add('none')
})
cards[0].querySelector('[data-nav="prev"]').remove();
let currentIndex = 0;
let currentCard = 0;
cards[currentIndex].classList.remove('none');
cards[currentIndex].classList.add('visible');
updateProgresBar()
window.addEventListener('click', function(e){
    if (e.target.closest('[data-nav="next"]')) {    
        const result = checkOnAnswer(cards[currentIndex]) 
        const answerWrapper = cards[currentIndex].querySelector('[data-answers]')
        if (result) {
            updateProgresBar('next')
            this.setTimeout(function(){
                cards[currentIndex].classList.remove('visible');
                setTimeout(function(){
                    cards[currentIndex].classList.add('none')
                    currentIndex = currentIndex + 1;
                    cards[currentIndex].classList.remove('none')
                    setTimeout(function(){
                        cards[currentIndex].classList.add('visible');
                    }, 100)
                }, 500)
                answerWrapper.classList.remove('required')
            }, 500)
        } else {
            answerWrapper.classList.add('required')
        }
    }
    if (e.target.closest('[data-nav="prev"]')) {
        updateProgresBar('prev')
        this.setTimeout(function(){
            cards[currentIndex].classList.remove('visible');
            setTimeout(function() {
                cards[currentIndex].classList.add('none')
                currentIndex = currentIndex - 1;
                cards[currentIndex].classList.remove('none')
                setTimeout(function(){
                    cards[currentIndex].classList.add('visible');
                }, 100)
            }, 500)
        }, 500)
    }
})

function checkOnAnswer(card) {
    const radioBtns = card.querySelectorAll('input[type="radio"]');
    if (radioBtns.length > 0) {
        for (let radio of radioBtns) {
            if (radio.checked === true) return true;
        }
    }
    const checkBoxes = card.querySelectorAll('input[type="checkbox"]');
    if (checkBoxes.length > 0) {
        for (let checkbox of checkBoxes) {
            if (checkbox.checked === true) return true;
        }
    }
}

function updateProgresBar(direction = 'start') {
    if (direction === 'next') {
        currentCard = currentCard + 1
    } else if (direction === 'prev') {
        currentCard = currentCard - 1
    }
    const progressValue = document.querySelectorAll('.progress__label strong');
    const progressLineBar = document.querySelectorAll('.progress__line-bar');
    const countableCards = document.querySelectorAll('[data-progress]').length;
    const progress = Math.round((currentCard * 100) / countableCards);
    progressValue.forEach(function(item){
        item.innerText = progress + "%";
    })
    progressLineBar.forEach(function(item){
        item.style.width = progress + "%";
    })
}

const submitForm = document.querySelector('#submitForm');
const inputTel = document.querySelector('#tel');
submitForm.addEventListener('click', function(){
    if (inputTel.value === '+' || inputTel.value.length < 6) {
        inputTel.value = '';
    }
})

const checkBoxPolicy = document.querySelector('#policy')
checkBoxPolicy.addEventListener('focus', function() {
    this.closest('label').classList.add('hovered')
})

checkBoxPolicy.addEventListener('blur', function() {
    this.closest('label').classList.remove('hovered')
})