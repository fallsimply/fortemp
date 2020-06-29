const $ = (name, element = document) => element.querySelector(name)
const $$ = (name) => document.querySelectorAll(name)
const data = {
	in:   () => $(`textarea#in`),
    out:  () => $(`div.output`),
    // template
    tmpl: () => $(`input#tmpl`),
    options: {
        start: () => $("input#start").value,
        step: () => $("input#step").value,
        gap: () => $("input#gap").value,
    }
}

data.tmpl().value = "(${i}) ${val}\\n";

function run() {
	let arr = data.in().value.split(/,\s?/);
    let str = "";
    let tmpFunc = new Function("i", "val",  `return \`${data.tmpl().value}\``)
	arr.forEach((val, i) => {
		str += tmpFunc(
            (i * +data.options.step()) + +data.options.start(), 
            val
        );
	});
	data.out().insertAdjacentHTML("beforeend", `<pre>${str}</pre>${`<div style="height: ${data.options.gap()}em; width: 100%"></div>`}`);
}

$("button.run").addEventListener("click", run);

$$("div.numberInput").forEach(e => {
    let inpt = $("input", e)
    console.log(inpt)
    $("button.up", e).addEventListener("click", () => inpt.value++)
    $("button.down", e).addEventListener("click", () =>  (inpt.value - 1 > 0) ? inpt.value-- : inpt.value = 0)
})