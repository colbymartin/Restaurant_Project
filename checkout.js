function getTotal(order) {
    let total = 0;
    for (let i = 0; i < order.items.length; i++) {
        total = total + order.items[i].price;
    };
    return total;;
};
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
                let orderTemp = document.querySelector('#tableOrder-template').innerHTML;
                let checkout = document.querySelector('.checkout');
                let billItem = document.createElement('div');
                billItem.innerHTML = Mustache.render(orderTemp, bill);
                let TotalSctn = document.querySelector('.total');
                let billTotal = document.createElement('p');
                billTotal.textContent = getTotal(bill).toFixed(2);
                checkout.appendChild(billItem);
                TotalSctn.appendChild(billTotal);
                let pay = document.querySelector('.hidden');
                pay.classList.remove('hidden');
                let label = document.querySelector('label');
                label.classList.add('hidden');  
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