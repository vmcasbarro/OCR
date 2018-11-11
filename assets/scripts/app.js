'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // require the tesseract
  const Tesseract = require('tesseract.js')

  // require progressbar.js
  const ProgressBar = require('progressbar.js')

  const confidenceBar = new ProgressBar.Line('#confidence-bar', {
    strokeWidth: 1,
    easing: 'easeInOut',
    duration: 1400,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: {width: '100%', height: '100%'},
    from: {color: '#FFEA82'},
    to: {color: '#4BB543'},
    step: (state, bar) => {
      bar.path.setAttribute('stroke', state.color)
    }
  })
  const progressBar = new ProgressBar.Line('#progress-bar', {
    strokeWidth: 4,
    easing: 'easeInOut',
    duration: 1400,
    color: '#007bff',
    trailWidth: 0,
    svgStyle: {width: '100%', height: '100%'}
  })

  // function running the OCR
  const parse = function (event) {
    console.log('clicked!')
    const image = $('#source-image').attr('src')
    Tesseract.recognize(image)
      .progress(function (message) {
        confidenceBar.set(0)
        $('.confidence').addClass('hidden')
        if (message.status === 'recognizing text' && message.progress > 0) {
          const decimal = message.progress
          const percent = Math.round(message.progress * 100)
          $('.results').html(`processing, ${percent}% complete.`)
          $('#progress-bar').removeClass('hidden')
          progressBar.set(decimal)
          console.log('progress is:', message.progress)
        }
        // console.log('progress is: ', message)
      })
      .then(function (result) {
        console.log('result', result)
        const text = result.text
        const html = result.html
        const confidence = result.confidence
        console.log('my confidence: ', confidence)
        confidenceBar.animate(confidence / 100)
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
