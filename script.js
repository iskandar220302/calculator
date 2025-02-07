const display = document.getElementById("display");

//добавляем значения и операторы заодно проверяем на корректность
function appendValue(value) {
    const lastChar = display.value.slice(-1);

    if ("-+%/*".includes(lastChar) && "-+%/*".includes(value)) {
        return;
    }

    if (display.value === "" && "+%/*".includes(value)) {
        return;
    }

    display.value += value;
}

//очищение экрана
function clearDisplay() {
    display.value = "";
}

//удаление последнего значения
function deleteLast() {
    if (display.value == "Error") {
        clearDisplay();
    } else {
        display.value = display.value.slice(0, -1);
    }
}

//вычисляем результат с проверкой на деление на ноль
function calculate() {
    try {
        const result = eval(display.value);
        if (result === Infinity || result === -Infinity) {
            display.value = "Error";
        } else {
            display.value = result;
        }

        // Эффект мигания кнопки "="
        const equalsButton = document.querySelector(".equals");
        equalsButton.classList.add("active");

        setTimeout(() => {
            equalsButton.classList.remove("active");
        }, 200); // Через 200 мс кнопка вернётся в нормальное состояние

    } catch {
        display.value = "Error";
    }
}

//управление через клавиатуру
document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (!isNaN(key) || "+-*/%.".includes(key)) {
        appendValue(key);
    } else if (key === "Enter") {
        calculate();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key === "Escape") {
        clearDisplay();
    }
});
