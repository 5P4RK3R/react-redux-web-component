// //import buildShadowRoot from './buildShadowRoot.js';
// import People from './components/people'
// import Person from './components/person'
// import storeManager from './redux/storeManager'
// import React from 'react'
// import ReactDOM from 'react-dom'
// class Main extends HTMLElement {
//     constructor() {
//         super();
//         //this.shadow = this.createShadowRoot();
//         // const html = `
//         //     <style>
//         //         :host {
//         //         }
//         //     </style>
//         //     <slot></slot>
//         // `;
//         // buildShadowRoot(html,this);
//         // this.elems = {
//         //     elem: this.shadowRoot.querySelector('selector')
//         // };
//     }

//     // static get observedAttributes() {
//     //     return ['sampleAttr'];
//     // }

//     // attributeChangedCallback(attrName, oldVal, newVal) {
//     //     switch(attrName){
//     //         case 'sampleAttr':
//     //             this.elems.elem.setAttribute('sampleAttr',newVal);
//     //             break;
//     //         default:
//     //             break;
//     //     }
//     // }

//     // get sampleAttr(){
//     //     return this.getAttribute('sampleAttr');
//     // }
//     // set sampleAttr(val){
//     //     if (val) {
//     //         this.setAttribute('sampleAttr', val);
//     //     } else {
//     //         this.removeAttribute('sampleAttr');
//     //     }
//     // }
//     connectedCallback() {
//         this.render();
//     }
    
//     render() {
//         let peopleData= storeManager.getState('peopleReducer', 'componentPayload');
//         const {id,children} = peopleData[0]
//         console.log(children)
//         const mountPoint = document.createElement('div');
//         this.attachShadow({ mode: 'open' }).appendChild(mountPoint);
//         ReactDOM.render(<div key={id}><people-info  people={JSON.stringify(children)} /></div>, mountPoint);
//     }
// }

// customElements.define('main-element', Main);
// export default Main;