function getFileContents(file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = function(evt) {
      resolve(evt.target.result);
    }
    reader.onerror = function(evt) {
      reject(new Error(reader.error));
    }
    reader.readAsText(file);
  });
}

export default getFileContents;
