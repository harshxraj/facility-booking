# Facility Booking Module

This module handles the booking of various facilities in an apartment complex. Facilities can be booked by residents for their personal use. Each facility has specific rates depending on the time slot or the number of hours booked.

## Facilities and Rates

- **Clubhouse**
  - 10am to 4pm: Rs. 100/hour
  - 4pm to 10pm: Rs. 500/hour
- **Tennis Court**
  - Rs. 50/hour

## Input/Output Scenarios

| Input                                   | Output                         |
| --------------------------------------- | ------------------------------ |
| Clubhouse, 26-10-2020, 16:00 - 22:00    | Booked, Rs. 1000               |
| Tennis Court, 26-10-2020, 16:00 - 20:00 | Booked, Rs. 200                |
| Clubhouse, 26-10-2020, 16:00 - 22:00    | Booking Failed, Already Booked |
| Tennis Court, 26-10-2020, 17:00 - 21:00 | Booking Failed, Already Booked |
