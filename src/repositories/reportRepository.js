import { pool } from "../config/db.js";

export async function getReportById(id) {
  const query = `
    SELECT 
      c.name,
      c.company_name,
      c.company_role,
      c.phone_number,
      c.email,
      ans.result_label,
      ans.result_description,

      json_agg(
        json_build_object(
          'text', q.text,
          'answer', CASE 
            WHEN (a.value)::int = 1 THEN 'Sim'
            ELSE 'Não'
          END,
          'category', q.category
        )
        ORDER BY q.category
      ) AS questions

    FROM clients c

    JOIN answers ans 
      ON ans.client_id = c.id

    JOIN LATERAL jsonb_each(ans.answers::jsonb) AS a(key, value)
      ON true

    JOIN questions q 
      ON q.id::text = a.key
      
    WHERE c.id = $1

    GROUP BY 
      c.id, 
      c.name, 
      c.company_name, 
      c.company_role,
      ans.result_label,
      ans.result_description;
  `;

  const { rows } = await pool.query(query, [id]);

  return rows;
}
