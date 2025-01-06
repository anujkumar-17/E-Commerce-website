document.getElementById('add-to-cart-btn').addEventListener('click', function() {
    let cartCount = parseInt(document.getElementById('cart-count').innerText);
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
});

const reviews = [
    {
        reviewer: 'Rahul Jain',
        rating: 5,
        comment: 'Amazing sound quality and battery life!'
    },
    {
        reviewer: 'Steve Smith',
        rating: 4,
        comment: 'Very comfortable to wear for long periods.'
    },
    {
        reviewer: 'Sam Wilson',
        rating: 3,
        comment: 'Good value for money, but the bass could be better.'
    }
];

function displayReviews() {
    const reviewsContainer = document.getElementById('reviews');
    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.innerHTML = `
            <p class="reviewer">${review.reviewer}</p>
            <p class="rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
            <p class="comment">${review.comment}</p>
        `;
        reviewsContainer.appendChild(reviewElement);
    });
}

displayReviews();