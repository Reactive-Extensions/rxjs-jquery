(function (root, factory) {
    var freeExports = typeof exports == 'object' && exports &&
    (typeof root == 'object' && root && root == root.global && (window = root), exports);

    // Because of build optimizers
    if (typeof define === 'function' && define.amd) {
        define(['rx', 'jQuery', 'exports'], function (Rx, jQuery, exports) {
            root.Rx = factory(root, exports, Rx, jQuery);
            return root.Rx;
        });
    } else if (typeof module == 'object' && module && module.exports == freeExports) {
        module.exports = factory(root, module.exports, require('./rx'), require('./jQuery'));
    } else {
        root.Rx = factory(root, {}, root.Rx, jQuery);
    }
}(this, function (global, exp, root, $, undefined) {
    