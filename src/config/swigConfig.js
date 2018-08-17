const swig = require('swig');
const path = require('path');
function setSwig(app) {
    // 设置swig
    app.set('views', path.join(__dirname, '../../views'));
    app.set('view engine','html');
    app.engine('html', swig.renderFile);
    swig.setDefaults({
        cache: false
    });
    app.set('view cache', false);
}
module.exports = {
    setSwig:setSwig
};