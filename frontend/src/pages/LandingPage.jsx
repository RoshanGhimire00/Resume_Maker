import React, { useState } from 'react'
import { LayoutTemplate, X, Menu } from 'lucide-react'
import { landingPageStyles } from './../assets/dummystyle'

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(null)


  return (
    <div className={landingPageStyles.container}>
      {/* Header */}
      <header className={landingPageStyles.header}>
        <div className={landingPageStyles.headerContainer}>
          <div className={landingPageStyles.logoContainer}>
            <div className={landingPageStyles.logoIcon}>
              <LayoutTemplate className={landingPageStyles.logoIconInner} />
            </div>
            <span className={landingPageStyles.logoText}>
              ResumeXpert
            </span>
          </div>

          {/* Mobile menu BTN */}
          <button
            className={landingPageStyles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={24} className={landingPageStyles.mobileMenuIcon} />
            ) : (
              <Menu size={24} className={landingPageStyles.mobileMenuIcon} />
            )}
          </button>

          {/* DestTop Navigatoion */}
          <div className="hidden md:flex items-center">
            {user ? user.name : "Get Started"}
          </div>



        </div>
      </header>
    </div>
  )
}

export default LandingPage