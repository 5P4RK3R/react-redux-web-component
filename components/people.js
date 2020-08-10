import React from 'react';
import ReactDOM from 'react-dom'
import storeManager from '../redux/storeManager'
import Person from './person'
// // class People extends React.Component{
// //     constructor(){
// //         super();
// //         this.shadow = this.createShadowRoot(); // creates a seperate dom from the main document and styling
// //         this._people ={};
// //     }

// //     get people() {
// //         return this._people;
// //     }
// //     set people(val) {
// //         this.setAttribute('people',val);
// //     }
// //     static observedAttributes() {
// //         return ['people'];
// //     }

// //     attributeChangedCallback(name,oldValue,newValue) {
// //         switch(name){
// //             case 'people':
// //                 this._people =newValue || {};
// //                 break;
// //             default:
// //                 break;
// //         }

// //     }

// //     connectedCallback(){
// //         const {children,id} = this._people;
// //         var template = `
// //         <div key=${id}>
// //         Hellow 
// //              ${children.map((personInfo)=>(<person-card person={personInfo}/>))}</div>`

// //              ReactDOM.render(<div key=${id}>
            
// //                      ${children.map((personInfo)=>(<person-card person={personInfo}/>))}</div>)
// //                 //this.shadow.innerHTML = template;
// //     }
// // }
// // export const PeopleInfo = reactToWebComponent(People,React,ReactDOM);
// // window.customElements.define('people-info',PeopleInfo,React,ReactDOM);



// class People extends HTMLElement{
//     constructor(){
//         super();
//         this.shadowRoot = this.createShadowRoot(); // creates a seperate dom from the main document and styling
//         this._people ={};
//     }

//     get people() {
//         return this._people;
//     }
//     set people(val) {
//         this.setAttribute('people',val);
//     }
//     static observedAttributes() {
//         return ['people'];
//     }

//     attributeChangedCallback(name,oldValue,newValue) {
//         switch(name){
//             case 'people':
//                 this._people =newValue || {};
//                 break;
//             default:
//                 break;
//         }

//     }

//     connectedCallback(){
//         const {children,id} = this._people;
//         var template = `
//         <div key=${id}>
//              ${children.map((personInfo)=>(<person-card person={personInfo}/>))}</div>`
//              ReactDOM.render(template,this.shadowRoot)
//                 this.shadow.innerHTML = template;
//     }
// }
// customElements.define('people-info',PeopleInfo);

// import buildShadowRoot from './buildShadowRoot.js';

class People extends HTMLElement {
    constructor() {
        super();
        this._people = [];
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['people'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        switch(attrName){
            case 'people':
                this._people = newVal
                break;
            default:
                break;
        }
    }

    get people(){
        return this.getAttribute('people');
    }
    set people(val){
        if (val) {
            this.setAttribute('people', val);
        } else {
            this.removeAttribute('people');
        }
    }
      connectedCallback() {
        this.render();
        // storeManager.subscribe(this.render.bind(this))
      }
    
      render() {
        let peopleData= storeManager.getState('peopleReducer', 'componentPayload');
        const {id,children} = peopleData[0]
        const mountPoint = document.createElement('div');
        this.shadow.appendChild(mountPoint);
        
   
    
    ReactDOM.render(<div key={id}>
                     {children.map((personInfo)=>(<person-card key={personInfo.id} person={JSON.stringify(personInfo)}/>))}</div>, mountPoint);
        
      }
}

customElements.define('people-info', People);
export default People;