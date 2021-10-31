module.exports = {
  "extends": [
    "airbnb"
  ],
  "plugins": ["eslint-plugin-import"],
  "env": {
    "jest": true,
    "browser": true
  },
  "rules": {
    "jsx-a11y/label-has-associated-control": [0, {
      "labelComponents": ["label"],
      "labelAttributes": [],
      "controlComponents": ["Text"]
    }],
    "no-console": "off",
    "jsx-a11y/click-events-have-key-events": 0,
    "react/prop-types": 0,
    "no-nested-ternary": 0,
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "react/jsx-boolean-value": "off",
    "react/no-unescaped-entities": "off",
    "class-methods-use-this": "off",
    "no-restricted-properties": "off",
    "import/no-named-as-default": "off",
    "object-curly-newline": "off",
    "max-len": [2, 300, 4, { "ignoreUrls": true, "ignoreTemplateLiterals": true }],
    "jsx-a11y/label-has-for": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "prefer-destructuring": "off",
    "no-extend-native": [2, { "exceptions": ["Object", "Number"] }]
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": 'webpack.development.config.js',
      },
    },
  },
};
