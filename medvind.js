// Stämpla in varje dag ffs

let wat = "wut";
// alert(wat);
console.log(wat);

document.getElementsByTagName('head')[0].appendChild(document.createElement('script')).src="https://code.jquery.com/jquery-3.3.1.min.js";

// const changeButton = window.$("span.x-btn-inner:contains('Ändra dag')");
// const saveButton = window.$("span.x-btn-inner:contains('Spara')");
// const addButton = window.$("span.x-btn-inner:contains('Lägg till)");

// const days = ['mån', 'tis', 'ons', 'tors', 'fre'];

function gowtf() {

  const days = ['mån'];
  const defaultWait = 2000;
  const delay = (num) => defaultWait + num * 1000
  days.map(async day => {
    const elems = $(`div.mv-dayheader:contains('${day}')`);

    for (let i = 0; i < elems.length; i++) {
      await new Promise(res => {

        const d = $(`div.mv-dayheader:contains('${day}')`);      
        d.click();
        // changeButton.click();
        setTimeout(() => {
          $("span.x-btn-inner:contains('Ändra dag')").click();
          setTimeout(() => {
            $("span.x-btn-inner:contains('Spara')").click();
            res();
          }, delay(1));
        }, delay(1));
        });
      location.reload();
    }
  });
}

window.gowtf = gowtf;