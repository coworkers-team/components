$(function() {
  var $container = $('.container'),
    $left = $('.left-side'),
    $right = $('.right-side'),
    $pull = $('.left-side__pull'),
    $innerLeft = $('.right-side__main__left'),
    $innerRight = $('.right-side__main__right'),
    $innerPull = $('.right-side__main__pull'),
    leftStartWidth = $left.width()

  function bindResizing(args, options) {
      var pull = args.pull
      pull.on('mousedown', function(event) {
        var container = args.container,
            left = args.left,
            right = args.right,
            max = args.max,
            min = args.min

        var containerRightBoundary = container.width(),
            containerWidth = container.width(),
            maxWidth = (left.width() + right.width()) * max,
            minWidth = (left.width() + right.width()) * min,
            leftCurrentWidth = left.width()

        var handlers = {
          mousemove: function(e) {
            var pageX = e.pageX
            var offsetLeft = left.offset().left
            var width = containerWidth - pageX

            if(width <= minWidth) {
              width = minWidth
            }
            if(width >= maxWidth) {
              width = maxWidth
            }

            right.width(width)
            var leftWidth = containerWidth - width - offsetLeft
            left.width(containerWidth - width - offsetLeft)

            if(!$.isEmptyObject(options)) {
              var offsetWidth = containerWidth - width
              var length = options.children.length
              options.children.forEach(function(el) {
                var currentWidth = el.width()
                el.width(currentWidth + Math.abs(leftCurrentWidth - leftWidth) / length)
              })
            }
          },
          mouseup: function(e) {
            $(this).off(handlers)
          }
        }
      container.on(handlers)
    })
  }

  $right.resize(function(e) {
    console.log(123)
  })

  bindResizing({
    container: $container,
    left: $left,
    right: $right,
    pull: $pull,
    max: 1,
    min: 0.8},
    {
      target: $left,
      children: [$innerRight, $innerLeft]
    })
  bindResizing({
    container: $container,
    left: $innerLeft,
    right: $innerRight,
    pull: $innerPull,
    max: 0.8,
    min: 0.2}
  )
})
