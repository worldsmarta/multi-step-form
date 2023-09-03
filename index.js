// Get necessary elements
const gifts = document.querySelectorAll(".gift")
const formEl = document.getElementById('form')
const plans = document.querySelectorAll(".plans")
const taskbar = document.querySelector('.taskbar')
const nameEl = document.getElementById('name-el')
const emailEl = document.getElementById('email-el')
const goBack = document.getElementById('go-back')
const nextBtn = document.getElementById('next-btn')
const phoneEl = document.getElementById('phone-el')
const formBtn = document.getElementById('form-btn')
const confirmBtn = document.getElementById('confirm')
const addOnPrice = document.querySelectorAll(".add-on-price")
const sidebarNumb = document.querySelectorAll('.sidebar-num')
const stepsListItem = document.querySelectorAll(".steps-list-item")
const changePlansAndAddon = document.getElementById('change')
const toggleChecked = document.getElementById('toggle-checked')
const selectedAddon =  document.getElementById('selected-addon')
const formBtnOverlay = document.getElementById('form-btn-overlay')
const customizeAddon = document.getElementById('customize-addon')
const serviceContainer = document.querySelectorAll('.service-container')
const selectedAddonOne =  document.getElementById('selected-addon-one')
const selectedAddonTwo =  document.getElementById('selected-addon-two')
const phoneFieldNotification = document.getElementById('phone-field-notification')

// Set initial state
let currentNumb = 0
let isMonthly = true
let inputEl 
let price = 0
let selectedServices = []

// Hide taskbar by default
taskbar.classList.add('hidden')

// Add event listener to form button
formBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (!phoneEl.value || phoneEl.value.length <= 8) {
        // Display notification if phone number is invalid
        phoneFieldNotification.style.display = 'block'
        phoneEl.style.border = '1.2px solid hsl(354, 84%, 57%)'
        taskbar.classList.add('hidden')
        sidebarUpdate()
    } else {
        // Hide notification and show taskbar if phone number is valid
        phoneFieldNotification.style.display = 'none'
        phoneEl.style.border = '1.2px solid hsl(229, 24%, 87%)'
        formBtnOverlay.classList.remove('hidden')
        taskbar.classList.remove('hidden')
        currentNumb = 1
        goBack.style.display = "none"
        sidebarUpdate()
        updateUI()
    }
})

// Add event listener to phone input
phoneEl.addEventListener('keyup', () => {
    if(phoneEl.value.length > 10) {
        // Remove notification and change border color if phone number is valid
        phoneEl.style.border = "1.2px solid #20bf55"
        phoneFieldNotification.style.display = 'none'
    } else if(phoneEl.value.length < 10) {
        // Display notification and change border color if phone number is invalid
        phoneFieldNotification.style.display = 'block'
        phoneEl.style.border = "1.2px solid hsl(354, 84%, 57%)"
    } else {
        // Remove notification if phone number is valid
        phoneFieldNotification.style.display = 'none'
        phoneEl.style.border = "1.2px solid #20bf55"
    }
})

function sidebarUpdate() {
    // Add click event listeners to all elements with the class 'sidebar-number'
    sidebarNumb.forEach((sidebarNum, index) => {
        sidebarNum.addEventListener('click', () => {
            currentNumb = index
            updateUI()
            // If the clicked number is between 1 and 3, disable the other numbers and show a notification
            if (index >= 1 && index <= 3) {
                sidebarNumb.forEach((num, i) => {
                    if (i >= 1 && i <= 3) {
                        // Disable the other number element by adding a 'disabled' class
                        num.classList.add("disabled")
                        
                        num.addEventListener('click', () =>{
                            phoneFieldNotification.style.display = 'block'
                        })
                        
                    } else {
                        num.classList.remove("disabled")
                        num.addEventListener('click', () =>{
                            phoneFieldNotification.style.display = 'none'
                        })
                    }
                })
            } else {
                // If the clicked number is not between 1 and 3, enable all numbers by removing the 'disabled' class
                sidebarNumb.forEach((num) => {
                num.classList.remove("disabled")
                })
            }
        })
    })
}

//numbered
stepsListItem.forEach((steps, index) => {
    if (index === currentNumb) {
      steps.classList.add('active')
    }
})

//next step btn
nextBtn.addEventListener('click', () => {
    currentNumb++
    if (currentNumb === stepsListItem.length) {
        
    }
    updateUI()
})
//go back btn
goBack.style.display = "none"
goBack.addEventListener('click', () => {
    currentNumb--
    if (currentNumb < 0) {
        currentNumb = stepsListItem.length - 1
        
    }
    updateUI()
})

// switch plan
// Add click event listener to toggle switch
toggleChecked.addEventListener("click", () => {
    plans.forEach(plan => {
      // Get pricing information for each plan
      const monthlyPlan = plan.querySelector(".price");
      const price = monthlyPlan.getAttribute("data-price");
      // Check whether user has selected monthly or yearly pricing
      if (isMonthly) {
        // User has selected yearly pricing
        // Update pricing information and discounts for yearly pricing
        toggleChecked.src = "assets/images/yearly.png";
        document.getElementById('year').style.color = "#02295a";
        document.getElementById('month').style.color = "#9699ab";
        const monthlyYearlyPlan = price.replace("$9/mo", "$90/yr")
            .replace("$12/mo", "$120/yr").replace("$15/mo", "$150/yr");
        monthlyPlan.innerHTML = monthlyYearlyPlan.replace("$", "$ ");
        monthlyPlan.setAttribute("data-price-toggle", monthlyYearlyPlan);
        gifts.forEach( discount => {
          discount.textContent = '2 months free';
        });
      } else {
        // User has selected monthly pricing
        // Update pricing information and discounts for monthly pricing
        toggleChecked.src = "assets/images/month.png";
        document.getElementById('year').style.color = "#9699ab";
        document.getElementById('month').style.color = "#02295a";
        const monthlyYearlyPlan = price.replace("$90/yr", "$9/mo")
            .replace("$120/yr", "$12/mo").replace("$150/yr", "$15/mo");
        monthlyPlan.innerHTML = monthlyYearlyPlan.replace("$", "$ ");
        monthlyPlan.setAttribute("data-price", monthlyYearlyPlan);
        gifts.forEach( discount => {
          discount.textContent = '';
        });
      }
    })
  
    // Iterate over add-ons to update pricing information
    serviceContainer.forEach(servicePlans => {
      const addOnPrice = servicePlans.querySelector('.add-on-price');
      const price = addOnPrice.getAttribute('data-add');
      if(isMonthly) {
        // User has selected yearly pricing
        // Update pricing information for add-ons
        const newAddOnPrice = price.replace('$1/mo', '$10/yr').replace('$2/mo', '$20/yr');
        addOnPrice.innerHTML = newAddOnPrice.replace('$', '$ ');
        addOnPrice.setAttribute("data-add-toggle", newAddOnPrice);
      } else {
        // User has selected monthly pricing
        // Update pricing information for add-ons
        const newAddOnPrice = price.replace('$10/yr', '$1/mo').replace('$20/yr', '$2/mo');
        addOnPrice.innerHTML = newAddOnPrice.replace('$', '$ ');
        addOnPrice.setAttribute('data-add', newAddOnPrice);
      }
    })
  
    // Toggle the 'isMonthly' value for the next click event
    isMonthly = !isMonthly;
})
  

plans.forEach((plan, index) => {
    // Listen for a click event on each plan
    plan.addEventListener('click', function() {
        let planPrice = 0
        // Get the plan title and clean it up
        const title = this.querySelector('p').textContent.trim()
        const titleParts = title.split("$")
        const cleanTitle = titleParts[0].trim()

        if (isMonthly) {// Check if we are currently displaying monthly prices
            // Get the monthly price and update the display
            price = priceEl.getAttribute('data-price')
            planPrice = price
            pricePlan = parseFloat(planPrice.replace("$", ""))
            document.getElementById('plan-name').innerHTML = `${cleanTitle} (Monthly)`
            document.getElementById('price').innerHTML = price
        } else {
            // Get the yearly price and update the display
            price = priceEl.getAttribute('data-price-toggle')
            planPrice = price
            pricePlan = parseFloat(planPrice.replace("$", ""))
            document.getElementById('plan-name').innerHTML =`${cleanTitle} (Yearly)`
            document.getElementById('price').innerHTML = price
        }
        
        // Apply a focus state to the selected plan
        focusState(index)

        // Calculate the total price of the selected plan and add-ons
        calculateTotalPrice()
    })
})


// add focus state to plans container
function focusState(clickedIndex) {
    plans.forEach((plan, index) => {
        if (index === clickedIndex) {
            plan.classList.add('focus-state')
        } else {
            plan.classList.remove('focus-state')
        }
    })
}

// Loop through each element in the service container and add a click listener
serviceContainer.forEach((servicePrice, index) => {
    servicePrice.addEventListener('click', function() {
        // Initialize variables to store the selected service's information
        let selectedIndexPrice = 0
        let inputEl = this.querySelector('input[type=checkbox]')
        const titleEl = this.querySelector('p')
        const titleText = titleEl.textContent.trim().replace(/(Access to multiplayer games|Extra 1TB of cloud save|Custom theme on your profile)\s*/, '')
        const addOnPriceEl = servicePrice.querySelector('.add-on-price')
      
        // Determine the selected service's price based on the selected payment option
        if (isMonthly) {
            price = addOnPriceEl.getAttribute('data-add')
            selectedIndexPrice = price
            selectedIndexPrice  = parseInt(selectedIndexPrice.replace("$", ""))
        } else {
            price = addOnPriceEl.getAttribute('data-add-toggle')
            selectedIndexPrice = price
            selectedIndexPrice  = parseInt(selectedIndexPrice.replace("$", ""))
        }
        
        // Toggle the checked property of the input element
        inputEl.checked = !inputEl.checked
        
        // Update the selected services and their prices based on the input element's state
        if (inputEl.checked) {
            if (index === 0) {
               selectedServices[index] = selectedIndexPrice
                selectedAddon.innerHTML = `
                    <p id="addon-services">${titleText}</p>
                    <p id="addon-price">${price}</p>
                `
            } else if (index === 1) {
               selectedServices[index] = selectedIndexPrice
                selectedAddonOne.innerHTML = `
                    <p id="addon-services">${titleText}</p>
                    <p id="addon-price">${price}</p>
                `
            } else if (index === 2) {
               selectedServices[index] = selectedIndexPrice
                if (inputEl.checked) {
                    customizeAddon.innerHTML =`
                    <p id="addon-services">${titleText}</p>
                    <p id="addon-price">${price}</p>
                    `
                }
            }
        } else {
            if (index === 0) {
                selectedServices[index] = undefined
                selectedAddon.innerHTML = `
                    <p id="addon-services"></p>
                    <p id="addon-price"></p>
                `
            } else if (index === 1) {
                selectedServices[index] = undefined
                selectedAddonOne.innerHTML = `
                    <p id="addon-services"></p>
                    <p id="addon-price"></p>
                `
            } else if (index === 2) {
                selectedServices[index] = undefined
                customizeAddon.innerHTML = `
                    <p id="addon-services"></p>
                    <p id="addon-price"></p>
                `
            }
        }
        
        // Call the focusAddon() and calculateTotalPrice() functions to update the UI
        focusAddon(index)
        calculateTotalPrice()
    })
})


//add border-color and background-color to addOn container
function focusAddon() {
    serviceContainer.forEach((addon, index) => {
        const inputEl = addon.querySelector('input[type=checkbox]')
        if (inputEl && inputEl.checked && (index === 0 || index === 1 || index === 2)) {
            addon.classList.add('focus-state')
        } else {
            addon.classList.remove('focus-state')
        }
    })
}

//calculate total price
function calculateTotalPrice() {
    let totalPrice = selectedServices.reduce((sum, price) => sum + (price || 0), 0)
    totalPrice += pricePlan
    if(isMonthly) {
       document.getElementById('total-container').innerHTML = `
        <p id="total-month">Total (per month) </p>
        <p id="total-price" class="total">+$${totalPrice}/mo</p>
       ` 
    } else {
       document.getElementById('total-container').innerHTML = `
        <p id="total-month">Total (per year) </p>
        <p id="total-price" class="total">+$${totalPrice}/yr</p>
       `
    }
}

//change btn on click 
changePlansAndAddon.addEventListener('click', () => {
    currentNumb = 1
    let inputEl = document.querySelectorAll('input[type=checkbox]')
    if (inputEl && inputEl.length > 0) {
            inputEl.forEach(el => {
            el.checked = false
        })
    }
    selectedAddon.innerHTML = ''
    selectedAddonOne.innerHTML= ''
    customizeAddon.innerHTML = ''
    document.getElementById('plan-name').innerHTML = ''
    document.getElementById('price').innerHTML = ''
    document.getElementById('total-container').innerHTML = ''
    serviceContainer.forEach(focus => {
        focus.classList.remove('focus-state')
    })

    updateUI()
})

//form steps and number steps focus 
function updateUI() {
    stepsListItem.forEach((steps, index) => {
        if (index === currentNumb) {
            steps.classList.add('active')
        } else {
            steps.classList.remove('active')
        }
    })

    sidebarNumb.forEach((sidebarNum, index) => {
        if (index === currentNumb) {
            sidebarNum.classList.add('sidebar-focus')
        } else {
            sidebarNum.classList.remove('sidebar-focus')
        }
    })

    if(currentNumb === 0 ) {
        goBack.style.display = 'none'
        formBtn.style.display = "none"
        nextBtn.style.marginTop = "50px"
    } else {
        goBack.style.display = 'block'
        nextBtn.style.marginTop = "0"
        
    }

    if(currentNumb === 3) {
        nextBtn.classList.add('hidden')
        confirmBtn.style.display = 'block'
    } else {
        nextBtn.classList.remove('hidden')
        confirmBtn.style.display = 'none'
    }

    if(currentNumb === 3) {
        goBack.addEventListener('click', () => {
            
        })
    }

}

// confirm form submit 
confirmBtn.addEventListener('click', () => {
    document.getElementById('replace-step5').innerHTML = `
        <div class="loading-container">
            <img src="assets/images/loading.gif" alt="loading" class="loading">
        </div> 
    `
    taskbar.classList.add('hidden')
    setTimeout(() => {
        document.getElementById('replace-step5').innerHTML = `
            <img src="assets/images/icon-thank-you.svg" alt="thanks-you" class="thanks-you-icon">
            <h1 class="thanks-you">Thanks you!</h1>
            <p class="confirmation-txt">Thanks for 
                confirming your subscription! We hope you have fun 
                using our platform. If you ever need support, please feel free 
                to email us at support@loremgaming.com.
            </p>
        `
        
    }, 1500)
})


