import React, {Component, createContext} from 'react';
import ReactDOM from 'react-dom';
import {menuContextStates, MenuProvider, MenuConsumer, withMenuContext, withMenuPropTypes} from '../menu'



describe('Contexts - Menu', () => {
  it("exports a states object with checked and unchecked values", () => {
    expect(Object.keys(menuContextStates)).toEqual(['checked', 'unchecked'])
    expect(menuContextStates.checked).toBe(true)
    expect(menuContextStates.unchecked).toBe(false)
  })

  it('exports a provider and a consumer', () => {
    expect(MenuProvider['$$typeof']).toBe(createContext().Provider['$$typeof'])
    expect(MenuProvider['$$typeof']).toBeTruthy()
    expect(MenuConsumer['$$typeof']).toBe(createContext().Consumer['$$typeof'])
    expect(MenuConsumer['$$typeof']).toBeTruthy()
  })

  it('exports a HOC', () => {
    @withMenuContext
    class AssertHasContext extends Component {
      constructor(props){
        super(props)
        expect(props.checked).toBe(true)
      }
      render(){
        return 'TEST'
      }
    }

    class AssertHasNoContext extends Component {
      constructor(props){
        super(props)
        expect(props.checked).toBe(undefined)
      }
      render(){
        return 'TEST'
      }
    }

    const div = document.createElement('div')
    ReactDOM.render((
      <MenuProvider value={{checked: true}}>
        <AssertHasContext />
        <AssertHasNoContext />
      </MenuProvider>
    ), div);
  })
})
