function makeItems(menulist) {
    let template = document.querySelector('#menu-template').innerHTML;
    let parent = document.querySelector('.menu');
    let container = document.createElement('div');
    container.classList.add('item');

    container.innerHTML = Mustache.render(template, {
        name: menulist.name,
        availability: menulist.available,
    });
    let availBtn = container.querySelector('.makeAvail');
    availBtn.addEventListener('click', function () {
        let push = new XMLHttpRequest();
        push.open('POST', 'http://tiy-28202.herokuapp.com/menu/' + menulist.id);
        push.addEventListener('load', function () {
            console.log('message received');
        });
        if (menulist.available === true) {
            menulist.available = false;
        } else menulist.available = true;
        push.send(JSON.stringify({
            available: menulist.available, 
        })); 
    });
    parent.appendChild(container);
};

function getItems() {
    let pull = new XMLHttpRequest();
    pull.open('GET', 'http://tiy-28202.herokuapp.com/menu');
    pull.addEventListener('load', function () {
        let response = JSON.parse(pull.responseText);
        console.log(response);
        for(let i = 0; i < response.length; i++) {
            makeItems(response[i]);
        }
}); 
pull.send();
};

function transposeOrders(orderlist) {
    let template = document.querySelector('#order-template').innerHTML;
    let parent = document.querySelector('.cart');
    let container = document.createElement('div');
    container.innerHTML = Mustache.render(template, {
        items: orderlist.items,
        table_id: orderlist.table_id,
        in_progress: orderlist.in_progress,
    });
    let compBtn = container.querySelector('.markComplete');
    compBtn.addEventListener('click', function () {
        let push = new XMLHttpRequest();
        push.open('POST', 'http://tiy-28202.herokuapp.com/order/' + orderlist.table_id);
        push.addEventListener('load', function () {
            console.log('message received');
        });
        if (orderlist.in_progress === true){
            orderlist.in_progress = false;
        }
        push.send(JSON.stringify({
            in_progress: orderlist.in_progress,
        }));
    });
    parent.appendChild(container);
}; 

function getOrders() {
    let pull = new XMLHttpRequest();
    pull.open('GET', 'http://tiy-28202.herokuapp.com/order');
    pull.addEventListener('load', function () {
        let response = JSON.parse(pull.responseText);
        for(let i = 0; i < response.length; i++) {
            transposeOrders(response[i])
        }
    });
    pull.send();
};
window.addEventListener('load', function () {
    getItems();
    getOrders();
});