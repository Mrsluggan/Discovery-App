let listContainer = document.getElementById("placeList");
let savedPlaceList = document.getElementById("savedPlaceList");
let removedPlaceList = document.getElementById("removedPlaceList");

let submitBtn = document.getElementById("submitBtn");
let searchField = document.getElementById("searchField");

submitBtn.addEventListener("click", () => {
  const searchFieldValue = searchField.value;
  printActivities(searchFieldValue);
});

async function confirmDelete(id) {
  const review = prompt("Skriv in din recension:");
  if (review) deleteTodo(id, review);
}
async function deleteTodo(id, review) {
  if (confirm('Är du nöjd med din recension?')) {
    const body = JSON.stringify({ review });

    try {
      const response = await fetch(`api/removeItem/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body
      });
      if (response.ok) {
        printRemoved()
      } else {
        console.error('Något gick fel vid borttagning av objektet');
      }
    } catch (error) {
      console.error('Något gick fel:', error);
    }
  } else {
    confirmDelete(id);
  }
}


async function getCords(locationName) {
  const url = `https://opentripmap-places-v1.p.rapidapi.com/en/places/geoname?name=${locationName}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'fc9f917787msh0d2b745b16c5ad0p195c5ejsn10993e8dfb4c',
      'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const { lat, lon } = await response.json();
    return { lat, lon };
  } catch (error) {
    console.error(error);
  }
}

async function fetchPlacesNearby(locationName) {
  try {
    const { lat, lon } = await getCords(locationName);
    const radius = 1500;

    const nearbyUrl = `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${lon}&lat=${lat}&rate=3hh&apikey=5ae2e3f221c38a28845f05b6156b56a69ca88b6a610ec84416b4566f`;

    const response = await fetch(nearbyUrl);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function printActivities(locationNameInput) {
  listContainer.innerHTML = "";
  const locationName = locationNameInput;
  const places = await fetchPlacesNearby(locationName);

  for (const [index, element] of places.features.entries()) {
    if (element.properties.name) {
      const url = `https://opentripmap-places-v1.p.rapidapi.com/en/places/xid/${element.properties.xid}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'fc9f917787msh0d2b745b16c5ad0p195c5ejsn10993e8dfb4c',
          'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();

        const placeList = document.createElement("li");
        const placeName = document.createElement("p");
        const placeImg = document.createElement("img");
        placeImg.src = result.preview.source;

        placeName.innerText = element.properties.name;
        const saveButton = document.createElement("button");
        saveButton.innerHTML = "Spara";

        saveButton.addEventListener("click", () => {
          saveItem(placeName.innerText);
          event.target.parentNode.remove();

        });

        placeList.append(placeName, placeImg, saveButton);
        placeList.id = `place-${index}`;
        listContainer.appendChild(placeList);
      } catch (error) {
        console.error(error);
      }
    }
  }
}

function saveItem(itemName) {
  const data = { name: itemName };

  fetch('/api/saveItem', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      printSaved();
      printRemoved();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Något gick fel!');
    });
}



async function fetchSaved() {
  try {
    const response = await fetch('/api/getAllItems', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    console.log('Svar från servern:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
async function printSaved() {
  const data = await fetchSaved();
  savedPlaceList.innerHTML = "";

  data.forEach(element => {
    let savedName = document.createElement("p");
    savedName.innerText = element.name;
    let removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";
    removeBtn.addEventListener("click", () => confirmDelete(element.id));
    savedPlaceList.append(savedName, removeBtn);
  });
}

async function fetchRemoved() {
  try {
    const response = await fetch('/api/allRemovedItems', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    console.log('Svar från servern:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function printRemoved() {
  const data = await fetchRemoved();
  removedPlaceList.innerHTML = "";

  data.forEach(element => {
    console.log(element);
    let removedName = document.createElement("h3");
    let review = document.createElement("p")
    removedName.innerText = element.name;
    review.innerText = element.review
    removedPlaceList.append(removedName, review);
  });
}




printSaved();
printRemoved();

