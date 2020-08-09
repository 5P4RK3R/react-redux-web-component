import React from 'react';
import ReactDOM from 'react-dom'
import {increment} from '../redux/actions/peopleActions'
import storeManager from '../redux/storeManager';
import {INCREMENT_SCORE,FETCH_PEOPLE,FETCH_PERSON,} from '../redux/actions/types'
import store from '../redux/store'
class Person extends HTMLElement {
    constructor() {
        super();
        this._person = {}
        this._parent = {}
        
       this.shadow = this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['person','parent'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
       
        switch(attrName){
            case 'person':
                this._person = newVal
                break;
            case 'parent':
                this._parent = newVal
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
    get parent(){
        return this.getAttribute('parent');
    }
    set parent(val){
        if (val) {
            this.setAttribute('parent', val);
        } else {
            this.removeAttribute('parent');
        }
    }
    connectedCallback(){
            this.render();
            
            storeManager.subscribe(this.render.bind(this))
            }
           
            render(){
                
                const personInfo = storeManager.getState('peopleReducer','statePayload')
                // console.log(personInfo)
                // const parent = JSON.parse(this.getAttribute('parent'))
                // const parent = JSON.parse(this.getAttribute('parent'))
                // this._person =personInfo
                // console.log(this._person)
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
                        // const parent = JSON.parse(this.getAttribute('parent'))
                       
                        // parent.removeChild(parent)
                    //  this.shadow.removeChild(this.shadow)
                        // this.shadow.
                    };
                    return null;
                    
                    // storeManager.dispatch({type:FETCH_PERSON})
                });
                
                
                ReactDOM.render(<div key={id}>
                        <p>Name: {firstName.value +' ' + lastName.value}</p>
                        <div className="row">
                        <p>Score: {personInfo[age.value].initialValue}</p>
                        <button id="increment"
                              aria-label="Increment Score" 
                            //   onClick={(e)=>console.log(e)}
                            //   onClick={(e)=> storeManager.dispatch({type:INCREMENT_SCORE,payload:age.value})}
                            >
                              +
                            </button>
                        </div>
                        <img src={avatar.value} alt=""/>
                    </div>
                            , mountPoint);
                            // this.retargetEvents()
            }
            retargetEvents() {
                let events = ["onClick", "onContextMenu", "onDoubleClick", "onDrag", "onDragEnd", 
                  "onDragEnter", "onDragExit", "onDragLeave", "onDragOver", "onDragStart", "onDrop", 
                  "onMouseDown", "onMouseEnter", "onMouseLeave","onMouseMove", "onMouseOut", 
                  "onMouseOver", "onMouseUp"];
            
                function dispatchEvent(event, eventType, itemProps) {
                  if (itemProps[eventType]) {
                    itemProps[eventType](event);
                  } else if (itemProps.children && itemProps.children.forEach) {
                    itemProps.children.forEach(child => {
                      child.props && dispatchEvent(event, eventType, child.props);
                    })
                  }
                }
            
                // Compatible with v0.14 & 15
                function findReactInternal(item) {
                  let instance;
                  for (let key in item) {
                    if (item.hasOwnProperty(key) && ~key.indexOf('_reactInternal')) {
                      instance = item[key];
                      break;
                    } 
                  }
                  return instance;
                }
            
                events.forEach(eventType => {
                  let transformedEventType = eventType.replace(/^on/, '').toLowerCase();
            
                  this.shadow.addEventListener(transformedEventType, event => {
                    for (let i in event.path) {
                      let item = event.path[i];
            
                      let internalComponent = findReactInternal(item);
                      if (internalComponent
                          && internalComponent._currentElement 
                          && internalComponent._currentElement.props
                      ) {
                        dispatchEvent(event, eventType, internalComponent._currentElement.props);
                      }
            
                      if (item == this.shadow) break;
                    }
            
                  });
                });
              }
}

customElements.define('person-card', Person);
export default Person;