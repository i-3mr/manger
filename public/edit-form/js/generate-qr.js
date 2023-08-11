// generate QR code

export function generateQRCode(text) {
  new QRCode("qrcode", {
    text,
    width: 200,
    height: 200,
  });
}
