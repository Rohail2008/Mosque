// Mobile menu toggle
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('active');
});

// Preloader
window.addEventListener('load', () => {
  document.getElementById('preloader').style.display = 'none';
});

// Calendar Data
const events = {
  '2025-04-01': { title: "Community Dua", description: "Join us for a special community dua after Maghrib prayer." },
  '2025-04-08': { title: "Quran Class", description: "Weekly Quran classes for all ages." },
  '2025-04-14': { title: "Youth Seminar", description: "Special seminar for youth empowerment and leadership." },
  '2025-04-21': { title: "Family Iftar", description: "Community family iftar gathering. All are welcome!" }
};

// Calendar Variables
let currentMonth = 3; // April (0=Jan, 1=Feb, ..., 3=April)
let currentYear = 2025;

// Create Calendar
function generateCalendar(month, year) {
  const calendar = document.getElementById('calendar');
  const calendarTitle = document.getElementById('calendar-title');
  calendar.innerHTML = ''; // Clear existing calendar

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  calendarTitle.textContent = `📅 ${monthNames[month]} ${year} Mosque Events`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Add day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dayNames.forEach(day => {
    const dayName = document.createElement('div');
    dayName.classList.add('day-name');
    dayName.textContent = day;
    calendar.appendChild(dayName);
  });

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.classList.add('day', 'empty');
    calendar.appendChild(emptyCell);
  }

  // Add days
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement('div');
    dayCell.classList.add('day');

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('date');
    dateDiv.textContent = day;
    dayCell.appendChild(dateDiv);

    const eventKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (events[eventKey]) {
      const eventDiv = document.createElement('div');
      eventDiv.classList.add('event');
      eventDiv.textContent = events[eventKey].title;
      dayCell.appendChild(eventDiv);

      dayCell.addEventListener('click', () => {
        openPopup(events[eventKey].title, events[eventKey].description);
      });
    }

    calendar.appendChild(dayCell);
  }
}

// Open Popup
function openPopup(title, description) {
  document.getElementById('popup-title').textContent = title;
  document.getElementById('popup-description').textContent = description;
  document.getElementById('event-popup').style.display = 'flex';
}

// Close Popup
document.getElementById('close-popup').addEventListener('click', () => {
  document.getElementById('event-popup').style.display = 'none';
});

// Prev/Next buttons
document.getElementById('prev-month').addEventListener('click', () => {
  if (currentMonth === 0) {
    currentMonth = 11;
    currentYear--;
  } else {
    currentMonth--;
  }
  generateCalendar(currentMonth, currentYear);
});

document.getElementById('next-month').addEventListener('click', () => {
  if (currentMonth === 11) {
    currentMonth = 0;
    currentYear++;
  } else {
    currentMonth++;
  }
  generateCalendar(currentMonth, currentYear);
});

// Initial Load
generateCalendar(currentMonth, currentYear);
