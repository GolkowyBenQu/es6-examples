'use strict'

import { myFunction3, config } from './config'
import * as api from './api'
require('./bootstrap')

window.MySpace = {
  myFunction2: () => {
    console.log('myFunction2')
  }
}

MySpace.myFunction = (param) => {
  let param2 = param * 2
  MySpace.myFunction2()
  return {param, param2}
}

myFunction3()

console.log(config)

MySpace.myFunction2()
let result = MySpace.myFunction(3)
console.log(result)

api.testGet()
api.testPost()

$(document).ready(function(){
  //Navigation Menu Slider
  $('.nav-expander').on('click',function(e){
    e.preventDefault();
    $('body').toggleClass('nav-expanded');
  });
  $('.nav-close').on('click',function(e){
    e.preventDefault();
    $('body').removeClass('nav-expanded');
  });
});