const fs = require('fs');

const deleteFile = (filePath) => {
  try {
    fs.unlinkSync(filePath);
    console.log(`File ${filePath} has been deleted.`);
  } catch (error) {
    console.error(`It was an error during deleting file ${filePath}:`, error);
  }
};

module.exports = deleteFile;