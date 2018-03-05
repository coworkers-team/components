$(function() {
  var $container = $('.container'),
    $left = $('.left-side'),
    $right = $('.right-side'),
    $pull = $('.left-side__pull'),
    $innerLeft = $('.right-side__main__left'),
    $innerRight = $('.right-side__main__right'),
    $innerPull = $('.right-side__main__pull')

  function bindResizing(container, left, right, pull, maxWidthRight, maxWidthLeft, inner) {
      pull.on('mousedown', function(event) {
        var containerLeftBoundary = container.position().left,
          containerWidth = container.width(),
          widthLeft = containerWidth * maxWidthLeft,
          widthRight = containerWidth * maxWidthRight

        var handlers = {
          mousemove: function(e) {
            var pageX = e.pageX
            var leftWidth = pageX - containerLeftBoundary

            if(inner) {
              if(leftWidth > widthLeft) {
                leftWidth = widthLeft
              }
            } else {
              if(leftWidth < widthLeft) {
                leftWidth = widthLeft
              }
            }
            if(leftWidth < containerLeftBoundary) {
              leftWidth = containerLeftBoundary
            }
            if(leftWidth > widthRight) {
              leftWidth = widthRight
            }

            left.width(leftWidth)
            right.width(containerWidth - leftWidth)
          },
          mouseup: function(e) {
            $(this).off(handlers)
          }
        }
      container.on(handlers)
    })
  }

  bindResizing($container, $left, $right, $pull, 1, 0.2, true)
  bindResizing($right, $innerLeft, $innerRight, $innerPull, 0.8, 0.2, false)
})


$(function() {
  var $container = $('.container'),
    $left = $('.left-side'),
    $right = $('.right-side'),
    $pull = $('.left-side__pull'),
    $innerLeft = $('.right-side__main__left'),
    $innerRight = $('.right-side__main__right'),
    $innerPull = $('.right-side__main__pull')

  function bindResizing(container, left, right, pull, maxWidthLeft, maxWidthRight, inner) {
      pull.on('mousedown', function(event) {
        var rightLeftBoundary = right.position().left,
            containerLeftBoundary = container.position().left,
            containerWidth = container.width(),
            rightWidth = right.width(),
            leftWidth = left.width(),
            maxWidth = containerWidth * maxWidthRight,
            minWidth = containerWidth * maxWidthLeft

        var handlers = {
          mousemove: function(e) {
            var pageX = e.pageX
            var rWidth = rightWidth + (rightLeftBoundary - pageX)
            console.log(rWidth, maxWidth)
            if(rWidth < maxWidth) {
              rWidth = maxWidth
            }
            var lWidth = containerWidth - rWidth
            right.width(rWidth)
            left.width(lWidth)
          },
          mouseup: function(e) {
            $(this).off(handlers)
          }
        }
        container.on(handlers)
    })
  }

  bindResizing($container, $left, $right, $pull, 1, 0.8, true)
  bindResizing($right, $innerLeft, $innerRight, $innerPull, 0.8, 0.2, false)
})
