class FloatingLabel {
    constructor(element) {
        this.element = element;
        const box = document.createElement("div");
        box.classList.add('master-field');
        let object = this;
        box.addEventListener("click", function () { object.setFocus(); });
        const label = document.createElement("label");
        label.classList.add('master-label');
        label.textContent = this.element.getAttribute('label');
        const input = document.createElement("input");
        input.classList.add('master-input');
        input.addEventListener("focus", function () { object.setFocus(); });
        input.addEventListener("blur", function () { object.setBlur(); });
        box.appendChild(label);
        box.appendChild(input);
        for (let attribute of this.element.attributes) { input.setAttribute(attribute.nodeName, attribute.nodeValue); }
        this.element.parentNode.insertBefore(box, this.element);
        this.box = box;
        this.label = label;
        this.input = input;
        this.element.remove();
        let style = document.createElement('style');
        let declarations = document.createTextNode(`
            .master-field {
                position: relative;
                display: block;
                width: 100%;
                height: 50px;
                border-bottom: 1px solid #ebebeb;
                cursor: text;
            }
            .master-field.not-empty:after {
                width: 100%;
            }
            .master-label {
                position: absolute;
                bottom: 4px;
                display: block;
                width: 98%;
                color: var(--secondary-color);
                font-size: 1rem;
                z-index: 3;
                transition: all .3s .1s;
                cursor: text;
            }
            .master-field.not-empty .master-label {
                bottom: 31px;
                font-size: .8rem;
                font-weight: 600;
                color: var(--secondary-color);
            }
            .master-label.danger-message {
                color: #f44336;
            }
            .master-input {
                position: absolute;
                bottom: 4px;
                display: block;
                width: 98%;
                outline: none;
                border: none;
                color: var(--text-color);
                font-size: 1rem;
                font-weight: normal;
                background-color: transparent;
                z-index: 2;
                transition: all .1s .1s;
                cursor: text;
            }
        `);
        style.setAttribute('type', 'text/css');
        if (style.styleSheet) style.styleSheet.cssText = declarations.nodeValue;
        else style.appendChild(declarations);
        box.appendChild(style);
    }

    setFocus() {
        this.input.focus();
        this.box.classList.add("not-empty");
    }

    setBlur() {
        if (this.input.value == "") this.box.classList.remove("not-empty");
        this.label.innerHTML = this.element.getAttribute('label');
        this.label.classList.remove("danger-message");
    }

    showMessage(message) {
        this.label.classList.add("danger-message");
        this.label.innerHTML = `
        <svg style="position: relative; width: 1em; top: 1px; fill: var(--secondary-color);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32z"/>
        </svg>
        &nbsp;${message}`;
    }

    getVal() {
        return this.input.value;
    }

    setVal(value) {
        this.input.value = value;
        if (this.input.value == "") this.setBlur();
    }
}