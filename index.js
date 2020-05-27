const _ = (name, element = document) => element.querySelector(name)
const __ = (name) => document.querySelectorAll(name)
const data = {
	in:   () => _(`textarea#in`),
    out:  () => _(`div.output`),
    // template
    tmpl: () => _(`input#tmpl`),
    options: {
        start: () => _("input#start").value,
        step: () => _("input#step").value,
        gap: () => _("input#gap").value,
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

_("button.run").addEventListener("click", run);

__("div.numberInput").forEach(e => {
    let inpt = _(`input`, e)
    console.log(inpt)
    _("button.up", e).addEventListener("click", () => inpt.value++)
    _("button.down", e).addEventListener("click", () => inpt.value--)
})