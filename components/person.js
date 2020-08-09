import React from 'react';
import ReactDOM from 'react-dom'
import {increment} from '../redux/actions/peopleActions'
import storeManager from '../redux/storeManager';
import {INCREMENT_SCORE,FETCH_PEOPLE,FETCH_PERSON,} from '../redux/actions/types'

class Person extends HTMLElement {
    constructor() {
        super();
        this._person = {}
        storeManager.subscribe(this.render.bind(this))
       // this.shadow = this.createShadowRoot();
    }

    static get observedAttributes() {
        return ['person','increment'];
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
            this.render();
            
                
            }
           
            render(){
                // console.log(this)
                const personInfo = storeManager.getState('peopleReducer','statePayload')
                const person = this.getAttribute('person')
                //console.log(JSON.parse(person))
                const mountPoint = document.createElement('div');
                this.attachShadow({ mode: 'closed' }).appendChild(mountPoint);
        
                const {id, properties:{ age,firstName,lastName,avatar}} = JSON.parse(person);
                // this.addEventListener('click', () => increment(age.value));
                this.addEventListener('click', () => {
                    storeManager.dispatch({type:INCREMENT_SCORE,payload:age.value});
                    storeManager.dispatch({type:FETCH_PERSON})
                });
                // (document.onreadystatechange = () => {
                //     if (document.readyState === "complete") {
              
                //         ReactDOM.render(<div key={id}>
                //             <p>Name: {firstName.value +' ' + lastName.value}</p>
                //             <p>Score: {personInfo[age.value].initialValue}</p>
                //             <button
                //                   aria-label="Increment Score"
                //                   onClick={() => console.log("open")}
                //                 //   onClick={() => {storeManager.dispatch(INCREMENT_SCORE,age.value);console.log('this')}}
                //                 >
                //                   +
                //                 </button>
                //             <img src={avatar.value} alt=""/>
                //         </div>
                //                 , mountPoint);
                //                 this.retargetEvents()
                //     }
                //   })();
                // this.addEventListener('click',(e)=>{
                //     console.log(e)
                    
                //     mountPoint.dispatchEvent(new CustomEvent('incrementScore', {
                //         bubbles: true,
                //         composed: true,
                //         detail: "increment"
                //       }));
                // })
                // mountPoint.getElementById('increment').onClick = function(){
                //     prompt('Hello world');
                // }
                
                ReactDOM.render(<div key={id}>
                        <p>Name: {firstName.value +' ' + lastName.value}</p>
                        <div className="row">
                        <p>Score: {personInfo[age.value].initialValue}</p>
                        <button id="increment"
                              aria-label="Increment Score"
                            >
                              +
                            </button>
                        </div>
                        <img src={avatar.value} alt=""/>
                    </div>
                            , mountPoint);
                            //this.retargetEvents()
            }
}

customElements.define('person-card', Person);
export default Person;