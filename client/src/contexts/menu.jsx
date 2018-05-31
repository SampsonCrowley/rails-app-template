import React, {createContext, forwardRef} from 'react'
import {func, bool} from 'prop-types'
export const menuContextStates = {
  checked: true,
  unchecked: false,
}

const MenuContext = createContext({
  menuChecked: menuContextStates.unchecked,
  toggleMenu: () => {},
  closeMenu: () => {},
  openMenu: () => {},
})

export const {Provider: MenuProvider, Consumer: MenuConsumer} = MenuContext

export function withMenuContext(Component) {
  return (props) => (
    <MenuConsumer>
      {menuProps => <Component {...props} {...menuProps} />}
    </MenuConsumer>
  )
}

export function withRefMenuContext(Component) {
  return forwardRef((props, ref) => (
    <MenuConsumer>
      {menuProps => <Component {...props} {...menuProps} ref={ref} />}
    </MenuConsumer>
  ))
}

export const withMenuPropTypes = {
  menuChecked: bool,
  toggleMenu: func,
  closeMenu: func,
  openMenu: func
}

export default MenuContext
