import React from "react"

import "./styles/skip-links.scss"

const SkipLinks = ({ children, variant = "" }) => {
  return (
    <>
      <ul className={`skip-links ${variant}`}>{children}</ul>
    </>
  )
}

export default SkipLinks
