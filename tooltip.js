class Tooltip extends HTMLElement 
{
    constructor(){
        super();
        console.log("My First ToolTip!");
        this._tooltipContainer;
        this._tooltipIcon;
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
                .highlight{
                    background-color: red;
                }
                ::slotted(.highlight){
                    border: 1px solid red;
                }
                .icon{
                    background:black;
                    color:white;
                    padding: 0.15rem o,5rem;
                    text-align: center;
                    border-radius: 50%;
                }
                :host(.imp){
                    background: #ccc;
                }
            </style>
            <slot> default text</slot>
            <span class="icon"> (?) </span>
            `;
    }
    connectedCallback() {
        if (this.hasAttribute('tooltipData')) {
            this._tooltipText = this.getAttribute('tooltipData');
        }   
        this._tooltipIcon =  this.shadowRoot.querySelector('span');
        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        // this.shadowRoot.appendChild(tooltipIcon);
        this.style.position = 'relative';
    }

    disconnectedCallback(){
        this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
        this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
        console.log('Disconnected');
    }

    attributeChangedCallback(name, oldName, newName) {
        console.log(name, oldName, newName);
        if(oldName === newName){
            return;
        }
        if(name === "tooltipdata"){
            this._tooltipText = newName;
        }
    }

    static get observedAttributes() {
        return ['tooltipdata'];
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