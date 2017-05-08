module.exports = {
  "extends": [
    "airbnb",
    "plugin:jasmine/recommended"
  ],
  // Required to validate the code as babel interprets it. Used for static properties
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "mocha": true,
    "es6": true,
    "jasmine": true
  },
  "plugins": [
    "react",
    "jsx-a11y",
    "jasmine"
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "arrow-parens": ["error", "as-needed"],
    "arrow-body-style": [2, "as-needed"],
    "comma-dangle": [2, "never"],
    "no-plusplus": [2, {
      "allowForLoopAfterthoughts": true,
    }],
    "no-unused-expressions": 1,
    "object-curly-spacing": [2, "never"],
    // Since for in/of loops are not permitted we have to loop with forEach and
    // therefore it's required to be able to assign to param properties
    "no-param-reassign": [2, {"props": false}],
    "import/imports-first": 0,
    "import/newline-after-import": 0,
    "import/no-dynamic-require": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-named-as-default": 0,
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,
    "indent": [2, 2, {
      "SwitchCase": 1
    }],
    "jsx-a11y/aria-props": 2,
    "jsx-a11y/heading-has-content": 0,
    "jsx-a11y/href-no-hash": 2,
    "jsx-a11y/mouse-events-have-key-events": 2,
    "jsx-a11y/role-has-required-aria-props": 2,
    "jsx-a11y/role-supports-aria-props": 2,
    "jsx-a11y/no-static-element-interactions": 0,
    "max-len": 0,
    "newline-per-chained-call": 0,
    "no-console": 2,
    "no-use-before-define": 0,
    "prefer-template": 2,
    "class-methods-use-this": 0,
    "react/forbid-prop-types": 0,
    "react/no-array-index-key": 0,
    "react/jsx-first-prop-new-line": [2, "multiline"],
    "react/jsx-filename-extension": 0,
    "react/no-unused-prop-types": 0,
    "react/jsx-no-target-blank": 0,
    "react/require-extension": 0,
    "react/self-closing-comp": 0,
    "react/prop-types": 0,
    "react/no-string-refs": 0,
    "react/prefer-stateless-function": 1,
    "require-yield": 0,
    "require-jsdoc": ["error", {
      "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": true,
        "ArrowFunctionExpression": false
      }
    }],
    "valid-jsdoc": ["error", {
      "prefer": {"arg": "param", "argument": "param", "return": "returns", "virtual": "abstract"},
      "requireReturnDescription": false,
      "requireParamDescription": true,
    }],

    // PROPOSAL
    "no-mixed-operators": 0,
    // jasmine
    "jasmine/no-global-setup": false,
  }
};
