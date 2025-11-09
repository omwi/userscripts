export const SHADOW_CLASS_NAME = "shadowy-item";
const SHADOW_SELECTOR = `.${SHADOW_CLASS_NAME} {
  opacity: 0.2;
}`;

const SELECTORS = [SHADOW_SELECTOR];

export function injectStyles() {
  const style = SELECTORS.join("\n");
  const styleElement = document.createElement("style");
  styleElement.textContent = style;
  document.head.appendChild(styleElement);
}
