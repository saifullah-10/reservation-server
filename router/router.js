const express = require("express");
const router = express.Router();
const pdf = require("../pdf/generate_invoice");

router.post("/invoice", (req, res, next) => {
  const data = req.body;

  const stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    "content-disposition": 'attachment; filename="Reservation_invoice.pdf',
  });
  pdf.makePDF(
    (chunk) => stream.write(chunk),
    () => stream.end(),
    data
  );
});

module.exports = router;
