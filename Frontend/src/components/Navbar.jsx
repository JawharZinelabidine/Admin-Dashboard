import React from 'react'

function Navbar() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\n  html,\nbody {\n  font-family: "Rubik", sans-serif;\n}\n\n/* navigation \n - show navigation always on the large screen devices with (min-width:1024)\n*/\n\n@media (min-width: 1024px) {\n  .top-navbar {\n    display: flex !important;\n    align-items: center;\n  }\n'
        }}
      />
      <nav style={{ height: '5rem' }} className="flex items-center bg-black p-3 h-16 flex-wrap">
        <button
          className="text-white inline-flex p-3 hover:bg-gray-900 rounded lg:hidden ml-auto hover:text-white outline-none nav-toggler"
          data-target="#navigation"
        >
          <i className="material-icons">menu</i>
        </button>
        <div
  className="hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto justify-center items-center"
  id="navigation"
>
  <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-center flex flex-col lg:h-auto">
    <span className="text-white text-2xl font-bold uppercase tracking-wide">Admin Dashboard</span>
  </div>
</div>
      </nav>
    </>
  )
}

export default Navbar
