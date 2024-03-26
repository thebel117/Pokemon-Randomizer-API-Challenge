async function fetchItems() {
    try {
        const response = await fetch(https.pokeapi.co/api/v2/pokemon);
        const data = await response.json();
        return data.items; // Assuming your API returns items in an array
    } catch (error) {
        console.error('Error fetching items:', error);
        return [];
    }
}

async function fetchAdditionalItems() {
    const selectElement = document.getElementById('item-select');
    const selectedItem = selectElement.value;

    // Fetch the list of additional items
    const items = await fetchItems();

    // Filter out the selected item and shuffle the rest
    const filteredItems = items.filter(item => item !== selectedItem);
    const shuffledItems = shuffleArray(filteredItems);

    // Display the first 5 additional items
    const additionalItemsList = document.getElementById('additional-items-list');
    additionalItemsList.innerHTML = ''; // Clear previous items
    for (let i = 0; i < 5; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = shuffledItems[i];
        additionalItemsList.appendChild(listItem);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initial fetch of items when the page loads
window.onload = fetchAdditionalItems;
