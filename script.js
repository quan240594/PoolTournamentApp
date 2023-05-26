function processFile() {
  const fileInput = document.getElementById('fileInput');
  const groupSizeInput = document.getElementById('groupSize');
  const file = fileInput.files[0];
  const groupSize = parseInt(groupSizeInput.value);

  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const fileContent = event.target.result;
      const names = fileContent.trim().split('\n');
      const shuffledNames = shuffleArray(names);
      const uniqueIds = generateUniqueIds(names.length);
      const groups = makeGroups(shuffledNames, uniqueIds, groupSize);
      displayGroups(groups);
    };
    reader.readAsText(file);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateUniqueIds(count) {
  const uniqueIds = [];
  for (let i = 1; i <= count; i++) {
    uniqueIds.push(i);
  }
  return uniqueIds;
}

function makeGroups(names, uniqueIds, groupSize) {
  const groups = [];
  while (names.length > 0) {
    const group = [];
    for (let i = 0; i < groupSize && names.length > 0; i++) {
      const name = names.shift();
      const id = uniqueIds.shift();
      group.push({ name, id });
    }
    groups.push(group);
  }
  return groups;
}

function displayGroups(groups) {
  const groupsContainer = document.getElementById('groups');
  groupsContainer.innerHTML = '';

  groups.forEach((group, index) => {
    const groupContainer = document.createElement('table');
    groupContainer.classList.add('group');

    const groupIdRow = document.createElement('tr');
    const groupIdHeader = document.createElement('th');
    groupIdHeader.setAttribute('colspan', '2');
    groupIdHeader.innerText = 'Group ' + (index + 1);
    groupIdRow.appendChild(groupIdHeader);
    groupContainer.appendChild(groupIdRow);

    const tableHeaderRow = document.createElement('tr');
    const nameHeader = document.createElement('th');
    nameHeader.innerText = 'Name';
    const idHeader = document.createElement('th');
    idHeader.innerText = 'ID';
    tableHeaderRow.appendChild(nameHeader);
    tableHeaderRow.appendChild(idHeader);
    groupContainer.appendChild(tableHeaderRow);

    group.forEach(player => {
      const playerRow = document.createElement('tr');
      const playerName = document.createElement('td');
      playerName.innerText = player.name;
      const playerId = document.createElement('td');
      playerId.innerText = player.id;
      playerRow.appendChild(playerName);
      playerRow.appendChild(playerId);
      groupContainer.appendChild(playerRow);
    });

    groupsContainer.appendChild(groupContainer);
  });

  const resultContainer = document.getElementById('resultContainer');
  resultContainer.style.display = 'block';
}
