import React from 'react'

function Sidebar() {
  return (
    <>
      <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="/dist/tailwind.css" rel="stylesheet" />
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css"
  />
  <span
    className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
    onclick="openSidebar()"
  >
    <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md" />
  </span>
  <div className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-black">
    <div className="text-gray-100 text-xl">
      <div className="p-2.5 mt-1 flex items-center">
        <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-red-600" />
        <h1 className="font-bold text-gray-200 text-[15px] ml-3">
          Reservi
        </h1>
        <i
          className="bi bi-x cursor-pointer ml-28 lg:hidden"
          onclick="openSidebar()"
        />
      </div>
      <div className="my-2 bg-red-600 h-[1px]" />
    </div>
    <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white">
    <i class="bi bi-border-all" />
      <span className="text-[15px] ml-4 text-gray-200 font-bold">DashBoard</span>
    </div>
    <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white">
    <i class="bi bi-bell-fill"/>
      <span className="text-[15px] ml-4 text-gray-200 font-bold">Notification</span>
    </div>
    <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white">
    <i class="bi bi-person-lines-fill"/>
      <span className="text-[15px] ml-4 text-gray-200 font-bold">Restaurants</span>
    </div>
    <div className="my-4 bg-red-600 h-[1px]" />
    <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white">
      <i className="bi bi-box-arrow-in-right" />
      <span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
    </div>
  </div>
    </>
  )
}

export default Sidebar
