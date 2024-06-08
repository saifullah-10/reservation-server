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
    .text(`Email: ${email}`, 50, 180)
    .text(`Phone: ${phone}`, 50, 195)
    .text("Monday 9:00 AM-6:00 PM", 20, 130, { align: "center" })
    .text("Tuesday 9:00 AM-6:00 PM", 20, 145, { align: "center" })
    .text("Wednesday 9:00 AM-6:00 PM", 20, 160, { align: "center" })
    .text("Thursday 9:00 AM-6:00 PM", 20, 175, { align: "center" })
    .text("Friday 9:00 AM-6:00 PM", 20, 190, { align: "center" })
    .text("Saturday 9:00 AM-6:00 PM", 20, 205, { align: "center" })
    .text("Sunday 9:00 AM-6:00 PM", 20, 220, { align: "center" });

  doc.moveDown();

  //   // Additional Authorized Driver(s)
  doc.fontSize(16).text(`ADDITIONAL AUTHORIZED DRIVER(S)`, 50, 240);

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
    .text(`NOTICE: ${notice}`, 50, 375, { width: 300 });

  doc.moveDown();
  doc
    .fontSize(12)
    .text("Accept", 60, 450)
    .fontSize(12)
    .text("Reject", 150, 450)
    .fontSize(10)
    .text(
      `Rental service may be refused anyone when done in the best interest of the renting company or customer`,
      50,
      470,
      { width: 300 }
    )
    .fontSize(10)
    .text(
      `-Rates do not include gasoline. - Reserves the right Additional Driver 1
to collect deposit covering estimated rental charges.`,
      50,
      500,
      { width: 300 }
    );

  //   // Right Column - Reservation and Charge Summary
  const startX = 360;
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

  doc.fontSize(16).text(`CHARGE SUMMARY`, startX, 240).fontSize(10);

  //   chargeSummary.items.forEach((item, index) => {
  //     doc
  //       .text(item.description, startX, 220 + index * 15)
  //       .text(item.unitPrice, startX + 150, 220 + index * 15)
  //       .text(item.amount, startX + 200, 220 + index * 15);
  //   });

  //   doc
  //     .text(`TOTAL ESTIMATED CHARGES`, startX, 320)
  //     .text(chargeSummary.totalCharges, startX + 200, 320);

  //   doc.moveDown();

  //   // Terms and Signature
  //   doc
  //     .fontSize(10)
  //     .text(
  //       "Your rental agreement offers, for an additional charge, ...",
  //       50,
  //       360,
  //       { width: 500 }
  //     )
  //     .moveDown();

  //   doc
  //     .text("Renters Signature", 50, 500)
  //     .text("__________________________", 50, 515);

  //   doc
  //     .text("Additional Driver 1", 300, 500)
  //     .text("__________________________", 300, 515);
  //
  //
  //
  //
  doc.end();
}
module.exports = { makePDF };
