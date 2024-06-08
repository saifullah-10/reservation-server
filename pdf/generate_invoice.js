const PDFDocument = require("pdfkit");
const path = require("path");
function makePDF(dataCallback, endCallback, data) {
  const doc = new PDFDocument();
  doc.on("data", dataCallback);
  doc.on("end", endCallback);
  // Info Data

  const {
    reservation_id,
    first_name,
    last_name,
    email,
    phone,
    vehicle_type,
    vehicle_name,
    start_date_time,
    end_date_time,
    summaryData,
    rental_tax,
    discount,
    options,
    total_rate,
  } = data;
  const notice = `Collision Insurance (CDW)- $7 per day,Limits liability of damages to one's own vehicle up to provides you coverage for rental vehicle damage or $1000 in event of an accident,
by waiving this coverage renter agrees to be hold liable for damages up to the entire value of the vehicle.`;
  //
  //
  //
  //
  const dateFormateOption = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const startDate = new Date(start_date_time);
  const endDate = new Date(end_date_time);
  // Company Information (left column)
  doc
    .image(path.join(__dirname, "img", "carLogo.png"), 50, 45, { width: 50 })
    .fontSize(20)
    .text("Euro Rental Car", 110, 57)
    .fontSize(15)
    .text("A Relaiable Car Rental Service In Italy", 50)
    .fontSize(10)
    .text("23/345, Rome, Italy", 200, 65, { align: "right" })
    .text("06 5912207", 200, 80, { align: "right" });

  doc.moveDown();

  // Renter Information
  doc
    .fontSize(12)
    .text(`RENTER INFO:`, 50, 150)
    .fontSize(10)
    .text(`Name: ${first_name} ${last_name}`, 50, 165)
    .text(`Email: ${email}`, 50, 180, { width: 100 })
    .text(`Phone: ${phone}`, 50, 205)
    .text("Monday 9:00 AM-6:00 PM", 180, 130)
    .text("Tuesday 9:00 AM-6:00 PM", 180, 145)
    .text("Wednesday 9:00 AM-6:00 PM", 180, 160)
    .text("Thursday 9:00 AM-6:00 PM", 180, 175)
    .text("Friday 9:00 AM-6:00 PM", 180, 190)
    .text("Saturday 9:00 AM-6:00 PM", 180, 205)
    .text("Sunday 9:00 AM-6:00 PM", 180, 220);

  doc.moveDown();

  //   // Additional Authorized Driver(s)
  doc
    .fontSize(12)
    .text(`ADDITIONAL AUTHORIZED DRIVER(S)`, 50, 240, { bold: true });

  doc.moveDown();

  //   // Unit Details
  doc
    .fontSize(12)
    .text(`UNIT DETAILS`, 50, 260)
    .fontSize(10)
    .text(`Unit: ${vehicle_type}`, 50, 275)
    .fontSize(10)
    .text(`Make & Model: ${vehicle_name}`, 50, 290);

  doc.moveDown();

  //   // Billing Information
  doc
    .fontSize(14)
    .text(`BILL TO:`, 50, 315)
    .fontSize(10)
    .text("Payment Type: Unpaid", 50, 330)
    .text(`Total Payable: $ ${total_rate}`, 50, 340);

  doc.moveDown();

  //   // Notice
  doc
    .fontSize(14)
    .text(`Referral:`, 50, 360)
    .fontSize(10)
    .text(`NOTICE: ${notice}`, 50, 375, { width: 250 });

  doc.moveDown();
  doc
    .fontSize(12)
    .text("Accept", 60, 470)
    .fontSize(12)
    .text("Reject", 150, 470)
    .fontSize(10)
    .text(
      `Rental service may be refused anyone when done in the best interest of the renting company or customer`,
      50,
      510,
      { width: 250 }
    )
    .fontSize(10)
    .text(
      `-Rates do not include gasoline. - Reserves the right Additional Driver 1
to collect deposit covering estimated rental charges.`,
      50,
      550,
      { width: 250 }
    );

  //   // Right Column - Reservation and Charge Summary
  const startX = 320;
  doc
    .fontSize(20)
    .text(`Reservation`, startX, 120)
    .fontSize(16)
    .text(`${reservation_id}`, startX, 145)
    .moveDown();

  doc
    .fontSize(12)
    .text(`CLAIM`, startX, 180)
    .fontSize(10)
    .text(
      `Date/Time Out: ${startDate.toLocaleString("en-US", dateFormateOption)}`,
      startX,
      195
    )
    .fontSize(10)
    .text(
      `Date/Time In: ${endDate.toLocaleString("en-US", dateFormateOption)}`,
      startX,
      215
    )
    .moveDown();

  //   draw table
  const tableTop = 270;
  const rowHeight = 30;
  const tableWidth = 250;
  const columnWidths = {
    unit: 100,
    price: 30,
    amount: 50,
  };
  doc.rect(startX, 240, tableWidth, rowHeight).fill("#e0e0e0").stroke();
  doc
    .fillColor("#000000")
    .fontSize(16)
    .text(`CHARGE SUMMARY`, startX, 250)
    .fontSize(10);
  const rows = summaryData;
  rows.forEach((row, i) => {
    const y = tableTop + i * rowHeight;

    // Alternate row background color
    doc.rect(startX, y, tableWidth, rowHeight).fill("#e0e0e0").stroke();

    // Draw cells
    doc
      .fillColor("#000000")
      .fontSize(10)
      .text(row[0], startX, y + 5, { width: columnWidths.unit })
      .text(row[1], startX + columnWidths.unit, y + 5)
      .text(row[2], startX + columnWidths.unit + columnWidths.price, y + 5)
      .text(
        row[3],
        startX +
          columnWidths.unit +
          columnWidths.price +
          columnWidths.amount +
          10,
        y + 5,
        {
          width: 45,
          align: "right",
        }
      );
  });

  doc.moveDown();
  //   // Terms and Signature
  doc
    .fontSize(10)
    .text(
      "Your rental agreement offers, for an additional charge, an optional waiver to cover all or a part of your responsibility for damage to or loss of the vehicle. Before deciding whether to purchase the waiver, you may wish to determine whether your own automobile insurance or credit card agreement provides you coverage for rental vehicle damage or loss and determine the amount of the deductible under your own insurance coverage. The purchase of the waiver is not mandatory. The waiver is not insurance. I acknowledge that I have received and read a copy of this.",
      50,
      620
    )
    .moveDown();

  doc
    .text("Renters Signature:", 50, 700)
    .text("_______________", 135, 700)
    .text("Additional Driver 1:", 300, 700)
    .text("_______________", 385, 700);

  //
  //
  //
  //
  doc.end();
}
module.exports = { makePDF };
