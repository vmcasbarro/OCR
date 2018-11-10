'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // require the tesseract
  const Tesseract = require('tesseract.js')

  // function running the OCR
  const parse = function (event) {
    console.log('clicked!')
    const image = $('#source-image').attr('src')
    Tesseract.recognize(image)
      .progress(function (message) { console.log('progress is: ', message) })
      .then(function (result) {
        console.log('result', result)
        const text = result.text
        const html = result.html
        const confidence = result.confidence
        console.log('my confidence: ', confidence)
        $('.results').html('')
        $('.results').html(html)
        $('.confidence').removeClass('hidden')
        $('#confidence').text(confidence)
      })
  }

  // function replaces the demo image with a preview of the user-selected image
  const showUserSelectedImage = function (event) {
    event.preventDefault()
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader()
      reader.onload = function (e) {
        $('#source-image').attr('src', e.target.result)
      }
      reader.readAsDataURL(event.target.files[0])
    }
  }

  // event listener for clicking the run button
  $('#OCR').on('click', parse)
  $('#choose-photo').on('change', showUserSelectedImage)
})
