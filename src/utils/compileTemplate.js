import fs from "fs";
import path from "path";
import handlebars from "handlebars";

handlebars.registerHelper("isNewCategory", function (index, list) {
  if (!list || index === 0) return true;

  return list[index].category !== list[index - 1].category;
});

export async function compileTemplate(templateName, data) {
  const filePath = path.join(
    process.cwd(),
    "src/templates",
    `${templateName}.hbs`,
  );

  const html = fs.readFileSync(filePath, "utf-8");

  const compiled = handlebars.compile(html);

  return compiled(data);
}
