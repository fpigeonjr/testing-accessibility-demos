import React from "react"
import BodyClassName from "react-body-classname"
import { Helmet } from "react-helmet"
import HeaderPortal from "workshop4-components/header-portal"

import "workshop4-components/styles/page-submit-listing.scss"

const SubmitListingPage = () => {
  const inputRefs = React.useRef([])
  let [isFormDirty, setIsFormDirty] = React.useState(false)
  let [announcementMessage, setAnnouncementMessage] = React.useState("")
  let [formState, setFormState] = React.useState({
    submitterName: "",
    email: "",
    sitename: "",
    location: "",
    fee: 0
  })

  const handleChange = (event) => {
    const target = event.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const id = target.id
    setIsFormDirty(true)
    setFormState((prevState) => {
      return {
        ...prevState,
        ...{
          [id]: value
        }
      }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let firstEmptyElementIndex = null
    let formInputs = Array.from(event.target.elements)
    formInputs.map((element, input) => {
      switch (element.type) {
        case "submit":
          return
          break
        default:
          setIsFormDirty(false)
          if (element.value.trim().length === 0) {
            if (firstEmptyElementIndex === null) {
              firstEmptyElementIndex = input
              inputRefs.current[input].focus()
            }
            setAnnouncementMessage("Please fill out all fields.")
          }
          console.log(element.value)
          break
      }
    })
  }

  return (
    <BodyClassName className="header-overlap page-submit-listing">
      <>
        <HeaderPortal>
          <h1 className="visually-hidden">CampSpots</h1>
        </HeaderPortal>
        <section aria-labelledby="heading-about-1">
          <header className="page-header">
            <div className="page-header-content layout">
              <h2 className="primary-heading h1-style" id="heading-about-1">
                Submit Your Spot
              </h2>
            </div>
          </header>
          <article className="form-wrap">
            <div className="layout">
              <h3>
                Got a camping spot our community would enjoy? Tell us about it!
              </h3>
              <form onSubmit={handleSubmit}>
                <p role="alert" className="error">
                  {isFormDirty ? announcementMessage : null}
                </p>
                <div className="two-parts-50-50">
                  <div className="form-field">
                    <label htmlFor="submittername">
                      Your name{" "}
                      <span className="asterisk" abbr="required">
                        *
                      </span>
                    </label>
                    <input
                      aria-invalid={
                        isFormDirty && formState.submitterName.length === 0
                          ? "true"
                          : null
                      }
                      type="text"
                      id="submittername"
                      onChange={handleChange}
                      ref={(inputRef) => {
                        inputRefs.current.push(inputRef)
                      }}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">
                      Your email address{" "}
                      <span className="asterisk" abbr="required">
                        *
                      </span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      onChange={handleChange}
                      ref={(inputRef) => {
                        inputRefs.current.push(inputRef)
                      }}
                      //   pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                    />
                  </div>
                </div>
                <div className="two-parts-50-50">
                  <div className="form-field">
                    <label htmlFor="sitename">
                      Site Name{" "}
                      <span className="asterisk" abbr="required">
                        *
                      </span>
                    </label>
                    <input type="text" id="sitename" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="location">
                      Location{" "}
                      <span className="asterisk" abbr="required">
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      id="location"
                      onChange={handleChange}
                      ref={(inputRef) => {
                        inputRefs.current.push(inputRef)
                      }}
                    />
                  </div>
                </div>
                <div className="two-parts-50-50">
                  <div className="form-field">
                    <label htmlFor="fee">Nightly fee</label>
                    <input type="number" id="fee" placeholder="$" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="ownership">
                      Can the public legally camp here?{" "}
                      <span className="asterisk" abbr="required">
                        *
                      </span>
                    </label>
                    <input
                      type="checkbox"
                      id="ownership"
                      name="ownership"
                      value="Owned"
                      onChange={handleChange}
                      ref={(inputRef) => {
                        inputRefs.current.push(inputRef)
                      }}
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="notes">Notes</label>
                  <textarea
                    id="notes"
                    onChange={handleChange}
                    ref={(inputRef) => {
                      inputRefs.current.push(inputRef)
                    }}
                  ></textarea>
                </div>
                <p id="key" className="asterisk">
                  * Fields are required.
                </p>
                <div className="form-submit">
                  <button className="btn-submit">Submit</button>
                </div>
              </form>
            </div>
          </article>
        </section>
      </>
    </BodyClassName>
  )
}

export default SubmitListingPage
