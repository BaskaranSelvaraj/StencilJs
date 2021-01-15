class hyperLink extends HTMLAnchorElement{
    connectedCallback(){
        this.addEventListener('click', event => {
            if (!confirm('Do you really want to leave?')) {
                event.preventDefault();
            }
        });
    }
}

customElements.define('mri-hyper-link', hyperLink, { extends : 'a' });