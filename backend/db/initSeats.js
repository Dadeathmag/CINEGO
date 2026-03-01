

/**
 * Auto-generate seats for a theater
 * @param {Object} db - The database connection
 * @param {number} theaterId - The theater ID
 * @param {number} totalRows - Number of rows in theater (e.g. 10)
 * @param {number} seatsPerRow - Number of seats per row (e.g. 15)
 */

export async function generateSeatsForTheater(db, theaterId, totalRows, seatsPerRow) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  console.log(`Generating seats for theater ${theaterId}: ${totalRows} rows, ${seatsPerRow} seats per row`);

  for (let row = 0; row < totalRows; row++) {
    const rowLetter = alphabet[row];
    for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
      const seatNumber = `${rowLetter}${seatNum.toString().padStart(2, '0')}`; // e.g., A01, B05, J15
      try {
        await db.run(
          `INSERT INTO seats (seat_number, seat_type, theater_id) VALUES (?, ?, ?)`,
          [seatNumber, 'Regular', theaterId]
        );
        console.log(`Created seat: ${seatNumber}`);
      } catch (error) {
        console.error(`Error creating seat ${seatNumber}:`, error);
      }
    }
  }
  
  console.log(`Seat generation completed for theater ${theaterId}`);
}