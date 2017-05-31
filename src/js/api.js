'use strict'

import { get, post } from './apiInterface'

export function testGet() {
  get('test')
}

export function testPost() {
  post('test')
}