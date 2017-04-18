function makeItems (menuList) {
    let parent = document.querySelector('.menu');
    let item = document.createElement('div');
    item.classList.add('item');

    let title = document.createElement('h4');
    title.classList.add('title');
    title.textContent = menuList.name;

    let description = document.createElement('p');
    description.classList.add('description');
    description.textContent = menuList.description;

    let price = document.createElement('p');
    price.classList.add('price');
    price.textContent = menuList.price;

    let orderBtn = document.createElement('button');
    orderBtn.classList.add('order');
    orderBtn.textContent = 'Add to Order';
    orderBtn.addEventListener('click', function () {
        let push = new XMLHttpRequest();
        push.open('POST', 'http://tiy-28202.herokuapp.com/order');
        push.addEventListener('load', function () {
            console.log('message received');
        });
        let order = document.querySelector('.cart');
        let orderItem = document.createElement('p');
        orderItem.textContent = menuList.name;
        order.appendChild(orderItem);
        push.send(JSON.stringify({
            table_id: "Colby",
            menu_id: menuList.id, 
        }));

    });


    item.appendChild(title);
    item.appendChild(description);
    item.appendChild(price);
    item.appendChild(orderBtn);
    parent.appendChild(item);
};

function getItems() {
    let pull = new XMLHttpRequest();
    pull.open('GET', 'http://tiy-28202.herokuapp.com/menu');
    pull.addEventListener('load', function () {
        let response = JSON.parse(pull.responseText);
        console.log(response);
        for(i = 0; i < response.length; i++) {
            if (response[i].available === true){
                makeItems(response[i]);
            }
        }
}); 
pull.send();
};

window.addEventListener('load', function () {
    getItems();


});