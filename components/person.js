import React from 'react';
import ReactDOM from 'react-dom'
import {increment} from '../redux/actions/peopleActions'
import storeManager from '../redux/storeManager';
import {INCREMENT_SCORE,FETCH_PEOPLE,FETCH_PERSON,} from '../redux/actions/types'
import {connect} from 'webcomponents-redux'
import store from '../redux/store'
class Person extends HTMLElement {
    constructor() {
        super();
        this._person = {}
        this.initialRender = true;
        
       this.shadow = this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['person'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
       
        switch(attrName){
            case 'person':
                this._person = newVal
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
    
    connectedCallback(){
        if(this.initialRender){
            this.render();
        }
            
            // storeManager.subscribe(this.render.bind(this))
            }
           
            render(){
                
                const personInfo = storeManager.getState('peopleReducer','statePayload')
                const person = this.getAttribute('person')
                // console.log(JSON.parse(person))
                const mountPoint = document.createElement('div');
                this.shadow.appendChild(mountPoint);
        
                let {id, properties:{ age,firstName,lastName,avatar}} = JSON.parse(person);
                // this.addEventListener('click', () => increment(age.value));
                this.shadow.addEventListener('click', (e) => {
                    console.log(e.target.id)
                    if(e.target.id === 'increment') {
                        storeManager.dispatch({type:INCREMENT_SCORE,payload:age.value})
                        this.initialRender = false;
                    //  this.shadow.removeChild(this.shadow)
                        // this.shadow.
                    };
                    return null;
                    
                });
                
                
                // ReactDOM.render(<div key={id}>
                //         <p>Name: {firstName.value +' ' + lastName.value}</p>
                //         <div className="row">
                //         <p>Score: {personInfo[age.value].initialValue}</p>
                //         <button id="increment"
                //               aria-label="Increment Score" 
                //             >
                //               +
                //             </button>
                //         </div>
                //         <img src={avatar.value} alt=""/>
                //     </div>
                //             , mountPoint);
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
}
connect(Person,storeManager.getStore())
customElements.define('person-card', Person);
export default Person;