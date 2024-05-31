class FacilityBookingSystem {
  constructor() {
    this.facilities = {};
  }

  addFacility(name, rates) {
    this.facilities[name] = {
      name,
      rates,
      bookings: {},
    };
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

    if (!facility.bookings[date]) {
      facility.bookings[date] = {};
    }

    for (let time = startTime; time < endTime; time++) {
      if (facility.bookings[date][time]) {
        return "Booking Failed, Already Booked";
      }
    }

    for (let time = startTime; time < endTime; time++) {
      facility.bookings[date][time] = true;
    }

    let amount = 0;
    if (facility.name === "Clubhouse") {
      for (let time = startTime; time < endTime; time++) {
        if (time >= 10 && time < 16) {
          amount += facility.rates.day;
        } else if (time >= 16 && time < 22) {
          amount += facility.rates.evening;
        }
      }
    } else {
      amount = (endTime - startTime) * facility.rates.hour;
    }

    return `Booked, Rs. ${amount}`;
  }
}

module.exports = FacilityBookingSystem;
