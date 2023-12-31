#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Check for the required arguments
if (process.argv.length !== 4) {
  console.log("Usage: <script> <manifest-path> <output-path>");
  process.exit(1);
}

// Extract paths from command-line arguments
const jsonFilePath = path.resolve(process.argv[2]);
const jsFilePath = path.resolve(process.argv[3]);

// Extract recs package version
const { dependencies } = require(path.resolve("./package.json"));
const recsVersion = dependencies?.["@latticexyz/recs"] ?? "";
const isRecsVersion2 = /^[\^\~]?2./g.exec(recsVersion) != null;
console.log(`...generating for @latticexyz/recs version ${isRecsVersion2 ? '2 (bigint support, Entity as string)' : '1 (no bigint, EntityIndex as number)'}`)
console.log('---------------------------')
console.log('WARNING: Currently does not generate custom types. You will have to manually add this.')

fs.readFile(jsonFilePath, "utf8", (err, jsonString) => {
  if (err) {
    console.log("Error reading file:", err);
    return;
  }

  try {
    const data = JSON.parse(jsonString);
    let fileContent = `/* Autogenerated file. Do not edit manually. */\n\n`;
    fileContent += `import { defineComponent, Type as RecsType, World } from "../../node_modules/@latticexyz/recs/src/index";\n\n`;
    fileContent += `export function defineContractComponents(world: World) {\n  return {\n`;

    data.models.forEach((model) => {
      let types = []
      const tableName = model.name;
      fileContent += `    ${tableName}: (() => {\n`;
      fileContent += `      const name = "${tableName}";\n`;
      fileContent += `      return defineComponent(\n        world,\n        {\n`;

      model.members.forEach((member) => {
        let memberType = "RecsType.Number";  // Default type set to Number
        types.push(member.type);
        if (
          member.type === "bool"
        ) {
          memberType = "RecsType.Boolean";
        } else if (member.type === "u256") {
          memberType = "RecsType.NumberArray";
        } else if (member.type === "ContractAddress") {
          memberType = "RecsType.String";
        }
        else if (
          ["u8", "u16", "u32", "usize", "u64", "u128", "u250", "felt252"].includes(member.type)
        ) {
          memberType = "RecsType.Number";
        }

        fileContent += `          ${member.name}: ${memberType},\n`;
      });

      fileContent += `        },\n        {\n`;
      fileContent += `          metadata: {\n`;
      fileContent += `            name: name,\n`;
      if (isRecsVersion2) {
        fileContent += `            types: ${JSON.stringify(types)},\n`;
      }
      fileContent += `          },\n        }\n      );\n    })(),\n`;
    });

    fileContent += `  };\n}\n`;

    fs.writeFile(jsFilePath, fileContent, (err) => {
      if (err) {
        console.log("Error writing file:", err);
      } else {
        console.log("File generated successfully");
      }
    });
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
});