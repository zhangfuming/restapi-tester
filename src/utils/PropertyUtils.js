/**
 * Created with IntelliJ IDEA.
 * User: zhangfuming
 * Date: 13-6-17
 * Time: 上午11:22
 * To change this template use File | Settings | File Templates.
 */


module.exports = {
    extend : function(target, options) {
        for (var name in options) {
            target[name] = options[name];
        }
        return target;
    },
    extend_no_modify : function(target, options) {
        var _target = target;
        for (var name in options) {
            _target[name] = options[name];
        }
        return _target;
    }
};
