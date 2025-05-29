document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Обновление текста кнопки
    var quantitySelect = document.getElementById('quantity');
    var pricePerUnit = 1990;
    
    if (quantitySelect) {
        quantitySelect.addEventListener('change', function() {
            var quantity = parseInt(this.value) || 1;
            var total = pricePerUnit * quantity;
            
            var orderBtn = document.querySelector('#orderForm .btn');
            if (orderBtn) {
                orderBtn.textContent = 'Заказать ' + quantity + ' шт. за ' + total + '₽';
            }
        });

        // Инициализация при загрузке
        var event = new Event('change');
        quantitySelect.dispatchEvent(event);
    }

    // Форма заказа
    var orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var name = this.elements['name'].value;
            var phone = this.elements['phone'].value;
            var quantity = this.elements['quantity'].value;
            
            var result = document.getElementById('orderResult');
            if (!result) {
                result = document.createElement('div');
                result.id = 'orderResuit';
                orderForm.parentNode.insertBefore(result, orderForm.nextElementSibling);
            }
            result.innerHTML = '<h3>Спасибо за заказ, ' + name + '!</h3>' +
                '<p>Вы заказали ' + quantity + ' экземпляр(а) игры "Замок Монстров".</p>' +
                '<p>Мы свяжемся с вами по телефону ' + phone + '.</p>';
            result.style.display = 'block';
            this.reset();
        });
    }

    // Форма обратной связи
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var name = this.elements['contactName'].value;
            
            var result = document.getElementById('contactResult');
            result.innerHTML = '<h3>Спасибо, ' + name + '!</h3>' +
                '<p>Ваше сообщение отправлено.</p>';
            result.style.display = 'block';
            this.reset();
        });
    }

 // Анимация отзывов с Intersection Observer
function initReviewAnimation() {
    const reviews = document.querySelectorAll('.review-item');
    
    // Сбрасываем анимацию при загрузке
    reviews.forEach(review => review.classList.remove('visible'));
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Убираем класс при выходе из зоны видимости
                entry.target.classList.remove('visible'); 
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    reviews.forEach(review => observer.observe(review));
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initReviewAnimation);
window.addEventListener('load', initReviewAnimation);
    
});