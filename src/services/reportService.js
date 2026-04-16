import { getReportById } from "../repositories/reportRepository.js";

export async function getReportData(id) {
  const rows = await getReportById(id);

  if (!rows.length) return null;

  return rows[0];
}
