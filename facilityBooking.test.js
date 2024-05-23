const Facility = require("./facilityBooking");

describe("Facility Booking Tests", () => {
  let clubhouse;
  let tennisCourt;

  beforeEach(() => {
    const clubhouseRates = [
      { startTime: "10:00", endTime: "16:00", rate: 100 },
      { startTime: "16:00", endTime: "22:00", rate: 500 },
    ];

    const tennisCourtRates = [
      { startTime: "00:00", endTime: "23:59", rate: 50 },
    ];

    clubhouse = new Facility("Clubhouse", clubhouseRates);
    tennisCourt = new Facility("Tennis Court", tennisCourtRates);
  });

  test("Booking Clubhouse from 16:00 to 22:00 should cost Rs. 3000", () => {
    const result = clubhouse.book("26-10-2020", "16:00", "22:00");
    expect(result).toBe("Booked, Rs. 3000");
  });

  test("Booking Tennis Court from 16:00 to 20:00 should cost Rs. 200", () => {
    const result = tennisCourt.book("26-10-2020", "16:00", "20:00");
    expect(result).toBe("Booked, Rs. 200");
  });

  test("Booking Clubhouse again from 16:00 to 22:00 should fail", () => {
    clubhouse.book("26-10-2020", "16:00", "22:00");
    const result = clubhouse.book("26-10-2020", "16:00", "22:00");
    expect(result).toBe("Booking Failed, Already Booked");
  });

  test("Booking Tennis Court again from 17:00 to 21:00 should fail", () => {
    tennisCourt.book("26-10-2020", "16:00", "20:00");
    const result = tennisCourt.book("26-10-2020", "17:00", "21:00");
    expect(result).toBe("Booking Failed, Already Booked");
  });
});
