// =====Show Munu=====
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

//Menu show
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

//Menu Hidden
if (navToggle) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

// =========Remove Menu Mobile====
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

// ========Add Shadow Header======
const shadowHeader = () => {
    const header = document.getElementById('header')
    //Add a class if the bottom offset id greater than 50 of the 
    this.scrollY >= 50 ? header.classList.add('shadow-header')
        : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)

// =========Show Scroll Up=====
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up');
    //When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scroll class
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp);

// ===========Scroll Sections Active Link======
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (sectionsClass) { // Check if sectionsClass is not null
            if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
                sectionsClass.classList.add('active-link');
            } else {
                sectionsClass.classList.remove('active-link');
            }
        }
    });
}


// =========CRUD Define cart and related elements=====
const cart = [];
const cartItems = document.getElementById('cart-items');
const totalAmountEl = document.getElementById('total-amount');
const clearCartBtn = document.getElementById('clear-cart');
const modal = document.getElementById("cart-modal");
const closeButton = document.querySelector(".close-button");
const viewCartButton = document.getElementById('view-cart');

// Function to open the modal
function openModal() {
    modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
    modal.style.display = "none";
}

// Close the modal when the close button is clicked
closeButton.onclick = closeModal;

// Close the modal when clicking outside of the modal content
window.onclick = function (event) {
    if (event.target === modal) {
        closeModal();
    }
};

// Add to cart logic
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));

        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCart();
        openModal(); // Open modal when a burger is added
    });
});

// Update cart display
function updateCart() {
    cartItems.innerHTML = '';
    let totalAmount = 0;
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${item.name} - ₹${item.price} x ${item.quantity}
            <button class="remove-one" data-name="${item.name}">-</button>
            <button class="add-one" data-name="${item.name}">+</button>
            <button class="remove" data-name="${item.name}">Remove</button>
        `;
        cartItems.appendChild(listItem);
        totalAmount += item.price * item.quantity;
    });

    totalAmountEl.textContent = totalAmount.toFixed(2);

    // Add one item
    document.querySelectorAll('.add-one').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const item = cart.find(item => item.name === name);
            item.quantity++;
            updateCart();
        });
    });

    // Remove one item
    document.querySelectorAll('.remove-one').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const item = cart.find(item => item.name === name);
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                cart.splice(cart.indexOf(item), 1);
            }
            updateCart();
        });
    });

    // Remove all items
    document.querySelectorAll('.remove').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const itemIndex = cart.findIndex(item => item.name === name);
            cart.splice(itemIndex, 1);
            updateCart();
        });
    });
}

// Clear cart button functionality
clearCartBtn.addEventListener('click', () => {
    cart.length = 0; // Empty the cart array
    updateCart(); // Update the cart display
});

// Add event listener to the View Cart button
viewCartButton.addEventListener('click', () => {
    updateCart(); // Ensure cart is updated before opening the modal
    openModal(); // Open the cart modal
});



// ===========Scroll Reveal Animation====
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 300,
    //reset: true, // Animation repeat
})

sr.reveal(`.home__data, .footer`);
sr.reveal(`.home__dish`, { delay: 500, distance: '100px', origin: 'bottom' });
sr.reveal(`.home__burger`, { delay: 1200, distance: '100px', duration: 1500 });
sr.reveal(`.home__ingredient`, { delay: 1600, interval: 100 });
sr.reveal(`.recipe__img, .delivery__img, .contact__image, .cart`, { origin: 'left' });
sr.reveal(`.recipe__data, .delivery__data, .contact__data`, { origin: 'right' });
sr.reveal(`.popular__card`, { interval: 100 });







