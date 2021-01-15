class Tooltip extends HTMLElement 
{
    constructor(){
        super();
        console.log("My First ToolTip!");
        this._tooltipContainer;
        this._tooltipText = "Teting tooltip text";
        this.attachShadow({mode: 'open'})
        // const template = document.querySelector('#tooltip-template');
        // this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.innerHTML= `
            <style>
                div {
                    background-color: green;
                    color: white;
                    position: absolute;
                    zIndex: 10;
                }
            </style>
            <slot> default text</slot>
            <span>(?)</span>
            `;
    }
    connectedCallback() {
        if (this.hasAttribute('tooltipData')) {
            this._tooltipText = this.getAttribute('tooltipData');
        }   
        const tooltipIcon =  this.shadowRoot.querySelector('span');
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        this.shadowRoot.appendChild(tooltipIcon);
        this.style.position = 'relative';
    }

    _showTooltip() {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        // this._tooltipContainer.style.backgroundColor='green';
        // this._tooltipContainer.style.color='white';
        // this._tooltipContainer.style.position = 'absolute';
        // this._tooltipContainer.style.zIndex = '10';
        this.shadowRoot.appendChild(this._tooltipContainer);
    }
    _hideTooltip(){
        this.shadowRoot.removeChild(this._tooltipContainer);
    }
}
customElements.define("mri-tooltip", Tooltip);