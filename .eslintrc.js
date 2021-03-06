module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": ["airbnb"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "settings": {
        "import/resolver": {
            "babel-module": {}
        }
    },
    "rules": {
        "indent": [2, "tab"],
        "no-tabs": 0,
    }
};
