/** 
 * Timesheet generator
*/

const pad = x => x.toString().padStart(2, '0');

class TimesheetGenerator {
  #month = 0;
  #year = 0;

  // constructor() {

  // }
  setYear(year) {
    this.#year = Number(year) || new Date().getFullYear();
  }
  setMonth(month) {
    this.#month = Number(month);
  }

  randomDays(month = this.#month) {
    var firstDate = new Date(`${this.#year}-${month}`);
    var randomDates = new Map();
    const numDays = 4 + Math.floor(4 * Math.random());
    do {
      let day = 1 + Math.floor(31 * Math.random());
      if (randomDates.has(day)) {
        continue;
      }
      let nextDate = new Date(new Date(firstDate).setDate(day));
      if (nextDate.getMonth() != firstDate.getMonth()) {
        continue;
      }
      if ([0, 6].includes(nextDate.getDay())) {
        continue;
      }
      randomDates.set(day, 1 + Math.floor(4 * Math.random()))

    } while (randomDates.size < numDays);
    return [...randomDates.entries()]
      .sort(([dayA], [dayB]) => dayA - dayB)
      .map(([day, hours]) => ({
        date: `${pad(day)}/${pad(month)}/${this.#year}`,
        hours
      }));
  }

  randomDaysQuarter() {
    let months = [];
    for (let month = 0; month < 3; month++)
      months = months.concat(this.randomDays(this.#month + month));
    return months;
  }
}

var timesheetGenerator = new TimesheetGenerator();

function showRandomDays() {
  const quarter = timesheetGenerator.randomDaysQuarter();
  let dates = '';
  let hours = '';
  quarter.forEach(day => {
    dates += `${day.date}<br>`;
    hours += `${day.hours}<br>`;
  })
  document.getElementById('dates').innerHTML = dates;
  document.getElementById('hours').innerHTML = hours;
}