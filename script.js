const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
const expenseList = document.querySelector("ul");
const expensesTotal = document.querySelector("aside header p span");
const expensesAmountTotal = document.querySelector("aside header h2");


const formatCurrencyBRL = (value) => {
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return value
}

const expendAdd = (newExpense) => {

    try {
        expenseList.innerHTML += `
            <li class="expense">
                <img src="./img/${newExpense.category_id}.svg"/>
                <div class="expense-info">
                    <strong>${newExpense.expense}</strong>
                    <span>${newExpense.category_name}</span>
                </div>
                <span class="expense-amount"><small>R$</small>${newExpense.amount.replace("R$", "")}</span>
                <img src="./img/remove.svg" alt="remover" class="remove-icon" />
            </li>
        `

        updateTotals()

    } catch {
        alert("Erro ao adicionar despesa.")
    }

}

const updateTotals = () => {
    try {

        const items = expenseList.children
        expensesTotal.innerText = items.length > 1 ? `${items.length} despesas` : `${items.length} despesa`

        let total = 0

        for (const item of items) {
            const itemAmount = item.querySelector(".expense-amount").textContent
            const value = Number(itemAmount.replace(/[^\d,]/g, "").replace(",", "."))
            total += value
        }

        expensesAmountTotal.innerHTML = `<small>R$</small>${formatCurrencyBRL(total).replace("R$", "")}`

    } catch (error) {
        alert("Erro ao atualizar os totais.")
    }
}

amount.oninput = () => {
    const value = Number(amount.value.replace(/\D/g, "")) / 100;

    amount.value = formatCurrencyBRL(value)
}

form.onsubmit = (event) => {
    event.preventDefault();

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    expendAdd(newExpense)
    form.reset()
    expense.focus()
}

expenseList.addEventListener("click", (event) => {
    const itemToRemove = event.target

    if (itemToRemove.classList.contains("remove-icon")) {

        itemToRemove.parentElement.remove()
        updateTotals()
    }
})