class Facility {
  constructor(name, rates) {
    this.name = name;
    this.rates = rates;
    this.bookings = {};
  }

  isAvailable(startTime, endTime) {
    for (let time = startTime; time < endTime; time++) {
      if (this.bookings[time]) {
        return false;
      }
    }
    return true;
  }

  book(startTime, endTime) {
    for (let time = startTime; time < endTime; time++) {
      this.bookings[time] = true;
    }
  }

  calculateAmount(startTime, endTime) {
    let amount = 0;
    if (this.name === "Clubhouse") {
      for (let time = startTime; time < endTime; time++) {
        if (time >= 10 && time < 16) {
          amount += this.rates.day;
        } else if (time >= 16 && time < 22) {
          amount += this.rates.evening;
        }
      }
    } else {
      amount = (endTime - startTime) * this.rates.hour;
    }
    return amount;
  }
}

class FacilityBookingSystem {
  constructor() {
    this.facilities = {};
  }

  addFacility(name, rates) {
    this.facilities[name] = new Facility(name, rates);
  }

  bookFacility(bookingInput) {
    const [facilityName, date, timeRange] = bookingInput.split(", ");
    const [startTime, endTime] = timeRange
      .split(" - ")
      .map((time) => parseInt(time.split(":")));

    const facility = this.facilities[facilityName];

    if (!facility) {
      return "Facility does not exist";
    }

    const currentDate = new Date();
    const bookingDate = new Date(date.split("-").reverse().join("-"));
    if (bookingDate <= currentDate) {
      return "Date must be greater than the current Date.";
    }

    if (!facility.isAvailable(startTime, endTime)) {
      return `Booking Failed, Already Booked`;
    }

    facility.book(startTime, endTime);
    const amount = facility.calculateAmount(startTime, endTime);
    return `Booked, Rs. ${amount}`;
  }
}

module.exports = FacilityBookingSystem;
