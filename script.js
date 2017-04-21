function makeItems (menuList) {
    let template= document.querySelector('#menu-template').innerHTML;
    let parent = document.querySelector('.menu');
    let container = document.createElement('div');
    container.classList.add('item');
    
    container.innerHTML = Mustache.render(template, {
        name: menuList.name,
        description: menuList.description,
        price: menuList.price,
    });
    
    let orderBtn = container.querySelector('.order');
    orderBtn.addEventListener('click', function () {
        let push = new XMLHttpRequest();
        push.open('POST', 'http://tiy-28202.herokuapp.com/order');
        push.addEventListener('load', function () {
            console.log('message received');
        });
        let order = document.querySelector('.cart');
        let orderItem = document.createElement('p');
        orderItem.textContent = "~" + menuList.name + '~';
        order.appendChild(orderItem);
        push.send(JSON.stringify({
            table_id: "Colby",
            menu_id: menuList.id, 
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