const extensions = {
  txt: "text/plain",
  json: "text/json",
};

export function saveFile(content, name, ext) {
  const file = new Blob([content], { type: extensions[ext] });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);

  link.download = `${name || "prompt"}.${ext}`;

  link.click();
  URL.revokeObjectURL(link.href);
}

export function getFileName(fullname) {
  return fullname.split(".").slice(0, -1).join(".");
}
