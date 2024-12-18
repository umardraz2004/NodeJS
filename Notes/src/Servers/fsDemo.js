// import fs from 'fs';
import fs from "fs/promises";

// readFile() - callback
// fs.readFile('src/utils/Data.json' , 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(JSON.parse(data));
// })

// readFileSync() - Synchronous version
// const data = fs.readFileSync('src/utils/Data.json', 'utf8');
// console.log(JSON.parse(data));

// readFile() - Promise version .then()
// fs.readFile('src/utils/Data.json' , 'utf8')
//   .then(data => console.log(JSON.parse(data)))
//   .catch(err => console.error(err));

// readFile() - async/await version
const fileData = async () => {
  try {
    const data = await fs.readFile("src/utils/Data.json", "utf8");
    console.log(JSON.parse(data));
  } catch (err) {
    console.error(err);
  }
};

const writtenData = async () => {
    try {
        const data = JSON.stringify({ name: "Jane Doe", age: 30 });
        await fs.writeFile("src/utils/newData.json", data);
        console.log("Data written successfully!");
    } catch (err) {
        console.error(err);
    }
}

let newData = { name: "Jim Doe", age: 30 };

const appendData = async () => {
    try {
        const data = await fs.readFile("src/utils/Data.json", "utf8");
        const jsonData = JSON.parse(data);
        jsonData.push(newData);
        console.log(jsonData);
        // await fs.appendFile("src/utils/newData.json", `${JSON.stringify(newData)}`)
        await fs.writeFile("src/utils/newData.json", JSON.stringify(jsonData));
        console.log("Data appended successfully!");
    } catch (err) {
        console.error(err);
    }
}

appendData();
// writtenData();
// fileData();