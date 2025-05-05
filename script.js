// БУРГЕР МЕНЮ
const menuActive = document.querySelector('.menu'); // Находим меню
const burger = document.querySelector('.head_buttons'); // Находим кнопку бургера
const body = document.body; // Получаем доступ к body для блокировки скролла основной страницы

function toggleMenu() {
    menuActive.classList.toggle("hiddens"); // Переключаем класс скрытия меню
    menuActive.classList.toggle("menu_active"); // Переключаем класс активности меню
    
    // Блокировка/разблокировка скролла основной страницы
    if (menuActive.classList.contains("menu_active")) {
        // Блокируем скролл основной страницы при открытом меню для предотвращения прокрутки заднего фона
        body.style.overflow = 'hidden';
        
        // Создаем overlay (затемнение) для фона, если его еще нет
        if (!document.querySelector('.menu-overlay')) {
            const overlay = document.createElement('div'); // Создаем новый div-элемент
            overlay.className = 'menu-overlay'; // Присваиваем класс для стилизации
            document.body.appendChild(overlay); // Добавляем элемент в конец body
            
            // Анимация появления overlay с небольшой задержкой для плавности
            setTimeout(() => {
                overlay.style.opacity = '1'; // Делаем overlay видимым через CSS свойство opacity
            }, 10); // Маленькая задержка для корректной работы анимации
            
            // Обработчик клика по overlay для закрытия меню
            overlay.addEventListener('click', toggleMenu); // При клике на затемненную область меню закрывается
        }
        
        // Создаем кнопку закрытия в меню, если её еще нет
        if (!menuActive.querySelector('.menu-close')) {
            const closeButton = document.createElement('button'); // Создаем новый элемент кнопки
            closeButton.className = 'menu-close'; // Присваиваем класс для стилизации
            menuActive.appendChild(closeButton); // Добавляем кнопку в меню
            
            // Обработчик клика по кнопке закрытия
            closeButton.addEventListener('click', toggleMenu); // При клике на кнопку меню закрывается
        }
    } else {
        // Возвращаем возможность прокрутки основной страницы при закрытии меню
        body.style.overflow = '';
        
        // Удаляем overlay при закрытии меню
        const overlay = document.querySelector('.menu-overlay');
        if (overlay) {
            overlay.style.opacity = '0'; // Сначала делаем overlay невидимым для анимации
            setTimeout(() => {
                overlay.remove(); // Удаляем элемент из DOM после завершения анимации
            }, 500); // Время должно совпадать с transition в CSS (0.5s)
        }
    }
}

burger.addEventListener('click', toggleMenu); // По клику на бургер вызываем функцию переключения меню

// При загрузке страницы проверяем, открыто ли меню и добавляем кнопку закрытия если нужно
document.addEventListener('DOMContentLoaded', function() {
    // Если меню активно при загрузке страницы (например, после перезагрузки страницы)
    if (menuActive.classList.contains("menu_active") && !menuActive.querySelector('.menu-close')) {
        const closeButton = document.createElement('button'); // Создаем новый элемент кнопки
        closeButton.className = 'menu-close'; // Присваиваем класс для стилизации
        menuActive.appendChild(closeButton); // Добавляем кнопку в меню
        closeButton.addEventListener('click', toggleMenu); // Добавляем обработчик события клика
    }
});

// При изменении размера окна, проверяем, нужен ли скролл для меню
window.addEventListener('resize', function() {
    if (menuActive.classList.contains("menu_active")) {
        // Если меню открыто, проверяем, поместится ли весь контент
        if (menuActive.scrollHeight > window.innerHeight) {
            menuActive.style.overflowY = 'auto'; // Включаем скролл, если контент не помещается
        } else {
            menuActive.style.overflowY = 'visible'; // Отключаем скролл, если контент помещается
        }
    }
});

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

                // Проверяем, есть ли уже такой товар в корзине по ключевым атрибутам (имя, цена, цвет)
                const existingProductIndex = cart.findIndex(item => 
                    item.name === productName && 
                    item.price === productPrice && 
                    item.color === productColor
                );

                if (existingProductIndex !== -1) {
                    // Если товар уже есть в корзине, увеличиваем его количество на 1
                    // Используем || 1 для случая, если quantity не определено в существующем товаре
                    cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
                } else {
                    // Если товара нет в корзине, добавляем новый товар с начальным количеством 1
                    cart.push({
                        name: productName,
                        price: productPrice,
                        image: productImage,
                        color: productColor,
                        quantity: 1 // Устанавливаем начальное количество 1 для нового товара
                    });
                }

                // Увеличиваем общее количество товаров в корзине для отображения в счетчике
                currentCount++;

                // Сохраняем обновленную корзину и счетчик в localStorage
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
    const cartCountElement = document.querySelector('.head_img_4_5 span'); // Получаем элемент счетчика товаров
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Загружаем корзину из localStorage
    let currentCount = parseInt(localStorage.getItem('cartCount')) || 0; // Получаем текущий счетчик товаров

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

            // Получаем количество товара из объекта, если не указано, используем 1 по умолчанию
            const quantity = item.quantity || 1;

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
                            <input class="shopping_cart_p quantity-input" type="number" value="${quantity}" min="1" data-index="${index}">
                        </div>
                    </ul>
                </div>
                <svg class="shopping_cart_cross" width="18.000000" height="18.000000" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" data-index="${index}">
                    <path d="M11.24 9L17.53 2.71C17.82 2.41 17.99 2.01 17.99 1.59C17.99 1.17 17.82 0.76 17.53 0.46C17.23 0.16 16.83 0 16.4 0C15.98 0 15.58 0.16 15.28 0.46L9 6.75L2.71 0.46C2.41 0.16 2.01 0 1.59 0C1.16 0 0.76 0.16 0.46 0.46C0.16 0.76 0 1.16 0 1.59C0 2.01 0.16 2.41 0.46 2.71L6.75 9L0.46 15.28C0.16 15.58 0 15.98 0 16.4C0 16.83 0.16 17.23 0.46 17.53C0.76 17.83 1.16 18 1.59 18C2.01 18 2.41 17.83 2.71 17.53L9 11.24L15.28 17.53C15.58 17.83 15.98 18 16.4 18C16.83 18 17.23 17.83 17.53 17.53C17.83 17.23 18 16.83 18 16.4C18 15.98 17.83 15.58 17.53 15.28L11.24 9Z" fill="#575757"/>
                </svg>
            `;

            // Добавляем блок товара в основной контейнер
            itemElement.appendChild(itemBlock);
            cartItemsContainer.appendChild(itemElement);

            const priceElement = itemBlock.querySelector('.pink_text');
            if (priceElement) {
                // Извлекаем цену в формате строки, преобразуем в число и умножаем на количество товара
                const price = parseFloat(priceElement.textContent.replace(' руб.', '').replace(',', '.'));
                const totalItemPrice = price * quantity; // Вычисляем общую стоимость товара (цена × количество)
                prices.push(totalItemPrice);
            }
        });

        updateTotalPrice(prices);

        // Добавляем обработчики изменения количества для каждого поля ввода количества
        const quantityInputs = document.querySelectorAll('.quantity-input');
        quantityInputs.forEach(input => {
            input.addEventListener('change', function() {
                const index = this.getAttribute('data-index'); // Получаем индекс товара из атрибута
                const newQuantity = parseInt(this.value) || 1; // Получаем новое количество из поля ввода
                
                // Проверяем, чтобы количество не было меньше 1
                if (newQuantity <= 0) {
                    this.value = 1; // Если ввели 0 или отрицательное число, устанавливаем 1
                    return;
                }

                // Вычисляем разницу между новым и старым количеством для обновления общего счетчика
                const oldQuantity = cart[index].quantity || 1;
                const difference = newQuantity - oldQuantity;
                
                // Обновляем количество товара в объекте корзины
                cart[index].quantity = newQuantity;
                
                // Обновляем общий счетчик товаров в корзине, добавляя разницу
                currentCount += difference;
                cartCountElement.textContent = currentCount;
                
                // Сохраняем изменения в localStorage
                localStorage.setItem('cart', JSON.stringify(cart));
                localStorage.setItem('cartCount', currentCount);
                
                // Обновляем отображение корзины для отображения изменений
                updateCart();
            });
        });
    }

    function updateTotalPrice(prices) {
        const totalElement = document.querySelector('.shopping_cart_form2 .t_900_1');
        const totalPriceElement = document.querySelector('.shopping_cart_form2 .pink_text.t_900');

        // Проверяем, существует ли элемент и есть ли товары в корзине
        if (totalElement && prices.length > 0) {
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
        // Проверяем, был ли клик на крестик удаления или его родительский элемент
        const crossElement = event.target.closest('.shopping_cart_cross');
        
        if (crossElement) {
            // Получаем индекс товара из data-атрибута
            const index = crossElement.getAttribute('data-index');
            
            if (index !== null && index !== undefined) {
                // Получаем количество удаляемого товара для корректного обновления счетчика
                const removedQuantity = cart[index].quantity || 1;
                
                // Удаляем товар из массива корзины по индексу
                cart.splice(index, 1);
                
                // Уменьшаем количество товаров в корзине на количество удаленного товара
                currentCount = Math.max(0, currentCount - removedQuantity); // Используем Math.max для предотвращения отрицательных значений
                cartCountElement.textContent = currentCount;
                
                // Сохраняем обновленные данные в localStorage
                localStorage.setItem('cart', JSON.stringify(cart));
                localStorage.setItem('cartCount', currentCount);
                
                // Перерисовываем корзину для отображения изменений
                updateCart();
            }
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





