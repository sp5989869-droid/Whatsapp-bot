
const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.post("/webhook", (req, res) => {
  const mensagem = req.body.Body || "";

  console.log("Mensagem recebida:", mensagem);

  res.status(200);
  res.type("text/xml");
  res.send(`
    <?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <Message>Olá! Recebi a sua mensagem. 🤖</Message>
    </Response>
  `);
});

app.get("/", (req, res) => {
  res.send("Webhook do WhatsApp está funcionando!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor funcionando na porta " + PORT);
});
