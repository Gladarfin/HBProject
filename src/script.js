document.addEventListener('DOMContentLoaded', function() {
    const greenPresent = document.querySelector('.green-present');
    const overlay = document.querySelector('.overlay');
    const storyContainer = document.querySelector('.story-container');
    const storyImage = document.querySelector('.story-image');
    const storyText = document.querySelector('.story-text');
    
    if (greenPresent) {
        greenPresent.addEventListener('click', function() {
            // 1. Скрываем подарок
            this.style.visibility = 'collapse';
            
            // 2. Показываем изображение (первый этап)
            storyImage.style.backgroundImage = "url('/assets/imgs/first-child.jpg')";
            storyContainer.classList.add('active');
            
            // 3. Через 1 секунду затемняем общий фон
            setTimeout(() => {
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                
                // 4. Затемняем само изображение через дополнительный класс
                storyContainer.classList.add('darken-image');
                
                // 5. Показываем и анимируем текст
                setTimeout(() => {
                    storyText.textContent = "Дорогой друг, помнишь этот момент из детства?";
                    storyText.style.width = '0'; // Сбрасываем ширину
                    void storyText.offsetWidth; // Триггер рефлоу для анимации
                    storyText.classList.add('typing');
                }, 500);
            }, 1000);
        });
    }
});