module.exports = {
  "presets": [
    ["es2015", {
      "modules": false
    }],
    "stage-1", "react"
  ],
  "plugins": [
    ["transform-class-properties", { "spec": true }],
    ["transform-react-jsx", { "pragma":"React.createElement" }],
        ["module-resolver", {
        "root": ["."],
        "alias": {
            "react": "preact-compat",
            "react-dom": "preact-compat"
        }
    }]
  ]
}
