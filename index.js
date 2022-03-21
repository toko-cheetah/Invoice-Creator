const washCar = {service: "Wash Car", price: 10}
const mowLawn = {service: "Mow Lawn", price: 20}
const pullWeeds = {service: "Pull Weeds", price: 30}
const washCarEl = document.getElementById("wash-car")
const mowLawnEl = document.getElementById("mow-lawn")
const pullWeedsEl = document.getElementById("pull-weeds")
const purchasedServices = document.getElementById("purchased-services")
const totalAmount = document.querySelector(".outcome")
const invoiceEl = document.querySelector(".invoice")
const amount = [0]
const servicesArr = []
let expense = 0

function button(add) {
    return `${add.service}: $${add.price}`
}

washCarEl.innerHTML = button(washCar)
mowLawnEl.innerHTML = button(mowLawn)
pullWeedsEl.innerHTML = button(pullWeeds)

function sum() {
    for (let i = 0; i < amount.length; i++) {
        expense += amount[i]
    }
    
    totalAmount.innerHTML = `
        <td class="gray">We accept cash, credit card, or PayPal</td>
        <td align="right" id="sumPrice">$${expense}</td>
    `
    expense = 0
}
sum()

function remove(service) {
    function removeRow(row) {
        purchasedServices.deleteRow( servicesArr.indexOf(row.service) )
        amount.splice( amount.indexOf(row.price), 1 )
        servicesArr.splice( servicesArr.indexOf(row.service), 1 )
    }

    if (service === washCar.service) {    
        removeRow(washCar)
    } else if (service === mowLawn.service) {
        removeRow(mowLawn)
    } else if (service === pullWeeds.service) {
        removeRow(pullWeeds)      
    }
    sum()
}

function addService(option) {
    if( !servicesArr.includes(option.service) ) {
        purchasedServices.innerHTML += `
            <tr>
                <td>${option.service} <span class="remove" onclick="remove('${option.service}')">&emsp;Remove</span></td>
                <td align="right"><span class="gray">$</span>${option.price}</td>
            </tr>
        `
        amount.push(option.price)
        servicesArr.push(option.service)
        sum()
    }
}

washCarEl.addEventListener("click", () => addService(washCar))

mowLawnEl.addEventListener("click", () => addService(mowLawn))

pullWeedsEl.addEventListener("click", () => addService(pullWeeds))

invoiceEl.addEventListener("click", function() {
    purchasedServices.innerHTML = ""
    amount.splice(1)
    servicesArr.splice(0)
    sum()
})