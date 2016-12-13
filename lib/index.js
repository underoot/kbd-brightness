const debug = require('debug')('kbd-brightness');
const fs = require('fs');

/**
 * Create function for calculating brightness
 * of some device.
 *
 * @param {Object} options
 * @param {String} options.current
 * @param {String} options.max
 * @param {Number} option.level
 *
 * @returns {Function}
 */
function makeCalculator(options) {
    const { max, paths, rule, level } = options;

    let current = options.current;
    let direction = 1;

    if (max === 0) {
        throw new Error('Cannot change brightness of device with max level equal 0');
    }

    return function() {
        if (current >= max) {
            direction = -direction;
        }

        if (current === 0 && direction === -1) {
            direction = -direction;
        }

        current += direction * level;

        return current;
    }
}

/**
 * Read parameter from file and return it as number
 * @param {String} path Path to file with parameter
 *
 * @returns {Number}
 */
function getParameter(path) {
    return Number(fs.readFileSync(path).toString());
}

/**
 * Write parameter to file
 * @param {String} path
 * @param {Number} value
 *
 */
function setParameter(path, value) {
    debug(`writing parameter ${value} to file ${path}`);
    return fs.writeFileSync(path, value)
}

/**
 * Return pair of parameters for control brightness
 * of device
 *
 * @param {Object} paths
 * @param {String} paths.max
 * @param {String} paths.current
 */
function getParameters(paths) {
    return {
        max: getParameter(paths.max),
        current: getParameter(paths.current)
    }
}

/**
 * Iterate through list of configs and start all devices
 *
 * @param {Array|Object} config
 */
function initDevices(config) {
    const devices = [].concat(config);

    for (const options of devices) {
        startDevice(options);
    }
}

/**
 * Start changing brightness of one device
 * @param {Object} options
 * @param {Object} options.paths
 * @param {String} options.paths.max Path to file with parameter of max
 * @param {String} options.paths.current Path to file with current parameter
 * @param {Number} options.level Level of changing brightness
 * @param {Number} options.interval Interval of changing level
 */
function startDevice(options) {
    const {
        level,
        interval,
        paths
    } = options;

    const {
        max,
        current
    } = getParameters(options.paths);

    const getLevel = makeCalculator({
        current, max, level
    });

    setInterval(() => setParameter(paths.current, getLevel()), interval);
}

module.exports = {
    makeCalculator: makeCalculator,
    initDevices: initDevices
};
