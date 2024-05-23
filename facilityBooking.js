class Facility {
  constructor(name, bookingRates) {
    this.name = name;
    this.bookingRates = bookingRates;
    this.bookings = [];
  }

  book(date, startTime, endTime) {
    let start = this.parseTime(startTime);
    let end = this.parseTime(endTime);

    for (let booking of this.bookings) {
      if (
        booking.date === date &&
        ((start >= booking.start && start < booking.end) ||
          (end > booking.start && end <= booking.end) ||
          (start <= booking.start && end >= booking.end))
      ) {
        return `Booking Failed, Already Booked`;
      }
    }

    let cost = this.calculateCost(start, end);
    this.bookings.push({ date, start, end });
    return `Booked, Rs. ${cost}`;
  }

  parseTime(timeStr) {
    let [hour, minute] = timeStr.split(":").map(Number);
    return hour + minute / 60;
  }

  calculateCost(start, end) {
    let totalCost = 0;
    for (let { startTime, endTime, rate } of this.bookingRates) {
      let startRate = this.parseTime(startTime);
      let endRate = this.parseTime(endTime);
      if (start < endRate && end > startRate) {
        let bookingStart = Math.max(start, startRate);
        let bookingEnd = Math.min(end, endRate);
        totalCost += (bookingEnd - bookingStart) * rate;
      }
    }
    return totalCost;
  }
}

module.exports = Facility;
