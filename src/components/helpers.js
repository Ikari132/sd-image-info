import Compressor from "compressorjs";

const extensions = {
  txt: "text/plain",
  json: "text/json",
};

export function saveFile(content, name, ext) {
  const file = new Blob([content], { type: extensions[ext] });

  const linkEl = document.createElement("a");
  linkEl.href = URL.createObjectURL(file);

  linkEl.download = `${name || "prompt"}.${ext}`;

  linkEl.click();
  URL.revokeObjectURL(linkEl.href);
}

export function saveImage(blob, filename) {
  const imageURL = URL.createObjectURL(blob);

  const linkEl = document.createElement("a");
  linkEl.download = filename;
  linkEl.href = imageURL;
  linkEl.click();
  URL.revokeObjectURL(imageURL);
}
export async function removeExif(file, options = {}) {
  return new Promise((res, rej) => {
    new Compressor(file, {
      quality: 1,
      strict: false,
      retainExif: false,
      ...options,
      success(result) {
        res(result);
      },
      error(err) {
        rej(err);
      },
    });
  });
}
export function removeExifCanvas(file) {
  const reader = new FileReader();
  const ext = file.name.split(".").pop();
  reader.onload = function (e) {
    const originalImageURL = e.target.result;

    // Create a new Image element
    const img = new Image();
    img.src = originalImageURL;

    img.onload = function () {
      // Create a canvas element to manipulate the image
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { alpha: false });

      // Set the canvas dimensions to match the image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image onto the canvas to remove metadata
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Convert the canvas back to a Blob with no metadata
      canvas.toBlob(function (blob) {
        // Create a new URL for the cleaned image
        const cleanedImageURL = URL.createObjectURL(blob);

        // Display the cleaned image
        const result = document.createElement("a");
        result.download = "free" + file.name;
        result.href = cleanedImageURL;
        result.click();

      }, `image/${ext}`);

      // Clean up the original image URL
      URL.revokeObjectURL(originalImageURL);
    };
  };

  // Read the image file as a data URL
  reader.readAsDataURL(file);
}
export function getFileName(fullname) {
  return fullname.split(".").slice(0, -1).join(".");
}
