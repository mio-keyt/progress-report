
   function getExpenses() {
      return JSON.parse(localStorage.getItem("expenses") || "[]");
    }

    function saveExpenses(expenses) {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    function formatDateString(dateObj) {
      return dateObj.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
    }

    function updateSelectedDate() {
      const input = document.getElementById('calendar-selector');
      const display = document.getElementById('date-indicator');
      const selectedDate = new Date(input.value);
      if (!isNaN(selectedDate)) {
        display.textContent = `Selected date: ${formatDateString(selectedDate)}`;
        loadCarousel();
      }
    }

    function addExpense() {
      const title = document.getElementById("expense-title").value;
      const price = parseFloat(document.getElementById("expense-price").value);
      const imageInput = document.getElementById("expense-image");
      const date = document.getElementById("calendar-selector").value;
      const reader = new FileReader();

      if (!title || isNaN(price) || !date) return alert("Please fill all fields.");

      const expenses = getExpenses();

      reader.onload = () => {
        const image = reader.result;
        expenses.push({ title, price, date, image });
        saveExpenses(expenses);
        alert("Expense logged.");
        loadCarousel();
      };

      if (imageInput.files[0]) reader.readAsDataURL(imageInput.files[0]);
      else reader.onload();
    }

    function deleteLastExpense() {
      let expenses = getExpenses();
      expenses.pop();
      saveExpenses(expenses);
      alert("Last expense deleted.");
      loadCarousel();
    }

    function loadCarousel() {
      const container = document.getElementById("carousel");
      const message = document.getElementById("no-expense-message");
      const selectedDate = document.getElementById("calendar-selector").value;
      const expenses = getExpenses();

      container.innerHTML = "";
      const filtered = expenses.filter(exp => exp.date === selectedDate);

      if (filtered.length === 0) {
        message.style.display = "block";
        return;
      }

      message.style.display = "none";

     filtered.forEach(exp => {
  const wrapper = document.createElement("div");
  wrapper.style.textAlign = "center";

  const label = document.createElement("div");
  label.innerHTML = `<strong>${exp.title}</strong><br>₱${exp.price.toFixed(2)}`;
  label.style.marginBottom = "0.3rem";
  label.style.fontSize = "0.9rem";

  const img = document.createElement("img");
  img.src = exp.image;
  img.alt = exp.title;
  img.className = "carousel-img";

  wrapper.appendChild(label);
  wrapper.appendChild(img);
  container.appendChild(wrapper);
});
    }

    window.addEventListener('DOMContentLoaded', () => {
      const dateElement = document.getElementById('date-indicator');
      const input = document.getElementById('calendar-selector');
      const today = new Date();
      dateElement.textContent = `Today is ${formatDateString(today)}`;
      input.valueAsDate = today;
      loadCarousel();
    });

//monthyly-calendar.html

const expenseDates = [
      "2025-06-02",
      "2025-06-06",
      "2025-06-08",
      "2025-06-12",
      "2025-06-15",
      "2025-06-20"
    ];

    const calendarGrid = document.getElementById("calendar-grid");

    const today = new Date();
    const currentYear = 2025;
    const currentMonth = 5;

    function generateCalendar(year, month) {
      calendarGrid.innerHTML = "";

      const firstDay = new Date(year, month, 1);
      const startDay = firstDay.getDay(); 
      const totalDays = new Date(year, month + 1, 0).getDate();

      const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
      daysOfWeek.forEach((day, index) => {
        const label = document.createElement("div");
        label.className = "day-label";
        label.innerHTML = (day === "F" && isTodayFriday(year, month)) 
          ? `F<br><small style="font-size:0.7rem; color: orange;">today</small>` 
          : day;
        calendarGrid.appendChild(label);
      });


      for (let i = 0; i < startDay; i++) {
        calendarGrid.innerHTML += "<div></div>";
      }

      for (let day = 1; day <= totalDays; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const cell = document.createElement("div");
        cell.className = "date-cell";

        const dayDiv = document.createElement("div");
        dayDiv.className = "date-number";
        dayDiv.textContent = day;

        const dotDiv = document.createElement("div");
        if (expenseDates.includes(dateStr)) {
          dotDiv.className = "dot";
        }

        if (isToday(dateStr)) {
          dotDiv.classList.add("today");
        }

        cell.appendChild(dayDiv);
        if (dotDiv.className) cell.appendChild(dotDiv);
        calendarGrid.appendChild(cell);
      }
    }

    function isToday(dateStr) {
      const d = new Date(dateStr);
      return today.toDateString() === d.toDateString();
    }

    function isTodayFriday(year, month) {
      return (
        today.getFullYear() === year &&
        today.getMonth() === month &&
        today.getDay() === 5
      );
    }

    generateCalendar(currentYear, currentMonth);

