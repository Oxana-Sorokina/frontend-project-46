const parseFile = (file, format) => {
    if(format === 'json') {
        return JSON.parse(file);
    } else {
        console.log("Другой формат");
    }
};

export default parseFile;