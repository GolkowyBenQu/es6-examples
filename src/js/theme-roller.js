'use strict'

export function themeRoller() {
  const themeIndex = Math.floor((Math.random() * 2) + 1);
  document.getElementsByTagName('body')[0].classList.add('theme-' + themeIndex);
}