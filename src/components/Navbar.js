import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../assets/wrappers/Navbar'
import Logo from './Logo'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { clearStore, toggleSidebar } from '../features/user/userSlice'
import { useState } from 'react'

const Navbar = () => {
  const { user } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const [showLogout, setShowLogout] = useState(false)
  //change side bar is open from userSlice
  const toggle = () => {
    dispatch(toggleSidebar())
  }

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => {
                dispatch(clearStore('Logout Successful...'))
              }}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar
