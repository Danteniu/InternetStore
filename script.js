// БУРГЕР МЕНЮ
const menuActive = document.querySelector('.menu'); // Находим меню
const burger = document.querySelector('.head_buttons'); // Находим кнопку бургера
console.log(burger);

function toggleMenu() {
    console.log('lala');
    menuActive.classList.toggle("hiddens");
    menuActive.classList.toggle("menu_active"); //Ф-ция уделяет или устанавливает клесс с названием "hidden"
    // div с классом •menu-active
}

burger.addEventListener('click', toggleMenu); // По клику на бургер, срабатывает ф-ция

function validateForm(event) {
    event.preventDefault(); // Чтобы не отправлять форму сразу

    // Получаем значения всех полей
    const firstName = document.getElementById('firstName').value;
    console.log(firstName);
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const male = document.getElementById('male').checked;
    const female = document.getElementById('female').checked;

    // Проверяем, что все поля заполнены
    if (firstName && lastName && email && password && (male || female)) {
        // Если все поля заполнены, показываем сообщение об успешной регистрации
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('errorMessage').style.display = 'none';
    } else {
        // Если не все поля заполнены, показываем ошибку
        document.getElementById('successMessage').style.display = 'none';
        document.getElementById('errorMessage').style.display = 'block';
    }
}



// НА КОРЗИНКЕ УВЕЛИЧИВАЛОСЬ ЧИСЛО
// Находим элементы
const cartCountElement = document.querySelector('.head_img_4_5 span'); // Элемент с количеством товаров
const addToCartButton = document.querySelectorAll('.item-img__hover-btn'); // Кнопки "Добавить в корзину"
const cartItemsContainer = document.querySelector('.cart-items-container'); // Контейнер для товаров в корзине (например, список товаров)

let currentCount = parseInt(localStorage.getItem('cartCount')) || 0; // Используем 0, если значение не найдено
cartCountElement.textContent = currentCount; // Обновляем отображение количества товаров

// Обработчик для добавления товара в корзину
addToCartButton.forEach(element => {
    element.addEventListener('click', () => {
        // Увеличиваем количество товаров
        currentCount++;

        // Обновляем количество в корзине
        cartCountElement.textContent = currentCount;

        // Сохраняем новое количество товаров в локальном хранилище
        localStorage.setItem('cartCount', currentCount);

        // Создаём и показываем сообщение "Товар добавлен в корзину"
        const message = document.createElement('div');
        message.textContent = "Товар добавлен в корзину";
        message.classList.add('cart-message'); // Добавим класс для стилизации

        // Добавляем сообщение на страницу
        document.body.appendChild(message);

        // Через 3 секунды скрываем сообщение
        setTimeout(() => {
            message.remove();
        }, 3000); // Сообщение исчезнет через 3 секунды
    });
});

// Находим кнопку и блок с сообщением
const subscribeButton = document.querySelector('.white_but');
const successMessage = document.querySelector('.success-message');
const errorMessage = document.querySelector('.error-message');
const emailInput = document.querySelector('.email-input');

// Обработчик клика по кнопке "Подписаться"
subscribeButton.addEventListener('click', function(e) {
    e.preventDefault(); // Предотвращаем отправку формы

    // Проверка на пустоту email поля
    const emailValue = emailInput.value.trim(); // Убираем пробелы по краям
    if (emailValue === "") {
        // Если email не введен, показываем ошибку
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none'; // Скрываем сообщение об успешной подписке
    } else {
        // Если email введен, показываем сообщение об успехе
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none'; // Скрываем сообщение об ошибке

        // Скрыть сообщение об успехе через 3 секунды
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }
});


//ДОБАВЛЕНИЕ ТОВАРА В КОРЗИНУ!!!!!!!

document.addEventListener('DOMContentLoaded', function() {
    const cartCountElement = document.querySelector('.head_img_4_5 span');
    let currentCount = parseInt(localStorage.getItem('cartCount')) || 0; // Получаем количество товаров из localStorage

    // Устанавливаем количество в корзине
    if (cartCountElement) {
        cartCountElement.textContent = currentCount; // Отображаем количество товаров
    }

    // Проверка, существует ли элемент каталога товаров на странице
    if (document.querySelector('.item-img__hover-btn')) {
        const addToCartButtons = document.querySelectorAll('.item-img__hover-btn');
        let cart = JSON.parse(localStorage.getItem('cart')) || []; // Загружаем корзину из localStorage

        // Обработчик для добавления товара в корзину
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Пример добавления товара в корзину
                const productCard = button.closest('.background_card'); // Находим родительский элемент
                const productName = productCard.querySelector('.text_card_description h2').textContent;
                const productPrice = productCard.querySelector('.text_card_description h1').textContent;
                const productColor = productCard.querySelector('.text_card_description h6') ? productCard.querySelector('.text_card_description h6').textContent : '';

                const productImage = productCard.querySelector('.item-img').style.backgroundImage;

                // Добавляем товар в корзину
                cart.push({
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    color: productColor
                });

                // Увеличиваем количество товаров
                currentCount++;

                // Сохраняем корзину и количество товаров в localStorage
                localStorage.setItem('cart', JSON.stringify(cart));
                localStorage.setItem('cartCount', currentCount);

                // Обновляем отображение количества товаров в корзине
                cartCountElement.textContent = currentCount;
            });
        });
    }
});

// Обработчик для удаления товара из корзины и обновления счетчика
if (document.querySelector('.shopping_cart_items')) {
    const cartItemsContainer = document.querySelector('.shopping_cart_items');
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Загружаем корзину из localStorage

    // Функция для обновления корзины
    function updateCart() {
        cartItemsContainer.innerHTML = ''; // Очищаем корзину перед обновлением
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="shopping_cart_ppp">Ваша корзина пуста.</p>'; // Сообщение, если корзина пуста
            return;
        }

        let prices = [];
        // Создаём элементы для товаров в корзине с динамическими классами
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('shopping_cart_main'); // Основной контейнер для всех товаров

            // Внутри основного контейнера создаём отдельный блок для каждого товара
            const itemBlock = document.createElement('div');
            itemBlock.classList.add(`shopping_cart_${index + 1}`); // Используем динамическое добавление класса для каждого товара

            // Извлекаем путь к картинке из строки, например: url("./img/6card.png") -> ./img/6card.png
            const imagePath = item.image.replace(/^url\(["']?([^"']+)["']?\)$/, '$1'); // Убираем обёртку url(...)

            // Заполняем товар в корзине
            itemBlock.innerHTML = `
                <img class="shopping_cart_img" src="${imagePath}" alt="${item.name}">
                <div class="shopping_cart_block">
                    <h1 class="shopping_cart_h1">${item.name}</h1>
                    <ul class="shopping_cart_ul">
                        <li class="shopping_cart_li">Цена: <span class="pink_text">${item.price}</span></li>
                        <li class="shopping_cart_li">Цвет: ${item.color}</li>
                        <li class="shopping_cart_li">Размер: Xl</li>
                        <div class="shopping_cart_li_div">
                            <li class="shopping_cart_li">Количество:</li>
                            <input class="shopping_cart_p" type="number" value="1">
                        </div>
                    </ul>
                </div>
                <svg class="shopping_cart_cross" width="18.000000" height="18.000000" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.24 9L17.53 2.71C17.82 2.41 17.99 2.01 17.99 1.59C17.99 1.17 17.82 0.76 17.53 0.46C17.23 0.16 16.83 0 16.4 0C15.98 0 15.58 0.16 15.28 0.46L9 6.75L2.71 0.46C2.41 0.16 2.01 0 1.59 0C1.16 0 0.76 0.16 0.46 0.46C0.16 0.76 0 1.16 0 1.59C0 2.01 0.16 2.41 0.46 2.71L6.75 9L0.46 15.28C0.16 15.58 0 15.98 0 16.4C0 16.83 0.16 17.23 0.46 17.53C0.76 17.83 1.16 18 1.59 18C2.01 18 2.41 17.83 2.71 17.53L9 11.24L15.28 17.53C15.58 17.83 15.98 18 16.4 18C16.83 18 17.23 17.83 17.53 17.53C17.83 17.23 18 16.83 18 16.4C18 15.98 17.83 15.58 17.53 15.28L11.24 9Z" fill="#575757"/>
                </svg>
            `;

            // Добавляем блок товара в основной контейнер
            itemElement.appendChild(itemBlock);
            cartItemsContainer.appendChild(itemElement);

            const priceElement = itemBlock.querySelector('.pink_text');
            if (priceElement) {
                // Извлекаем цену в формате строки и добавляем в массив
                prices.push(parseFloat(priceElement.textContent.replace(' руб.', '').replace(',', '.')));
            }
        });

        updateTotalPrice(prices);
    }

    function updateTotalPrice(prices) {
        const totalElement = document.querySelector('.shopping_cart_form2 .t_900_1');
        const totalPriceElement = document.querySelector('.shopping_cart_form2 .pink_text.t_900');

        if (totalElement) {
            const lastPrice = prices[prices.length - 1];
            totalElement.textContent = lastPrice.toFixed(2).replace('.', ',') + ' руб.'; // Обновляем цену последнего товара
        }

        if (totalPriceElement) {
            const totalPrice = prices.reduce((sum, price) => sum + price, 0);
            totalPriceElement.textContent = totalPrice.toFixed(2).replace('.', ',') + ' руб.'; // Обновляем общий итог
        }
    }

    // Обновляем корзину после загрузки страницы
    updateCart();

    // Обработчик для удаления товара из корзины
    cartItemsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('shopping_cart_cross')) {
            const itemElement = event.target.closest('.shopping_cart_main');
            const itemName = itemElement.querySelector('.shopping_cart_h1').textContent;

            // Удаляем товар из корзины
            cart = cart.filter(item => item.name !== itemName);

            // Уменьшаем количество товаров в корзине
            currentCount = cart.length;
            cartCountElement.textContent = currentCount; // Обновляем счетчик в шапке

            // Сохраняем обновленные данные в localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('cartCount', currentCount);

            // Перерисовываем корзину
            updateCart();
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен');
    const form = document.querySelector('.shopping_cart_form1_1');
    const submitButton = document.querySelector('.shopping_cart_form1_but');
    const messageElement = document.querySelector('.form-message');
    const inputs = form.querySelectorAll('input');
    

    // Обработчик нажатия на кнопку "ПОЛУЧИТЬ РАСЦЕНКУ"
    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); // Предотвращаем стандартное поведение кнопки

        let allFieldsFilled = true; // Переменная для проверки всех полей

        // Проверяем, что все поля заполнены
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                allFieldsFilled = false; // Если хотя бы одно поле пустое, меняем значение на false
            }
        });

        if (allFieldsFilled) {
            // Если все поля заполнены
            messageElement.style.display = 'block';
            messageElement.textContent = 'Мы отправим вам расценку на почту.';
            messageElement.style.color = 'rgb(241, 109, 127)';

        } else {
            // Если не все поля заполнены
            messageElement.style.display = 'block';
            messageElement.textContent = 'Пожалуйста, заполните все поля.';
            messageElement.style.color = 'red'; // Цвет сообщения можно изменить
        }
        messageElement.style.marginTop = '5px';
    });
});



// Вызываем функцию при загрузке страницы и при изменении размера окна
window.addEventListener('load', updateButton);
window.addEventListener('resize', updateButton);



// Получаем элементы
const modal = document.getElementById('checkout-modal');
const openModalBtn = document.querySelector('.shopping_cart_form2_but');
const closeModalBtn = document.querySelector('.close-modal');

// Открытие модального окна
openModalBtn.addEventListener('click', () => {
    modal.classList.add('show');
});

// Закрытие модального окна
closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('show');
});

// Закрытие при клике вне окна
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});


addToCartButtons.forEach(button => {
    button.addEventListener('click', handleAddToCart);  // Для ПК

    // Добавь обработчик для тач-событий на мобильных устройствах
    button.addEventListener('touchstart', handleAddToCart);
});


//для мобилки добавить в корзину 
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.background_card'); // Все карточки товаров

    productCards.forEach(card => {
        const hoverElement = card.querySelector('.item-img__hover'); // Элемент с кнопкой
        const addToCartButton = card.querySelector('.item-img__hover-btn'); // Кнопка для добавления в корзину
        let isButtonVisible = false; // Переменная для отслеживания видимости кнопки

        // Обработчик клика по картинке товара
        card.addEventListener('click', function(event) {
            // Показываем кнопку при первом клике на картинку товара
            if (!isButtonVisible) {
                hoverElement.style.display = 'flex'; // Показываем кнопку
                isButtonVisible = true; // Устанавливаем, что кнопка теперь видна
            }
        });

        // Обработчик клика по кнопке "Добавить в корзину"
        addToCartButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Останавливаем всплытие события, чтобы не сработал клик на картинку

            // Логика добавления товара в корзину
            const productName = card.querySelector('.text_card_description h2').textContent;
            const productPrice = card.querySelector('.text_card_description h1').textContent;
            const productColor = card.querySelector('.text_card_description h6') ? card.querySelector('.text_card_description h6').textContent : '';
            const productImage = card.querySelector('.item-img').style.backgroundImage;

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({
                name: productName,
                price: productPrice,
                image: productImage,
                color: productColor
            });

            let currentCount = parseInt(localStorage.getItem('cartCount')) || 0;
            currentCount++;
            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('cartCount', currentCount);

            // Обновляем отображение количества товаров в корзине
            const cartCountElement = document.querySelector('.head_img_4_5 span');
            if (cartCountElement) {
                cartCountElement.textContent = currentCount;
            }

            alert('Товар добавлен в корзину!');
        });
    });
});


