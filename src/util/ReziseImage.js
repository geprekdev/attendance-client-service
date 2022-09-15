import Resizer from "react-image-file-resizer";

export default function resizer(file) {
  return new Promise(resolve => {
    Resizer.imageFileResizer(file, 300, 300, "JPEG", 100, 0, uri => {
      resolve(uri);
    });
  });
}

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}
