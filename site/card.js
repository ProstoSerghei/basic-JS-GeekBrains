const cardContainer = document.querySelector('.cardContainer');
const cardInfo = document.querySelector('.cardInfo');
const totalPrice = document.querySelector('#totalPrice');
const cardInfoTbody = cardInfo.querySelector('tbody');
const featuredItems = document.querySelector('.featuredItems');

cardContainer.addEventListener('click', ({ target }) => {
    if (target.tagName === 'IMG') {
        cardContainer.classList.toggle('cardContainer__active');
        cardContainer.classList.toggle('cardContainer');
        if (cardContainer.classList.contains('cardContainer__active')) {
            cardInfo.style.display = "block";
        } else {
            cardInfo.style.display = "none";
        }
    }
});

featuredItems.addEventListener('click', ({ target }) => {
    if (target.tagName === 'IMG') {
        target = target.parentElement;
    }
    if (target.tagName === 'BUTTON' || target.tagName === 'IMG') {
        let productData = target.parentElement.parentElement.nextElementSibling;
        let productName = productData.querySelector('.featuredName')?.innerText;
        let productPrice = parseFloat(productData.querySelector('.featuredPrice')?.innerText.replace('$', '')
        );
        let productId = productData.dataset.id;

        let cardNode = cardInfo.querySelector(`#product${productId}`);
        let currentTotalCount = Number.parseInt(cardCount.innerText);
        cardCount.innerText = currentTotalCount + 1;
        if (!cardNode) {
            inserHTMLInCardInfo(productName, productPrice, productId);
        } else {
            changeCount(cardNode);
        }
    }
});



function inserHTMLInCardInfo(name, price, productId) {
    let totalPriceNum = Number.parseFloat(totalPrice.innerText);
    let count = 1;
    let total = price;
    const res = `
    <tr id='product${productId}'>
        <th scope="col">${name}</th>
        <td class='productCount'>${count}</td>
        <td class='productPrice'>\$${price.toFixed(2)}</td>
        <td class='productTotal'>\$${total.toFixed(2)}</td>
    </tr>
`;

    cardInfoTbody.insertAdjacentHTML('beforeend', res);

    totalPrice.innerText = (totalPriceNum + price).toFixed(2);
    return;
}

function changeCount(cardNode) {
    const productPrice = Number.parseFloat(cardNode.querySelector('.productPrice').innerText.replace('$', ''));
    const productCount = cardNode.querySelector('.productCount');
    const productTotal = cardNode.querySelector('.productTotal');

    let totalPriceNum = Number.parseFloat(totalPrice.innerText);
    let productCountNum = Number.parseInt(productCount.innerText) + 1;
    let productTotalNum = productCountNum * productPrice;

    productCount.innerText = productCountNum;
    ;
    productTotal.innerText = `\$${productTotalNum.toFixed(2)}`;
    totalPrice.innerText = (totalPriceNum + productPrice).toFixed(2);
}