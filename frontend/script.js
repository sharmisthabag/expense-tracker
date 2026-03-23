const API = "http://localhost:5000/api/transactions";

let chart;

// ADD
async function addTransaction() {
    const desc = document.getElementById("desc").value;
    const amount = document.getElementById("amount").value;
    const type = document.getElementById("type").value;
    const category = document.getElementById("category").value;

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ desc, amount, type, category })
    });

    loadTransactions();
}

// LOAD
async function loadTransactions() {
    const res = await fetch(API);
    const data = await res.json();

    let list = document.getElementById("list");
    list.innerHTML = "";

    let balance = 0;
    let categoryTotals = {};

    data.forEach(t => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${t.desc} (${t.category}) - ₹${t.amount}
            <button onclick="deleteTransaction('${t._id}')">❌</button>
        `;
        list.appendChild(li);

        balance += t.type === "income"
            ? Number(t.amount)
            : -Number(t.amount);

        if (t.type === "expense") {
            categoryTotals[t.category] =
                (categoryTotals[t.category] || 0) + Number(t.amount);
        }
    });

    document.getElementById("balance").innerText = balance;

    updateChart(categoryTotals);
}

// DELETE
async function deleteTransaction(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadTransactions();
}

// CHART
function updateChart(categoryTotals) {
    const ctx = document.getElementById("myChart").getContext("2d");

    const labels = Object.keys(categoryTotals);
    const values = Object.values(categoryTotals);

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: [
                    "#ff6384",
                    "#36a2eb",
                    "#ffce56",
                    "#4bc0c0",
                    "#9966ff"
                ]
            }]
        },
        options: {
    responsive: true,
    maintainAspectRatio: true
}
    });
}

loadTransactions();