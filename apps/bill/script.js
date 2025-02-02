let text_input;
const regex = /^(\d+\.\d+),\[(.*?)\];$/;
var rent_input;

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

function handleRentCalculateEvent() {
  const inputText = rent_input.value;
  // console.log(inputText)
  // Validate input format using regex
  const regex = /^(\d+(\.\d+)?),\[(\d+(\.\d+)?(,\d+(\.\d+)?)*)\];$/;
  const match = inputText.match(regex);

  if (!match) {
    document.getElementById("rent_bill").innerHTML = "Invalid input format. Use: x,[part1,part2,...]";
    return;
  }

  // Extract x and parts array
  const x = parseFloat(match[1]);
  const parts = match[3].split(",").map(Number); // Convert to an array of numbers
  // console.log(x)
  /// console.log(parts)
  // Compute total allocated and remaining amount
  const totalAllocated = parts.reduce((sum, part) => sum + part, 0);
  const remaining = x - totalAllocated;
  const perPartShare = remaining / parts.length;

  // Adjust each part
  const adjustedParts = parts.map((part) => part + perPartShare);

  // Generate output
  let resultHTML = `<strong>Initial Parts:</strong> ${parts.join(", ")}<br>`;
  resultHTML += `<strong>Total Allocated:</strong> ${totalAllocated.toFixed(2)}<br>`;
  resultHTML += `<strong>Remaining Amount:</strong> ${remaining.toFixed(2)}<br>`;
  resultHTML += `<strong>Final Adjusted Parts:</strong> ${adjustedParts.map((p) => p.toFixed(2)).join(", ")}<br>`;

  document.getElementById("rent_bill").innerHTML = resultHTML;
}

function main() {
  text_input = document.querySelector("textarea");
  bill_calc = document.getElementById("bill_calc_button");
  bill_calc.addEventListener("click", handleCalculateEvent);

  rent_input = document.getElementById("rent_bill_textarea");
  rent_bill_calc = document.getElementById("rent_bill_calc_button");
  rent_bill_calc.addEventListener("click", handleRentCalculateEvent);
}
