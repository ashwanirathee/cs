let text_input;
const regex = /^(\d+\.\d+),\[(.*?)\];$/;

function handleCalculateEvent() {
  console.log("Calculation Started");
  // console.log(text_input.value);
  var text = text_input.value;
  // Split the text into lines
  const lines = text.split("\n");

  // Process each line
  let result = "";
  lines.forEach((line, index) => {
    result += `Line ${index + 1}: ${line}\n`;
  });
  var total = 0.0;
  var ash_share = 0.0;
  var chi_share = 0.0;
  var shu_share = 0.0;
  var jam_share = 0.0;
  var ved_share = 0.0;
  var soham_share = 0.0;

  const types = new Map();
  // Adding integer keys and variable values
  types.set(1, ash_share);
  types.set(2, chi_share);
  types.set(3, shu_share);
  types.set(4, jam_share);
  types.set(5, ved_share);
  types.set(6, soham_share);

  lines.forEach((line) => {
    const match = line.match(regex);
    if (match) {
      const number = parseFloat(match[1]); // The decimal number
      const array = match[2].split(",").map(Number); // The array of numbers
      console.log(`Number: ${number}, Array: ${array}`);
      console.log(`Each share: ${number / array.length}`);
      total = total + number;
      array.forEach((i) => {
        console.log(i);
        const currentValue = types.get(i) || 0; // Get the current value or default to 0
        console.log(types.get(i));
        types.set(i, currentValue + number / array.length);
      });
    } else {
      console.log(`Invalid line: ${line}`);
    }
  });

  // Retrieve final values from the Map
  ash_share = types.get(1) || 0;
  chi_share = types.get(2) || 0;
  shu_share = types.get(3) || 0;
  jam_share = types.get(4) || 0;
  ved_share = types.get(5) || 0;
  soham_share = types.get(6) || 0;

  // Construct the result string
  result = "";
  result += `total = ${total};\n`;
  result += `ash_share = ${ash_share};\n`;
  result += `chi_share = ${chi_share};\n`;
  result += `shu_share = ${shu_share};\n`;
  result += `jam_share = ${jam_share};\n`;
  result += `ved_share = ${ved_share};\n`;
  result += `soham_share = ${soham_share};\n`;
  // Display the processed output
  document.getElementById("output").textContent = result;
}

function main() {
  text_input = document.querySelector("textarea");
  bill_calc = document.getElementById("bill_calc_button");
  bill_calc.addEventListener("click", handleCalculateEvent);
}
