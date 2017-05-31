'use strict'

class Popup {
  constructor (title, content, buttons) {

  }

  on (event, callback) {
    addCallbackToList()
  }

  trigger (event, ...args) {
    if (exists) {
      listeners.forEach(listener => listener(...args))
    }
  }

  open() {
    appendToDocument()

    if (hasButtons) {
      addButtonsToModal()
      buttons.forEach(button => {
        button.onCLick(() => {
          this.trigger('button:' + button.id)
        })
      })
    }

    appendTitle()
    appendContent()
    showModal()
  }

  close() {
    hideModal()
  }
}