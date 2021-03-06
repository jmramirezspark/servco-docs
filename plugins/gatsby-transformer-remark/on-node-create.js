'use strict'

var _regenerator = require('babel-runtime/regenerator')

var _regenerator2 = _interopRequireDefault(_regenerator)

var _extends2 = require('babel-runtime/helpers/extends')

var _extends3 = _interopRequireDefault(_extends2)

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator')

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

var grayMatter = require(`gray-matter`)
var crypto = require(`crypto`)
var _ = require(`lodash`)

module.exports = (function() {
  var _ref2 = (0, _asyncToGenerator3.default)(
    /*#__PURE__*/ _regenerator2.default.mark(function _callee(
      _ref,
      pluginOptions
    ) {
      var node = _ref.node,
        getNode = _ref.getNode,
        loadNodeContent = _ref.loadNodeContent,
        boundActionCreators = _ref.boundActionCreators
      var createNode, createParentChildLink, content, data, markdownNode
      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                ;(createNode = boundActionCreators.createNode),
                  (createParentChildLink =
                    boundActionCreators.createParentChildLink)

                // We only care about markdown content.

                if (
                  !(
                    node.internal.mediaType !== `text/markdown` &&
                    node.internal.mediaType !== `text/x-markdown`
                  )
                ) {
                  _context.next = 3
                  break
                }

                return _context.abrupt('return')

              case 3:
                _context.next = 5
                return loadNodeContent(node)

              case 5:
                content = _context.sent
                data = grayMatter(content, pluginOptions)
                // Convert date objects to string. Otherwise there's type mismatches
                // during inference as some dates are strings and others date objects.

                if (data.data) {
                  data.data = _.mapValues(data.data, function(v) {
                    if (_.isDate(v)) {
                      return v.toJSON()
                    } else {
                      return v
                    }
                  })
                }

                markdownNode = {
                  id: `${node.id} >>> MarkdownRemark`,
                  modifiedTime: `${node.modifiedTime}`,
                  accessTime: `${node.accessTime}`,
                  changeTime: `${node.changeTime}`,
                  birthTime: `${node.birthTime}`,
                  children: [],
                  parent: node.id,
                  internal: {
                    content,
                    type: `MarkdownRemark`,
                  },
                }

                markdownNode.frontmatter = (0, _extends3.default)(
                  {
                    title: ``,
                  },
                  data.data,

                  {
                    _PARENT: node.id,
                    // TODO Depreciate this at v2 as much larger chance of conflicting with a
                    // user supplied field.
                    parent: node.id,
                  }
                )

                markdownNode.excerpt = data.excerpt
                markdownNode.rawMarkdownBody = data.content

                // Add path to the markdown file path
                if (node.internal.type === `File`) {
                  markdownNode.fileAbsolutePath = node.absolutePath
                }

                markdownNode.internal.contentDigest = crypto
                  .createHash(`md5`)
                  .update(JSON.stringify(markdownNode))
                  .digest(`hex`)

                createNode(markdownNode)
                createParentChildLink({ parent: node, child: markdownNode })

              case 16:
              case 'end':
                return _context.stop()
            }
          }
        },
        _callee,
        this
      )
    })
  )

  function onCreateNode(_x, _x2) {
    return _ref2.apply(this, arguments)
  }

  return onCreateNode
})()
