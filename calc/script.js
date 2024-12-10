let history = [];

function appendValue(value) {
    const resultInput = document.getElementById('result');
    resultInput.value += value;
}

function clearInput() {
    document.getElementById('result').value = '';
}

function calculate() {
    const resultInput = document.getElementById('result');
    let expression = resultInput.value;

    try {
        expression = expression.replace(/%/g, '/100');

        let result = eval(expression);
        resultInput.value = result;

        addToHistory(expression + ' = ' + result);
    } catch (error) {
        alert("Kļūda");
    }
}

function addToHistory(entry) {
    history.push(entry);
    updateHistoryUI();
    saveHistoryToLocalStorage();
}

function updateHistoryUI() {
    const historyList = document.getElementById('history');
    historyList.innerHTML = '';

    history.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${entry}</span>
            <button onclick="deleteHistoryEntry(${index})">Dzēst</button>
        `;
        historyList.appendChild(listItem);
    });
}

function deleteHistoryEntry(index) {
    history.splice(index, 1);
    updateHistoryUI();
    saveHistoryToLocalStorage();
}

function clearHistory() {
    history = [];
    updateHistoryUI();
    saveHistoryToLocalStorage();
}

function saveHistoryToLocalStorage() {
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
}

function loadHistoryFromLocalStorage() {
    const storedHistory = localStorage.getItem('calculatorHistory');
    if (storedHistory) {
        history = JSON.parse(storedHistory);
        updateHistoryUI();
    }
}

window.onload = loadHistoryFromLocalStorage;
