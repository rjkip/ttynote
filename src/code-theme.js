var colors = require('ansicolors');

// Change the below definitions in order to tweak the color theme.
module.exports = {

    'Boolean': {
      'true'   :  undefined
    , 'false'  :  undefined
    , _default :  colors.brightRed
    }

  , 'Identifier': {
      'undefined' :  colors.grey
    , 'self'      :  colors.brightRed
    , 'console'   :  colors.blue
    , 'log'       :  colors.blue
    , 'warn'      :  colors.brightBlue
    , 'error'     :  colors.brightRed
    , _default    :  colors.white
    }

  , 'Null': {
      _default: colors.grey
    }

  , 'Numeric': {
      _default: colors.blue
    }

  , 'String': {
      _default: function (s, info) {
        var nextToken = info.tokens[info.tokenIndex + 1];

        // show keys of object literals and json in different color
        return (nextToken && nextToken.type === 'Punctuator' && nextToken.value === ':') 
          ? colors.green(s)
          : colors.brightGreen(s);
      }
    }

  , 'Keyword': {
      'break'       :  undefined

    , 'case'        :  undefined
    , 'catch'       :  colors.cyan
    , 'class'       :  undefined
    , 'const'       :  undefined
    , 'continue'    :  undefined

    , 'debugger'    :  undefined
    , 'default'     :  undefined
    , 'delete'      :  colors.brightBlue
    , 'do'          :  undefined

    , 'else'        :  undefined
    , 'export'      :  undefined
    , 'extends'     :  undefined

    , 'finally'     :  colors.cyan
    , 'for'         :  undefined
    , 'function'    :  undefined

    , 'if'          :  undefined
    , 'import'      :  undefined
    , 'in'          :  undefined
    , 'instanceof'  :  undefined
    , 'let'         :  undefined
    , 'new'         :  colors.brightBlue
    , 'return'      :  colors.brightBlue
    , 'static'      :  undefined
    , 'super'       :  undefined
    , 'switch'      :  undefined

    , 'this'        :  colors.brightRed
    , 'throw'       :  undefined
    , 'try'         :  colors.cyan
    , 'typeof'      :  undefined

    , 'var'         :  colors.green
    , 'void'        :  undefined

    , 'while'       :  undefined
    , 'with'        :  undefined
    , 'yield'       :  undefined
    , _default      :  colors.brightBlue
  }
  , 'Punctuator': {
      ';': colors.grey
    , '.': colors.green  
    , ',': colors.green  

    , '{': colors.yellow
    , '}': colors.yellow
    , '(': colors.grey
    , ')': colors.grey
    , '[': colors.yellow
    , ']': colors.yellow

    , '<': undefined
    , '>': undefined
    , '+': undefined
    , '-': undefined
    , '*': undefined
    , '%': undefined
    , '&': undefined
    , '|': undefined
    , '^': undefined
    , '!': undefined
    , '~': undefined
    , '?': undefined
    , ':': undefined
    , '=': undefined

    , '<=': undefined
    , '>=': undefined
    , '==': undefined
    , '!=': undefined
    , '++': undefined
    , '--': undefined
    , '<<': undefined
    , '>>': undefined
    , '&&': undefined
    , '||': undefined
    , '+=': undefined
    , '-=': undefined
    , '*=': undefined
    , '%=': undefined
    , '&=': undefined
    , '|=': undefined
    , '^=': undefined
    , '/=': undefined
    , '=>': undefined

    , '===': undefined
    , '!==': undefined
    , '>>>': undefined
    , '<<=': undefined
    , '>>=': undefined
    , '...': undefined
    
    , '>>>=': undefined

    , _default: colors.brightYellow
  }

    // line comment
  , Line: {
     _default: colors.grey
    }

    /* block comment */
  , Block: {
     _default: colors.grey
    }

  , _default: undefined
};
