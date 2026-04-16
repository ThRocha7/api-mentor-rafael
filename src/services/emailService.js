import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail(pdfBuffer, data) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: "Resultado Diagnóstico Empresarial",
      text: `Olá, ${data.name}!
      
Primeiramente, agradecemos pela sua participação no nosso Raio-X Empresarial.

Foi um prazer conhecer melhor o seu negócio por meio das suas respostas. Nosso time está à disposição para apoiar a sua empresa a crescer ainda mais, identificando oportunidades e direcionando melhorias estratégicas.

Em anexo, você encontrará todas as respostas do questionário para consulta.

Ficamos à disposição para qualquer dúvida ou para avançarmos juntos nos próximos passos.

Atenciosamente,
Rafael Lopes
      `,
      attachments: [
        {
          filename: `diagnostico_${data.company_name}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    console.log("Email sent successfully!");
    return true;
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw new Error(`Error sending email: ${error}`);
  }
}
