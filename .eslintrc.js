module.exports = {
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true,
    "mocha": true,
    "es6": true
  },
  "plugins": [
    "react",
    "jsx-a11y"
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "arrow-parens": [
      "error",
      "as-needed"
    ],
    "arrow-body-style": [
      2,
      "as-needed"
    ],
    "comma-dangle": [
      2,
      "always-multiline"
    ],
    "no-unused-expressions": 1,
    "import/imports-first": 0,
    "import/newline-after-import": 0,
    "import/no-dynamic-require": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-named-as-default": 0,
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,
    "indent": [
      2,
      2,
      {
        "SwitchCase": 1
      }
    ],
    "jsx-a11y/aria-props": 2,
    "jsx-a11y/heading-has-content": 0,
    "jsx-a11y/href-no-hash": 2,
    "jsx-a11y/mouse-events-have-key-events": 2,
    "jsx-a11y/role-has-required-aria-props": 2,
    "jsx-a11y/role-supports-aria-props": 2,
    "jsx-a11y/no-static-element-interactions": 1,
    "max-len": 0,
    "newline-per-chained-call": 0,
    "no-console": 1,
    "no-use-before-define": 0,
    "prefer-template": 2,
    "class-methods-use-this": 0,
    "react/forbid-prop-types": 0,
    "react/no-array-index-key": 1,
    "react/jsx-first-prop-new-line": [
      2,
      "multiline"
    ],
    "react/jsx-filename-extension": 0,
    "react/jsx-no-target-blank": 0,
    "react/require-extension": 0,
    "react/self-closing-comp": 0,
    "react/prop-types": 0,
    "react/prefer-stateless-function": 1,
    "require-yield": 0,
	"require-jsdoc": ["error", {
        "require": {
            "FunctionDeclaration": true,
            "MethodDefinition": true,
            "ClassDeclaration": true,
            "ArrowFunctionExpression": false // Arrow functions are used mainly for callbacks (?) TBD
        }
    }],
	"valid-jsdoc": ["error", { //tbd http://eslint.org/docs/rules/valid-jsdoc
		"requireReturn": false, // only add @return if the method has one -> instead of @return {void}
		"requireParamDescription": true
	}]
  }
};
