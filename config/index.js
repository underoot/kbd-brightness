module.exports = [
    {
        paths: {
            max: '/sys/devices/platform/asus-nb-wmi/leds/asus::kbd_backlight/max_brightness',
            current: '/sys/devices/platform/asus-nb-wmi/leds/asus::kbd_backlight/brightness'
        },
        level: 1,
        interval: 100
    }
];
