const FacilityBookingSystem = require("./FacilityBookingSystem");

describe("FacilityBookingSystem", () => {
  let facilityBookingSystem;

  beforeEach(() => {
    facilityBookingSystem = new FacilityBookingSystem();
    facilityBookingSystem.addFacility("Clubhouse", { day: 100, evening: 500 });
    facilityBookingSystem.addFacility("Tennis Court", { hour: 50 });
  });

  test("should book Clubhouse for given time and calculate amount", () => {
    const result = facilityBookingSystem.bookFacility(
      "Clubhouse, 26-10-2024, 16:00 - 22:00"
    );
    expect(result).toBe("Booked, Rs. 3000");
  });

  test("should book Tennis Court for given time and calculate amount", () => {
    const result = facilityBookingSystem.bookFacility(
      "Tennis Court, 26-10-2024, 16:00 - 20:00"
    );
    expect(result).toBe("Booked, Rs. 200");
  });

  test("should fail to book Clubhouse if already booked", () => {
    facilityBookingSystem.bookFacility("Clubhouse, 26-10-2024, 16:00 - 22:00");
    const result = facilityBookingSystem.bookFacility(
      "Clubhouse, 26-10-2024, 16:00 - 22:00"
    );
    expect(result).toBe("Booking Failed, Already Booked");
  });

  test("should fail to book Tennis Court if already booked", () => {
    facilityBookingSystem.bookFacility(
      "Tennis Court, 26-10-2024, 16:00 - 20:00"
    );
    const result = facilityBookingSystem.bookFacility(
      "Tennis Court, 26-10-2024, 17:00 - 21:00"
    );
    expect(result).toBe("Booking Failed, Already Booked");
  });

  test("Should check for invalid facility", () => {
    const result = facilityBookingSystem.bookFacility(
      "Swimming Pool, 26-10-2020, 16:00 - 20:00"
    );
    expect(result).toBe("Facility does not exist");
  });

  test("should return error if booking date is not greater than current date", () => {
    const result = facilityBookingSystem.bookFacility(
      "Clubhouse, 01-01-2020, 16:00 - 22:00"
    );
    expect(result).toBe("Date must be greater than the current Date.");
  });
});
