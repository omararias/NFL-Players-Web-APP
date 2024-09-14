document.addEventListener('DOMContentLoaded', () => {
    fetch('estadisticas.csv')
        .then(response => response.text())
        .then(text => {
            const data = parseCSV(text);
            generateTableRows(data);
        })
        .catch(error => console.error('Error fetching the CSV file:', error));
});

function parseCSV(text) {
    const lines = text.split('\n');
    const headers = lines[0].split(',');
    const data = lines.slice(1).map(line => {
        const values = line.split(',');
        const obj = {};
        headers.forEach((header, index) => {
            obj[header.trim()] = values[index].trim();
        });
        return obj;
    });
    return data;
}

function generateTableRows(data) {
    const tbody = document.querySelector('#roster-table tbody');
    tbody.innerHTML = ''; // Clear existing rows

    data.forEach(player => {
        const averageYardsPerCarry = (parseFloat(player['Yardas totales']) / parseFloat(player['Veces que tuvo posesion del balon'])).toFixed(2);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player['Nombre del jugador']}</td>
            <td>${player['Numero']}</td>
            <td>${player['Posicion']}</td>
            <td>${player['Equipo']}</td>
            <td>${player['Yardas totales']}</td>
            <td>${player['Veces que tuvo posesion del balon']}</td>
            <td>${player['Touchdowns']}</td>
            <td>${averageYardsPerCarry}</td>
        `;
        tbody.appendChild(row);
    });
}

// Ejemplo de datos del primer jugador
const exampleData = [
    {
        'Nombre del jugador': 'ISAIAH PACHECO',
        'Numero': '10',
        'Posicion': 'RUNNINGBACK',
        'Equipo': 'KC',
        'Yardas totales': '100',
        'Veces que tuvo posesion del balon': '8',
        'Touchdowns': '3'
    }
];

// Generar filas de la tabla con el ejemplo de datos
generateTableRows(exampleData);