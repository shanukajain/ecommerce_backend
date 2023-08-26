const fs = require('fs');
const { PDFDocument, rgb } = require('pdf-lib');



async function genratepdf({name,address,id,totalamount}) {
    const shippingInfo = {
        recipientName: name,
        address,
        shippingcompany:"XYZ",
        trackingNumber: 'ABC123456789',
        totalamount
      };
      console.log(shippingInfo)
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([400, 200]);

  page.drawText('Shipping Label', {
    x: 150,
    y: 180,
    size: 14,
    color: rgb(0, 0, 0),
  });

  page.drawText(`To: ${shippingInfo.recipientName}`, {
    x: 50,
    y: 160,
    size: 12,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Address: ${shippingInfo.address}`, {
    x: 50,
    y: 140,
    size: 12,
    color: rgb(0, 0, 0),
  });
  page.drawText(`Shipping Company: ${shippingInfo.shippingcompany}`, {
    x: 50,
    y: 120,
    size: 12,
    color: rgb(0, 0, 0),
  });
  page.drawText(`Total amount: ${shippingInfo.totalamount}`, {
    x: 50,
    y: 100,
    size: 12,
    color: rgb(0, 0, 0),
  });
  page.drawText(`Tracking: ${shippingInfo.trackingNumber}`, {
    x: 50,
    y: 80,
    size: 12,
    color: rgb(0, 0, 0),
  });
// Serialize the PDFDocument to bytes
const pdfBytes = await pdfDoc.save();

// Write the PDF bytes to a file
const pdfFilePath = `./shippmentlablepdf/${id}.pdf`;
fs.writeFileSync(pdfFilePath, pdfBytes);
// console.log(shippingInfo)
return(shippingInfo);
}
module.exports={genratepdf}