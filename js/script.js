document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("inputField");
    const shoppingListEl = document.getElementById("shoppingList");
    const btn = document.getElementById("add-to-cart");

    let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    displayUI();

    // Save to local storage function
    function saveToLocalStorage() {
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    }

    // Function to remove item from shopping list
    function removeItem(itemIndex) {
        if (itemIndex >= 0 && itemIndex < shoppingCart.length) {
            shoppingCart.splice(itemIndex, 1);
            saveToLocalStorage();
            displayUI(); // No need to reset innerHTML manually
        }
    }

    // Function to toggle checkbox state
    function toggleCheckbox(index) {
        shoppingCart[index].checked = !shoppingCart[index].checked;
        saveToLocalStorage();
    }

    // Function to display cart items
    function displayUI() {
        shoppingListEl.innerHTML = ""; // Clear the list before re-rendering

        shoppingCart.forEach((item, index) => {
            let listItem = document.createElement("li");
            listItem.innerHTML = `
                ${item.name}
                <div>
                    <input type="checkbox" ${item.checked ? "checked" : ""} data-index="${index}">
                    <button class="remove-btn js-remove-btn" data-item-index="${index}">
                        <svg width="20px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
            `;
            shoppingListEl.appendChild(listItem);
        });

        // Attach event listeners for remove buttons
        document.querySelectorAll(".js-remove-btn").forEach((button) => {
            button.addEventListener("click", () => {
                const itemIndex = button.dataset.itemIndex;
                removeItem(itemIndex);
            });
        });

        // Attach event listeners for checkboxes
        document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
            checkbox.addEventListener("change", () => {
                const index = checkbox.dataset.index;
                toggleCheckbox(index);
            });
        });
    }

    // Add item to cart
    btn.addEventListener("click", () => {
        const itemName = input.value.trim();

        if (!itemName) return; // Prevent adding empty items

        input.value = "";

        // Check if input value is already in shopping cart
        if (shoppingCart.some((item) => item.name === itemName)) {
            const message = document.querySelector(".js-message");
            message.innerHTML = `${itemName} is already your shopping list`;
            message.classList.remove("hide-message");

            setTimeout(() => {
                message.classList.add("hide-message");
            }, 3000);

            return;
        }

        // Add new item with checkbox state
        shoppingCart.push({ name: itemName, checked: false });
        saveToLocalStorage();
        displayUI();
    });
});
