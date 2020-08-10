import React from 'react';
import ReactDOM from 'react-dom'
// import {increment} from '../redux/actions/peopleActions'
import storeManager from '../redux/storeManager';
import {INCREMENT_SCORE,FETCH_PEOPLE,FETCH_PERSON,} from '../redux/actions/types'
import {connect} from 'webcomponents-redux'
import store from '../redux/store'
class Person extends HTMLElement {
    constructor() {
        super();
        this._person = {}
        this._personScore={}
       this.shadow = this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['person','personScore'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
       
        switch(attrName){
            case 'personScore':
                this._personScore = newVal
                console.log(newVal)
                const person = this.getAttribute('person')
                let {id, properties:{ age,firstName,lastName,avatar}} = JSON.parse(person);
                // this.setAttribute('personScore', newVal);
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
                // this.render(newVal)
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
        console.log(this.getAttribute('personScore'))
        // console.log(JSON.parse(this._person))
        const person = this.getAttribute('person')
        // console.log(JSON.parse(person))
        const mountPoint = document.createElement('div');
        this.shadow.appendChild(mountPoint);

        let {id, properties:{ age,firstName,lastName,avatar}} = JSON.parse(person);
        console.log(personInfo[age.value])
        // this.addEventListener('click', () => increment(age.value));
        this.shadow.addEventListener('click', (e) => {
            console.log(e.target.id)
            if(e.target.id === 'increment') {
                // storeManager.dispatch({type:INCREMENT_SCORE,payload:age.value})
                this.increment(age.value)
                // personInfo = storeManager.getState('peopleReducer','statePayload')
            //    this.render()
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
           
            mapStateToProps(oldState, newState) {
            
               
                    this.attributeChangedCallback('personScore', oldState?.peopleReducer?.statePayload, newState.peopleReducer.statePayload);
                
            }
            
            
            mapDispatchToProps(dispatch) {
                return {
                    increment: (value) => dispatch({ type: INCREMENT_SCORE,payload:value }),
                };
            }
}

// const mapStateToProps = state => {
//     return {
//       people: state.people.componentPayload
//     };
//   };

  
connect(Person,storeManager.getStore())
customElements.define('person-card', Person);
export default Person;