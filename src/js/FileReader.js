function getFileContents(file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = function(evt) {
      resolve(evt.target.result);
    }
    reader.onerror = function(evt) {
      console.log(evt.target);
      reject(undefined);
    }
    reader.readAsText(file);
  });
}

export default getFileContents;
