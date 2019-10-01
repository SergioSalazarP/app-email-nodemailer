const { Router } = require("express");
const nodemailer = require("nodemailer");
const router = Router();

router.post("/send-email", async (req, res) => {
  const { name, email, phone, message } = req.body;

  contentHTML = ` 
    <h1>User Unformation</h1>
    <ul>
      <li>Username: ${name}</li>
      <li>User Email: ${email}</li>
      <li>Phone: ${phone}</li>
    </ul>
    <p>${message}</p>
  `; // estructura del mensaje que recivira

  const transporter = nodemailer.createTransport({
    host: process.env.host,
    port: process.env.port,
    secure: process.env.secure, // clave SSL, false si no
    auth: {
      user: process.env.user, // email el cual se server lo va a enviar
      pass: process.env.pass // contracena del email
    },
    tls: {
      rejectUnauthorized: false // en esta app no es necesario enviar un correo desde el mismo dominio
    }
  });

  const info = await transporter.sendMail({
    from: "'Sergio Salazar' <ssalazarpalacios@yahoo.com> ",
    to: "ssalazarpalacios@gmail.com",
    subject: "Website contact porm",
    html: contentHTML
  });

  nodemailer.res.redirect("/success.html");
});

module.exports = router;
