'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // require the tesseract
  const Tesseract = require('tesseract.js')

  // specify image
  const image = '../../public/tesseract-sample-image.png'

  // function running the OCR
  const parse = function (event) {
    console.log('clicked!')
    Tesseract.recognize(image)
      .progress(function (message) { console.log('progress is: ', message) })
      .then(function (result) {
        console.log('result', result)
        const text = result.text
        const html = result.html
        console.log('my text: ', text)
        $('.results').html('')
        $('.results').html(html)
      })
  }

  const show = function (event) {
    event.preventDefault()
    $('#upload-image').removeClass('hidden')

    console.log('show image!', event)
  }

  // event listener for clicking the run button
  $('#OCR').on('click', parse)
  $('#choose-photo').on('change', show)


})
