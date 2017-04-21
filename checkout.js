function getOrders() {
    let pull = new XMLHttpRequest();
    pull.open('GET', 'http://tiy-28202.herokuapp.com/order');
    pull.addEventListener('load', function () {
        let response = JSON.parse(pull.responseText);
        console.log(response);
        let template = document.querySelector('#dropdown-template').innerHTML;
        let parent = document.querySelector('main');
        let container = document.querySelector('label');

        container.innerHTML = Mustache.render(template, {
            orders: response,
        });
        let dropdown = document.querySelector('select');
        dropdown.addEventListener('change', function () {
            let get = new XMLHttpRequest();
            get.open('GET', 'http://tiy-28202.herokuapp.com/bill?table_id=' + dropdown.value);
            get.addEventListener('load', function () {
                let bill = JSON.parse(get.responseText);
                console.log(bill);
                for (let i = 0; i < get.length; i++) {
                    let orderTemp = document.querySelector('#tableOrder-template').innerHTML;
                    let cart = document.querySelector('.cart');
                    let billItem = document.createElement('div');
                    billItem.innerHTML = Mustache.render(orderTemp, {
                        name: bill.items[i].name,
                        price: bill.items[i].name,
                    });
                    cart.appendChild(billItem);
                };
            });
            get.send();

        });
        parent.appendChild(container);

    });
    pull.send();
};


window.addEventListener('load', function () {
    getOrders();
});