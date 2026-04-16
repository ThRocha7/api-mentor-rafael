import { getReportData } from "../services/reportService.js";
import { createPdf } from "../services/pdfService.js";
import { sendEmail } from "../services/emailService.js";

export async function generatePdf(req, res) {
  try {
    const { id } = req.params;

    const data = await getReportData(id);

    if (!data) {
      return res.status(404).json({ error: "Dados não encontrados" });
    }

    const pdfBuffer = await createPdf(data);
    const emailSent = await sendEmail(pdfBuffer, data);

    if (emailSent) {
      return res.status(200).json({ message: "Email sent successfully!" });
    } else {
      return res.status(500).json({ error: "Internal Error" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
