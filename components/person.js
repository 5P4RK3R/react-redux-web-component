import React from 'react';
import ReactDOM from 'react-dom'
import storeManager from '../redux/storeManager';
import {INCREMENT_SCORE} from '../redux/actions/types'
import {connect} from 'webcomponents-redux'
class Person extends HTMLElement {
    constructor() {
        super();
        this._person = {}
        this._personScore={}
       this.shadow = this.attachShadow({ mode: 'closed' });
    }

    static get observedAttributes() {
        return ['person','personScore'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
       
        switch(attrName){
            case 'personScore':
                this._personScore = newVal
                const person = this.getAttribute('person')
                let {id, properties:{ age,firstName,lastName,avatar}} = JSON.parse(person);
                this.shadow.innerHTML=`<div key=${id}>
                    <p>Name: ${firstName.value +' ' + lastName.value}</p>
                    <div className="row">
                    <p>Score: ${newVal[age.value].initialValue}</p>
                    <button id="increment"
                          aria-label="Increment Score" 
                        >
                          +
                        </button>
                    </div>
                    <img src=${avatar.value} alt=""/>
                </div>`
                break;
            
            default:
                break;
        }
    }

    get person(){
        return this.getAttribute('person');
    }
    set person(val){
        if (val) {
            this.setAttribute('person', val);
        } else {
            this.removeAttribute('person');
        }
    }
    get personScore(){
        return this.getAttribute('personScore');
    }
    set personScore(val){
        if (val) {
            this.setAttribute('personScore', val);
        } else {
            this.removeAttribute('personScore');
        }
    }
    
    connectedCallback(){
      
        let personInfo = storeManager.getState('peopleReducer','statePayload')
        const person = this.getAttribute('person')
        const mountPoint = document.createElement('div');
        this.shadow.appendChild(mountPoint);
        let {id, properties:{ age,firstName,lastName,avatar}} = JSON.parse(person);
        this.shadow.addEventListener('click', (e) => {
            if(e.target.id === 'increment') {
                this.increment(age.value)
            };
            return null;
            
        });
        this.shadow.innerHTML=`<div key=${id}>
                    <p>Name: ${firstName.value +' ' + lastName.value}</p>
                    <div className="row">
                    <p>Score: ${personInfo[age.value].initialValue}</p>
                    <button id="increment"
                          aria-label="Increment Score" 
                        >
                          +
                        </button>
                    </div>
                    <img src=${avatar.value} alt=""/>
                </div>`
            }
           
            mapStateToProps(oldState, newState) { // state is Initialized on connectedCallback and on other state changes
                    this.attributeChangedCallback('personScore', oldState?.peopleReducer?.statePayload, newState.peopleReducer.statePayload);    
            }
            
            
            mapDispatchToProps(dispatch) { // Dispatch an action to the store
                return {
                    increment: (value) => dispatch({ type: INCREMENT_SCORE,payload:value }),
                };
            }
}
connect(Person,storeManager.getStore()); // Connect the Web component and Redux Store
customElements.define('person-card', Person);
export default Person;