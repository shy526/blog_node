/**
 * doubo 配置
 * @author ccxh
 */
const nzd = require('node-zookeeper-dubbo');
const opt = {
    application: {name: 'blog_node'},
    register: "127.0.0.1:2181",
    dubboVer: "2.6.2",
    dependencies: {
       ThemeService: {
            interface: 'ccxh.top.service.ThemeService',
            version: '1.0.0',
            timeout: 6000,
            methodSignature: {
                thenmePage: (a, b) => [javaBaseType.Integer(a), javaBaseType.Integer(b)]
            }
        },
        MarkdownService: {
            interface: 'ccxh.top.service.MarkdownService',
            version: '1.0.0',
            timeout: 6000,
            methodSignature: {
                getMarkdownPageBy: (a) => [javaBaseType.Integer(a)]
            }
        }
    },
}

const Dubbo = new nzd(opt);
Dubbo.on("service:changed", (event) => {
    console.log(event);
    console.log("dubbo succeed")
});

/**
 *  用于注入 express
 * @returns {Function}
 */
function getDubboService() {
    return function (req, res, next) {
        if (req.getDubboService) {
            return next();
        }
        req.getDubboService = function (str) {
            return Dubbo[str];
        }
        return next();
    }
}

const javaBaseType = {
    String: function (value) {
        return {'$class': 'java.lang.String', '$': value}
    },
    Float: function (value) {
        return {'$class': 'java.lang. Float', '$': value}
    },
    Double: function (value) {
        return {'$class': 'java.lang.Double', '$': value}
    },
    Integer: function (value) {
        return {'$class': 'java.lang.Integer', '$': value}
    },
    Character: function (value) {
        return {'$class': 'java.lang.Character', '$': value}
    },
    Boolean: function (value) {
        return {'$class': 'java.lang.Boolean', '$': value}
    },
    Short: function (value) {
        return {'$class': 'java.lang.Short', '$': value}
    },
    Long: function (value) {
        return {'$class': 'java.lang.Long', '$': value}
    }
}
/**
 * 转java
 * @param value
 * @returns {{$class: string, $: *}}
 */


module.exports = {
    getDubboService: getDubboService
};