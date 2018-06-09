import React, {Component, createContext} from 'react';
import {func, bool} from 'prop-types'
import ReactDOM from 'react-dom';
import {default as MenuContext, menuContextStates, MenuProvider, MenuConsumer, withMenuContext, withMenuPropTypes} from '../menu'



describe('Contexts - Menu', () => {
  it("exports a states object with checked and unchecked values", () => {
    expect(Object.keys(menuContextStates)).toEqual(['checked', 'unchecked'])
    expect(menuContextStates.checked).toBe(true)
    expect(menuContextStates.unchecked).toBe(false)
  })

  it("defaults to an object with functions to manage context", () => {
    const div = document.createElement('div')
    ReactDOM.render((
      <MenuConsumer>
        {
          menuProps => {
            expect(Object.keys(menuProps)).toEqual(['menuChecked', 'toggleMenu', 'closeMenu', 'openMenu'])
            expect(menuProps.menuChecked).toBe(menuContextStates.unchecked)
            expect(typeof menuProps.toggleMenu).toEqual('function')
            expect(typeof menuProps.closeMenu).toEqual('function')
            expect(typeof menuProps.openMenu).toEqual('function')
            return (<span></span>)
          }
        }
      </MenuConsumer>
    ), div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('exports a provider and a consumer', () => {
    expect(MenuProvider['$$typeof']).toBe(createContext().Provider['$$typeof'])
    expect(MenuProvider['$$typeof']).toBeTruthy()
    expect(MenuConsumer['$$typeof']).toBe(createContext().Consumer['$$typeof'])
    expect(MenuConsumer['$$typeof']).toBeTruthy()
  })

  it('exports a HOC', () => {
    class WithContextClass extends Component {
      constructor(props){
        super(props)
        expect(props.checked).toBe(true)
      }
      render(){
        return 'TEST'
      }
    }

    const AssertHasContext = withMenuContext(WithContextClass)

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
    ReactDOM.unmountComponentAtNode(div);

  })

  it('exports proper prop-types to use with HOC', () => {
    expect(Object.keys(withMenuPropTypes)).toEqual(['menuChecked', 'toggleMenu', 'closeMenu', 'openMenu'])
    expect(withMenuPropTypes.menuChecked).toBe(bool)
    expect(withMenuPropTypes.toggleMenu).toBe(func)
    expect(withMenuPropTypes.closeMenu).toBe(func)
    expect(withMenuPropTypes.openMenu).toBe(func)
  })
})
