// series 25 minifigures

const figtable = [
  ["Dwarf Barbarian", 6502839, 6506740],
  ["Gith Warlock", 6502842, 6506743],
  ["Tiefling Sorcerer", 6502836, 6506737],
  ["Dragonborn Paladin", 6502840, 6506741],
  ["Halfling Druid", 6502838, 6506753],
  ["Aarakocra Ranger", 6502841, 6506742],
  ["Mind Flayer", 6502843, 6506744],
  ["Strahd von Zarovich", 6502845, 6506746],
  ["Elf Bard", 6502837, 6506738],
  ["The Lady of Pain", 6502844, 6506745],
  ["Szass Tam", 6502847, 6506748],
  ["Tasha the Witch Queen", 6502846, 6506747],
];

document.getElementById("fig-table").innerHTML += `
    <tr>
        <th>Minifigure</th>
        <th>Europe</th>
        <th>North America</th>
        <th>Denmark</th>
        <th>Image</th>
    </tr>
    `;

// add all the data to the table
for (var key in figtable) {
  document.getElementById("fig-table").innerHTML += `
        <tr>
            <td>${key}</td>
            <td>${figtable[key][0]}</td>
            <td>${figtable[key][1]}</td>
            <td>${figtable[key][2]}</td>
            <td><img src="${figtable[key][3]}" style="width: 100px; height: auto;"></td>
        </tr>
        `;
}

const scanner = new Html5QrcodeScanner("reader", {
  // Scanner will be initialized in DOM inside element with id of 'reader'
  qrbox: {
    width: 250,
    height: 250,
  }, // Sets dimensions of scanning box (set relative to reader element width)
  fps: 20, // Frames per second to attempt a scan
});

scanner.render(success, error);
// Starts scanner

const info_btn = document.getElementById("show-table");
// Gets info button element

info_btn.addEventListener("click", function () {
  // Adds event listener to info button
  // set display to block if it is none and none if it is block
  if (document.getElementById("fig-table").style.display == "none") {
    document.getElementById("fig-table").style.display = "block";
  } else {
    document.getElementById("fig-table").style.display = "none";
  }
});

// Add touchstart event for touch devices
info_btn.addEventListener("touchstart", function (event) {
  // Prevent the default touch behavior, which may interfere with your click event
  event.preventDefault();

  // Trigger the click event manually
  info_btn.click();
});

function success(result) {
  scanner.clear();
  // Clears scanning instance

  document.getElementById("reader").remove();
  // Removes reader element from DOM since no longer needed

  //6502847 334S4 14591473 039968
  const code = result.split(" ").shift();
  // find code in any of the arrays in figtable array

  const figIndex = figtable.findIndex((fig) =>
    fig.includes(parseInt(code, 10))
  );
  const fig = figtable[figIndex];
  const output = `${code}\t${fig[0]}`;
  console.log(output);
  // navigator.clipboard.writeText(output);

  // get the selection from the select drop down menu
  document.getElementById("result").innerHTML += `
      <p>${output}</p>
      <img src=images/figs/${
        figIndex + 1
      }.png style="height: 200px; width: auto;">
      <button id="copy-button" style="font-size: 20px; padding: 10px 20px;">
        Copy to Clipboard and Scan Another
      </button>
  `;

  document.getElementById("copy-button").addEventListener("click", () => {
    navigator.clipboard
      .writeText(output)
      .then(() => {
        console.log("Data copied to clipboard");
        window.location.href = "index.html";
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  });
}

// Function to retrieve the string based on the selected number

function error(err) {
  // console.error(err);
  // Prints any errors to the console
}
