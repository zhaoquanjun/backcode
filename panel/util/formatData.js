import animateData from '@/config/controlValueLimit.config.js'
const formatData = dataWrapper => {
  window.smSite.setPanelData = function(d) {
    if (d.animate == null || d.animate === undefined) {
      d.animate = {}
      d.animate = {
        animationName: '',
        direction: 'Left',
        infinite: '',
        autoReverse: false,
        delay: d.animate.delay ? d.animate.delay / 1000 : animateData.animateRange.delay.minValue,
        duration: d.animate.duration ? d.animate.duration / 1000 : animateData.animateRange.duration.minValue
      }
    } else {
      d.animate.delay = d.animate.delay ? d.animate.delay / 1000 : animateData.animateRange.delay.minValue
      d.animate.duration = d.animate.duration ? d.animate.duration / 1000 : animateData.animateRange.duration.minValue
    }
    dataWrapper.data = d
  }
}

export default formatData
