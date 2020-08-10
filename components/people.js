import React from 'react';
import ReactDOM from 'react-dom'
import storeManager from '../redux/storeManager'
import Person from './person'
class People extends HTMLElement {
    constructor() { // Initialize state
        super();
        this._people = [];
        this.shadow = this.attachShadow({ mode: 'closed' }); // Encapsulation of elements and styles
    }

    static get observedAttributes() { // Observe state Changes
        return ['people'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) { // Handler of state with Timeline
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
    }
    
      render() {
        let peopleData= storeManager.getState('peopleReducer', 'componentPayload');
        const {id,children} = peopleData[0];
        const mountPoint = document.createElement('div');
        this.shadow.appendChild(mountPoint);
        ReactDOM.render(
        <div key={id}>{children.map((personInfo)=>(<person-card key={personInfo.id} person={JSON.stringify(personInfo)}/>))}</div>, mountPoint);
        
      }
}

customElements.define('people-info', People); // Register your Custom web component
export default People;