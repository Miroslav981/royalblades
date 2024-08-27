document.addEventListener("DOMContentLoaded", function() {
    initMenu();
    loadServices();
    loadReviews();
    initGallery();
});

function initMenu() {
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                event.preventDefault();

                if (document.body.classList.contains('menu-open')) {
                    document.getElementById('nav-trigger').click();
                }

                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });
}


function loadServices() {
    fetch('services.json').then(response => response.json()).then(data => {
        for (const service of data) {
            const serviceEl = createService(service);
            document.getElementById("services-list").appendChild(serviceEl);
        }
    });
}

function createService(service) {
    const body = document.createElement('div');
    body.classList.add('col');
    body.classList.add('text-center');
    const title = document.createElement('h3');
    const img = document.createElement('img');
    const description = document.createElement('p');
    const price = document.createElement('p');

    title.textContent = service.title;
    price.innerHTML = service.price.replace('\n\r', '<br>');
    price.classList.add('h4');
    price.classList.add('m-2');
    description.textContent = service.description;
    description.classList.add('fs-4');
    img.src = service.image;
    img.alt = service.title;
    img.classList.add('img-fluid');
    img.classList.add('rounded');

    body.appendChild(title);
    body.appendChild(img);
    body.appendChild(price);
    body.appendChild(description);

    return body;
}

function loadReviews() {
    fetch('reviews.json').then(response => response.json()).then(data => {
        for (const review of data) {
            const reviewEl = createReview(review);
            document.getElementById("reviews-list").appendChild(reviewEl);
        }
    })
}

function createReview(review) {
    const body = document.createElement('div');
    body.classList.add('col');
    body.classList.add('text-start');
    const name = document.createElement('h4');
    const stars = document.createElement('div');
    const description = document.createElement('p');


    for (let i = 0; i < review.rank; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        stars.appendChild(star);
    }

    name.textContent = review.name;
    description.textContent = review.review;
    description.classList.add('fs-5');

    body.appendChild(name);
    body.appendChild(stars);
    body.appendChild(description);

    return body;
}

function initGallery() {
    const modal = document.getElementById('imageModal');
    modal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const imageUrl = button.getAttribute('data-bs-image');
        const modalImage = modal.querySelector('.modal-body img');
        modalImage.src = imageUrl;
    });
}
