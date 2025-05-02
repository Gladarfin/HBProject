function resetStoryElements() {
    const storyText = document.querySelector('.story-text');
    const nextArrow = document.querySelector('.next-arrow');
    const storyContainer = document.querySelector('.story-container');
    const overlay = document.querySelector('.overlay');
    const storyImage = document.querySelector('.story-image');
    
    storyText.style.display = 'none';
    storyText.style.width = '0';
    storyText.classList.remove('typing');
    nextArrow.style.display = 'none';
    nextArrow.style.opacity = '0';
    storyContainer.classList.remove('active', 'darken-image');
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    storyImage.style.backgroundImage = '';
    nextArrow.classList.remove('active');
}

function resetAll() {
    document.querySelectorAll('.polaroid-container').forEach(el => {
        el.style.visibility = 'hidden';
        el.style.opacity = '0';
    });
    
    document.querySelectorAll('.green-present, .orange-present, .violet-present, .red-present').forEach(p => {
        p.style.visibility = 'visible';
        p.style.pointerEvents = 'auto';
    });
    
    const multicolorPresent = document.querySelector('.multicolor-present');
    multicolorPresent.style.visibility = 'hidden';
    multicolorPresent.style.opacity = '0';

    resetStoryElements();

    const bgMusic = document.getElementById('bgMusic');
    bgMusic.pause();
    localStorage.setItem('soundOn', 'false');
    
    // 6. Показываем стартовый экран
    const startScreen = document.getElementById('startScreen');
    const mainContent = document.getElementById('mainContent');
    startScreen.style.display = 'flex';
    startScreen.style.opacity = '1';
    mainContent.style.display = 'none';
    mainContent.style.opacity = '0';
}

document.addEventListener('DOMContentLoaded', function() {
    const startScreen = document.getElementById('startScreen');
    const startButton = document.getElementById('startButton');
    const mainContent = document.getElementById('mainContent');
    const bgMusic = document.getElementById('bgMusic');

    startScreen.style.opacity = 1;

    if (localStorage.getItem('soundOn') === 'true' && bgMusic.paused) {
        soundBtn.classList.add('muted');
    }
    
    startButton.addEventListener('click', function() {
        startScreen.style.opacity = 0;
        setTimeout(() => {
            startScreen.style.display = 'none';
            mainContent.style.display = 'block';
            
            setTimeout(() => {
                mainContent.style.opacity = 1;
                bgMusic.volume = 0.4;
                bgMusic.play().catch(e => {
                    console.log('Автовоспроизведение заблокировано');
                    soundBtn.classList.remove('muted');
                });
                
                if (!bgMusic.paused) {
                    soundBtn.classList.remove('muted');
                    localStorage.setItem('soundOn', 'true');
                }
            }, 50);
        }, 800);
    });


    const presents = {
        'green-present': {
            image: '1.png',
            polaroid: 'childhood-image-container',
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
        },
        'red-present': {
            image: '2.png',
            polaroid: 'adolescence-image-container',
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit2."
        },
        'violet-present': {
            image: '3.png',
            polaroid: 'adulthood-image-container',
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit3."
        },
        'orange-present': {
            image: '4.png',
            polaroid: 'etyourth-image-container',
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit4."
        },
        'multicolor-present': {
        image: '5.png',
        polaroid: 'special-image-container',
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit5.",
        isFinal: true
        }
    };

    const overlay = document.querySelector('.overlay');
    const storyContainer = document.querySelector('.story-container');
    const storyImage = document.querySelector('.story-image');
    const storyText = document.querySelector('.story-text');
    const nextArrow = document.querySelector('.next-arrow');
    const repeatArrow = document.querySelector('.repeat-arrow');
    resetStoryElements();
    
    // Обработчики для всех подарков
    document.querySelectorAll('.green-present, .orange-present, .violet-present, .red-present, .multicolor-present').forEach(present => {
        present.addEventListener('click', function() {
            const presentType = this.className.split(' ')[0];
            const config = presents[presentType];
            
            resetStoryElements();
            this.style.visibility = 'collapse';
            storyContainer.classList.add('active');
            overlay.style.transition = 'background-color 1s ease';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            document.querySelectorAll('.green-present, .orange-present, .violet-present, .red-present, .multicolor-present').forEach(p => {
                p.style.pointerEvents = 'none';
            });

            setTimeout(() => {
                storyImage.style.backgroundImage = `url('/assets/imgs/${config.image}')`;

                setTimeout(() => {
                    storyContainer.classList.add('darken-image');
                    storyText.style.display = 'block';
                    storyText.textContent = config.text;
                    storyText.style.width = '0';
                    storyText.classList.remove('typing');
                    void storyText.offsetWidth;
                    storyText.classList.add('typing');
                    
                    const textAnimationDuration = config.text.length * 100;

                    setTimeout(() => {
                        const targetButton = config.isFinal ? repeatArrow : nextArrow;
                        
                        targetButton.style.display = 'block';
                        targetButton.style.opacity = '0';
                        targetButton.dataset.polaroid = config.polaroid;
                        
                        setTimeout(() => {
                            targetButton.style.opacity = '1';
                            targetButton.style.transition = 'opacity 0.5s ease';
                        }, 100);
                        
                        targetButton.classList.add('active');
                    }, textAnimationDuration);
                }, 500);
            }, 100);
        });
    });

    //Кнопка "Далее"
    nextArrow.addEventListener('click', function() {
        
    document.querySelectorAll('.green-present, .orange-present, .violet-present, .red-present, .multicolor-present').forEach(p => {
        p.style.pointerEvents = 'auto';
    });
        if (!this.classList.contains('active')) return;
        this.classList.remove('active');
        const polaroidId = this.dataset.polaroid;
        const polaroidContainer = document.querySelector(`.${polaroidId}`);
        this.style.display = 'none';
        storyText.style.display = 'none';
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100%';
        flash.style.height = '100%';
        flash.style.backgroundColor = 'white';
        flash.style.opacity = '0';
        flash.style.zIndex = '30';
        flash.style.transition = 'opacity 0.3s ease-out';
        document.body.appendChild(flash);
        
        setTimeout(() => {
            flash.style.opacity = '0.9';
            
            setTimeout(() => {
                flash.style.opacity = '0';
                
                setTimeout(() => {
                    document.body.removeChild(flash);
                }, 300);
            }, 100);
        }, 50);
        
        const audio = new Audio('/assets/sounds/polaroid-take-picture.mp3');
        audio.play();
        setTimeout(() => {
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            storyContainer.classList.remove('darken-image');
            // Плавное исчезновение истории
            setTimeout(() => {
                storyContainer.classList.remove('active');
                
                // Эффект проявления соответствующей фотографии
                polaroidContainer.style.visibility = 'visible';
                polaroidContainer.style.opacity = '0';
                polaroidContainer.style.filter = 'brightness(1.3) contrast(0.7)';
                
                const developmentEffect = document.createElement('div');
                developmentEffect.style.position = 'absolute';
                developmentEffect.style.top = '0';
                developmentEffect.style.left = '0';
                developmentEffect.style.width = '100%';
                developmentEffect.style.height = '100%';
                developmentEffect.style.mixBlendMode = 'lighten';
                developmentEffect.style.opacity = '1';
                developmentEffect.style.pointerEvents = 'none';
                polaroidContainer.appendChild(developmentEffect);
                
                setTimeout(() => {
                    polaroidContainer.style.transition = 'opacity 4s ease, filter 4s ease';
                    polaroidContainer.style.opacity = '1';
                    polaroidContainer.style.filter = 'brightness(1) contrast(1)';
                    
                    developmentEffect.style.transition = 'opacity 4s ease';
                    developmentEffect.style.opacity = '0';
                    
                    setTimeout(() => {
                        developmentEffect.remove();
                        polaroidContainer.style.filter = 'none';

                    }, 4000);
                }, 100);
            }, 500);
            checkAllPresentsOpened();
        }, 500);

    });

    repeatArrow.addEventListener('click', function() {
        if (!this.classList.contains('active')) return;
        
        // Анимация исчезновения кнопки
        this.style.opacity = '0';
        setTimeout(() => {
            this.style.display = 'none';
            this.classList.remove('active');
            
            // Полный сброс
            resetAll();
        }, 500);
    });

    // Функция проверки, все ли подарки открыты
    function checkAllPresentsOpened() {
        const allPresents = document.querySelectorAll('.green-present, .orange-present, .violet-present, .red-present');
        const openedPresents = Array.from(allPresents).filter(p => p.style.visibility === 'collapse');
        
        if (openedPresents.length === allPresents.length) {
            setTimeout(() => {
                const multicolorPresent = document.querySelector('.multicolor-present');
                multicolorPresent.style.visibility = 'visible';
                multicolorPresent.style.opacity = '0';
                multicolorPresent.style.transition = 'opacity 1s ease';
                
                setTimeout(() => {
                    multicolorPresent.style.opacity = '2';
                }, 50);
            }, 1000);
        }
    }
});

//Кнопка включения\выключения звука на фоне
const soundBtn = document.getElementById('soundBtn');
const bgMusic = document.getElementById('bgMusic');
bgMusic.volume = 0.4;

const isSoundOn = localStorage.getItem('soundOn') === 'true';
const shouldPlay = isSoundOn && !bgMusic.paused;

if (shouldPlay) {
    bgMusic.play().catch(e => {
        console.log('Автовоспроизведение заблокировано');
        soundBtn.classList.add('muted');
    });
    soundBtn.classList.remove('muted');
} else {
    soundBtn.classList.add('muted');
}

soundBtn.addEventListener('click', function() {
    if (bgMusic.paused) {
        bgMusic.play().then(() => {
            soundBtn.classList.remove('muted');
            localStorage.setItem('soundOn', 'true');
        }).catch(e => {
            console.log('Ошибка воспроизведения:', e);
        });
    } else {
        bgMusic.pause();
        soundBtn.classList.add('muted');
        localStorage.setItem('soundOn', 'false');
    }
});