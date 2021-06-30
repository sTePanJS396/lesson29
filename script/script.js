window.addEventListener('DOMContentLoaded', function () {
   'use strict';
   
//    Таймер
   function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours');
        let timerMinutes = document.querySelector('#timer-minutes');
        let timerSeconds = document.querySelector('#timer-seconds');


        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime();
            let dateNow = new Date().getTime();
            let timeRemaining = (dateStop - dateNow) / 1000;
            let seconds = Math.floor(timeRemaining % 60);
            let minutes = Math.floor((timeRemaining / 60) % 60);
            let hours = Math.floor(timeRemaining / 60 / 60);
            return {timeRemaining, hours, minutes, seconds};
        }

        function addZero(event) {
            if (String(event).length === 1) { return '0' + event; } else { return String(event); }
        };

        function updateClock() {
            let timer = getTimeRemaining();
            timerHours.textContent = addZero(timer.hours);
            timerMinutes.textContent = addZero(timer.minutes);
            timerSeconds.textContent = addZero(timer.seconds);

            if (timer.timeRemaining < 0) {
                clearInterval(thisInterval);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        };

        updateClock();
   };
   let thisInterval = setInterval(countTimer, 1000, '2 jule 2021');

//  Меню
   function toggleMenu() {
        const btnMenu = document.querySelector('.menu');
        const menu = document.querySelector('menu');

        function menuAddOrRemove() {
            menu.classList.toggle('active-menu')
        }

        function heandlerMenu(event) {
            const target = event.target;
            if (target.closest('.menu')) {
                menuAddOrRemove();
            } else if (target.closest('menu') && target.closest('[href^="#"]')) {
                menuAddOrRemove();
            } else if (!target.closest('menu')) {
                menu.classList.remove('active-menu');
            }
        }
        document.body.addEventListener('click', heandlerMenu)
        // btnMenu.addEventListener('click', heandlerMenu);
        // menu.addEventListener('click', heandlerMenu);
   }
   toggleMenu();

//    Модальное окно
   function tooglePopUp() {
        const popup = document.querySelector('.popup');
        const popupBtn = document.querySelectorAll('.popup-btn');
        const popupClose = document.querySelector('.popup-close');
        const popupContent = document.querySelector('.popup-content')

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                    popup.style.display = 'block';
                    // popupAnimationInLibrary();
                    if (document.body.clientWidth > 786) {
                        popupLibrary.counter = popupLibrary.start;
                        popupAnimation();
				    } 
            });
        });
        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });

        popup.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.popup-content');
            if (!target) {
                popup.style.display = 'none'; 
            }
        });
        
        const popupLibrary = {
                counter: -100,
                start: -100,
                speed: 70,
                end: 0, 
        }
        function popupAnimation() {
            popupLibrary.counter++;
            popupContent.style.transform = `translateX(${popupLibrary.counter - 12.5}%)`;
            if (popupLibrary.counter < popupLibrary.end) {
                requestAnimationFrame(popupAnimation);
            }
        };

    //    function popupAnimationInLibrary() {
    //        popup.classList.add('animate__animated');
    //        popup.classList.add('animate__backInUp');
    //    }
    //    popupAnimationInLibrary();
       
   }
   tooglePopUp();

//    Табы

   function tabs() {
       const tabHeader = document.querySelector('.service-header');
       const tab = tabHeader.querySelectorAll('.service-header-tab');
       const tabContent = document.querySelectorAll('.service-tab');

        function toggleTabContent(index) {
            for(let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        }

        tabHeader.addEventListener('click', (event) => {
        let target = event.target;
        target = target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    }
   tabs();

// Слайдер
    
    function slider() {
        const slide = document.querySelectorAll('.portfolio-item');
        const btn = document.querySelectorAll('.portfolio-btn');
        const dot = document.querySelectorAll('.dot');
        const slider = document.querySelector('.portfolio-content');

        let currentSlide = 0;
        let interval;

        function prevSlide(elem, index,strClass) {
            elem[index].classList.remove(strClass);
        }

        function nextSlide(elem, index,strClass) {
            elem[index].classList.add(strClass);            
        }

        function autoPlaySlide() {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        }

        function startSlide(time = 3000) {
            interval = setInterval(autoPlaySlide, time);
        }

        function stopSlide() {
            clearInterval(interval);
        }

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');            

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });


        startSlide(1500);
    }
// Добавление точек на слайде
    function addDots() {
        const portfolioItem = document.querySelectorAll('.portfolio-item');
        const portfolioDots = document.querySelector('.portfolio-dots')
        
        portfolioItem.forEach(() => {
            const dot = document.createElement('li');
            dot.classList.add('dot');
            portfolioDots.appendChild(dot)
        });

        portfolioDots.children[0].classList.add('dot-active');
    }
    addDots()

    slider();

// Картинки

    function changingAttributes() {
        const commandShell = document.querySelector('#command .row');

        function toggleImage(event) {
            if (event.target.classList.contains('command__photo')) {
                const lastImage = event.target.src;

				event.target.src = event.target.dataset.img;
				event.target.dataset.img = lastImage;
            }
        }
        
        commandShell.addEventListener('mouseover', toggleImage);
        commandShell.addEventListener('mouseout', toggleImage);       
    }
    changingAttributes();

// Валидация

     function formValidation() {
        const calculator = document.querySelector('.calc-block');
        const footerFormInput = document.querySelector('.footer-form-input');
        const mainForm = document.querySelector('.main-form');
        const userForm = document.querySelector('#form3');
        const form2Message = document.getElementById('form2-message');

        userForm.addEventListener('input', (event) => {
            if (event.target.type === 'text') {
                event.target.value = event.target.value.replace(/[^а-яА-Я\s+ ]/ig, '');
            }
        });

        userForm.addEventListener('input', (event) => {
            if (event.target.type === 'email') {
                event.target.value = event.target.value.replace(/[^a-zA-Z@_'~*.!-]/ig, '');
            }
        });

        userForm.addEventListener('input', (event) => {
            if (event.target.type === 'tel') {
                event.target.value = event.target.value.replace(/[^[0-9+]/ig, '');
            }
        });

        mainForm.addEventListener('input', (event) => {
            if (event.target.type === 'text') {
                event.target.value = event.target.value.replace(/[^а-яА-Я]/ig, '');
            }
        });

        mainForm.addEventListener('input', (event) => {
            if (event.target.type === 'email') {
                event.target.value = event.target.value.replace(/[^a-zA-Z@_'~*.!-]/ig, '');
            }
        });

        mainForm.addEventListener('input', (event) => {
            if (event.target.type === 'tel') {
                event.target.value = event.target.value.replace(/[^[0-9+]/ig, '');
            }
        });

        calculator.addEventListener('input', (event) => {
            if (event.target.type === 'text') {
                event.target.value = event.target.value.replace(/\s+/g, '');
                event.target.value = event.target.value.replace(/\D/g, '');
            }
        });

        footerFormInput.addEventListener('input', (event) => {
            if (event.target.name === 'user_name') {
				event.target.value = event.target.value.replace(/[^а-яё ]/gi, '');
			}

            if (event.target.name === 'user_message') {
                event.target.value = event.target.value.replace(/[^а-яё ,.0-9]/ig, '');
            }
        });

        footerFormInput.addEventListener('input', (event) => {
            if (event.target.type === 'email') {
                event.target.value = event.target.value.replace(/[^a-zA-Z@_'~*.!-]/ig, '');
            }
        });

        footerFormInput.addEventListener('input', (event) => {
            if (event.target.type === 'tel') {
                event.target.value = event.target.value.replace(/[^[0-9+]/ig, '');
            }
        });

        function bringingToTheRequiredForm() {
            const form1Name = document.getElementById('form1-name');
            // const form1Email = document.getElementById('form1-email');
            const form1Phone = document.getElementById('form1-phone');
            const form2Name = document.getElementById('form2-name');
            // const form2Email = document.getElementById('form2-email');
            const form2Phone = document.getElementById('form2-phone');
            const form2Message = document.getElementById('form2-message');
            const form3Name = document.getElementById('form3-name');
            const form3Phone = document.getElementById('form3-phone');
            // const form3Email = document.getElementById('form3-email');

            let arrForm = [form2Name, form2Phone, form2Message, form1Name, form1Phone, form3Phone, form3Name];
            arrForm.forEach((item) => {
                item.addEventListener('blur', (event) => {
                    if (event.target.type === 'text') {
                        let newStr;
                        function firstLiterals(str) {
                            if (!str) return str;
                            return str[0].toUpperCase() + str.slice(1);
                        }
                        newStr = firstLiterals(event.target.value);
                        event.target.value = newStr;
                        // event.target.value = event.target.value.replace(/^[a-zA-Z]$/gi, '');
                    }
                    event.target.value = event.target.value.trim();
                    event.target.value = event.target.value.replace(/\s+/g, ' ');
                    event.target.value = event.target.value.replace(/-+/g, "-");
                });
            });
        }
        bringingToTheRequiredForm();

    }
    formValidation();

// Калькулятор

    function calc(price = 100) {
        const calcBlock = document.querySelector('.calc-block');
        const calcType = document.querySelector('.calc-type');
        const calcSquare = document.querySelector('.calc-square');
        const calcDay = document.querySelector('.calc-day');
        const calcCount = document.querySelector('.calc-count');
        const totalValue = document.getElementById('total');

        function countSum(params) {
            let total = 0;
            let countValue = 1;
            let dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value;
            const squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue = (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }
            totalValue.textContent = total;
        }
        
        calcBlock.addEventListener('change', (event) => {
            const target = event.target;
            if (target.matches('.calc-type') || target.matches('.calc-square') ||
            target.matches('.calc-day') || target.matches('.calc-count')) {
                countSum();
            }
        });
    }
    calc(100);

// Запросы на сервер (Ajax)

    function sandForm() {
        function cleaningFields() {
            const form1Name = document.getElementById('form1-name');
            const form1Email = document.getElementById('form1-email');
            const form1Phone = document.getElementById('form1-phone');
            const form2Name = document.getElementById('form2-name');
            const form2Email = document.getElementById('form2-email');
            const form2Phone = document.getElementById('form2-phone');
            const form2Message = document.getElementById('form2-message');
            const form3Name = document.getElementById('form3-name');
            const form3Phone = document.getElementById('form3-phone');
            const form3Email = document.getElementById('form3-email');

            let arrForm = [form2Name, form2Phone, form2Message, form1Name, form1Phone, form3Phone, form3Name, form1Email, form3Email, form2Email];

            arrForm.forEach((item) => {
                item.value = '';
            }); 
        }
         

        function form1() {
            const errorMessage = 'Что-то пошло не так...';
            const loadMessage = 'Загрузка...';
            const successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

            const form = document.getElementById('form1');

            const statusMessage = document.createElement('div');
            statusMessage.setAttribute('style', 'font-size: 2rem; color: #ffffff;')

            form.addEventListener('submit', (event) => {
                event.preventDefault();
                form.appendChild(statusMessage);
                statusMessage.textContent = loadMessage;

                const formData = new FormData(form);
                let body = {};

                formData.forEach((val, key) => {
                    body[key] = val;
                });

                postData(body).then((response) => {
                    if (response.status !== 200) {
                        throw new Error('status network not 200');
                    }
                    statusMessage.textContent = successMessage;
                    cleaningFields(); 
                }).catch((error) => {
                    statusMessage.textContent = errorMessage;
                    console.error(error)
                })
					
            });

            function postData(body) {
                return fetch('./server.php', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });
            }
        }
        form1();

        function form2() {
            const errorMessage = 'Что-то пошло не так...';
            const loadMessage = 'Загрузка...';
            const successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

            const form = document.getElementById('form2');

            const statusMessage = document.createElement('div');
            statusMessage.setAttribute('style', 'font-size: 2rem; color: #ffffff;')

            form.addEventListener('submit', (event) => {
                event.preventDefault();
                form.appendChild(statusMessage);
                statusMessage.textContent = loadMessage;

                const formData = new FormData(form);
                let body = {};

                formData.forEach((val, key) => {
                    body[key] = val;
                });

                postData(body).then((response) => {
                    if (response.status !== 200) {
                        throw new Error('status network not 200');
                    }
                    cleaningFields(); 
                    statusMessage.textContent = successMessage;
                }).catch((error) => {
                    statusMessage.textContent = errorMessage;
                    console.error(error)
                })
					
            });

            function postData(body) {
                return fetch('./server.php', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });
            }
        }
        form2();

        function form3() {
            const errorMessage = 'Что-то пошло не так...';
            const loadMessage = 'Загрузка...';
            const successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

            const form = document.getElementById('form3');

            const statusMessage = document.createElement('div');
            statusMessage.setAttribute('style', 'font-size: 2rem; color: #ffffff;')

            form.addEventListener('submit', (event) => {
                event.preventDefault();
                form.appendChild(statusMessage);
                statusMessage.textContent = loadMessage;

                const formData = new FormData(form);
                let body = {};

                formData.forEach((val, key) => {
                    body[key] = val;
                });

                postData(body).then((response) => {
                    if (response.status !== 200) {
                        throw new Error('status network not 200');
                    }
                    cleaningFields(); 
                    statusMessage.textContent = successMessage;
                }).catch((error) => {
                    statusMessage.textContent = errorMessage;
                    console.error(error)
                })
					
            });

            function postData(body) {
                return fetch('./server.php', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });
            }
        }
        form3();
    };
    sandForm()
});