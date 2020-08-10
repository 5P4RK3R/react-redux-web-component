import React from 'react';
import ReactDOM from 'react-dom'
import storeManager from '../redux/storeManager'
import Person from './person'
class People extends HTMLElement {
    constructor() {
        super();
        this._people = [];
        this.shadow = this.attachShadow({ mode: 'closed' });
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

customElements.define('people-info', People);
export default People;