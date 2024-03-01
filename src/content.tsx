import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import GenerateButton from "~features/generate-button"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  return (
    <div className="plasmo-z-0">
      <GenerateButton />
    </div>
  )
}

export default PlasmoOverlay
