const Gio = imports.gi.Gio;
const Util = imports.misc.util;
const GLib = imports.gi.GLib;
const Me = imports.misc.extensionUtils.getCurrentExtension();

const ICON_INTEL_FILE_NAME = '/img/intel_icon_plain.svg';
const ICON_NVIDIA_FILE_NAME = '/img/nvidia_icon_plain.svg';
const ICON_HYBRID_FILE_NAME = '/img/intel_icon_plain.svg';

var COMMAND_TO_SWITCH_GPU_PROFILE = "pkexec {prime-path} {profile}; gnome-session-quit --logout";
var COMMAND_SET_EXECUTABLE = "chmod +x {scriptPath}"

var USER_DATA = GLib.get_user_data_dir();
var USER_HOME = GLib.get_home_dir();

var EXTENSION_PATH = `/gnome-shell/extensions/`
var EXTENSION_NAME = `PRIME_Helper@z-ray.de`;
var EXTENSION_SCRIPT_PATH_ABSOLUTE = `${USER_DATA}${EXTENSION_PATH}${EXTENSION_NAME}/script/`;
var EXTENSION_ICON_FILE_NAME = '/img/icon.png';

var GPU_PROFILE_INTEGRATED = "intel";
var GPU_PROFILE_HYBRID = "offload";
var GPU_PROFILE_NVIDIA = "nvidia";

var SCRIPT_TYPE_PRIME_NAUTILUS = 0;
var SCRIPT_TYPE_PRIME_ZINK_NAUTILUS = 1;
var SCRIPT_TYPE_PRIME_RUN = 2;
var SCRIPT_TYPE_PRIME_RUN_ZINK = 3;
var SCRIPT_TYPE_ZINK_RUN_NAUTILUS = 4;
var SCRIPT_TYPE_ZINK_RUN = 5;

function getCurrentProfile() {
    let [ok, outbuf, err, exit] = GLib.spawn_command_line_sync(_findPrimeSelect() + ' get-current');

    let decoder = new TextDecoder();
    let out = decoder.decode(outbuf);
    let driver = out.split("\n")[0].split(":")[1].trim().toLowerCase();

    return driver;
}

function getIconForProfile(p) {
    switch (p) {
        case GPU_PROFILE_INTEGRATED:
            return Gio.icon_new_for_string(Me.dir.get_path() + ICON_INTEL_FILE_NAME);
        case GPU_PROFILE_HYBRID:
            return Gio.icon_new_for_string(Me.dir.get_path() + ICON_HYBRID_FILE_NAME);
        case GPU_PROFILE_NVIDIA:
            return Gio.icon_new_for_string(Me.dir.get_path() + ICON_NVIDIA_FILE_NAME);
        default:
            return Gio.icon_new_for_string(Me.dir.get_path() + ICON_INTEL_FILE_NAME);
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function isBatteryPlugged() {
    const directory = Gio.File.new_for_path('/sys/class/power_supply/');
        // Synchronous, blocking method
    const iter = directory.enumerate_children('standard::*', Gio.FileQueryInfoFlags.NOFOLLOW_SYMLINKS, null);

    while (true) {
        const info = iter.next_file(null);
    
        if (info == null) {
            break;
        }
            
        if(info.get_name().includes("BAT")) {
            return true;
        }
    }
    return false;
}

/*
It might be that on some systems (openSUSE for example) prime-select is located at
/usr/sbin instead of /usr/bin which is usually not included in a default useres $PATH
So we need to locate the excutable.
*/
function _findPrimeSelect(){
    let is_sbin = _test_prime_path(true);
    if(is_sbin){
        return '/usr/sbin/prime-select';
    } else {
        let is_bin = _test_prime_path(false);
        if(is_bin){
            return '/usr/bin/prime-select';
        }
    }
    //In case the user has set some addional $PATH includes we did not checked then
    //just return the binary name.
    return 'prime-select'
}

function _test_prime_path(superuser){
    let raw_cmd = 'which /usr/{path}/prime-select 2>/dev/null || echo FALSE';
    let final_cmd = superuser ? raw_cmd.replace('{path}', 'sbin') : raw_cmd.replace('{path}', 'bin');
    
    let [ok, outbuf, err, exit] = GLib.spawn_command_line_sync(final_cmd);
    let decoder = new TextDecoder();
    let out = decoder.decode(outbuf);

    return out.toLowerCase().includes("prime-select");
}

function _execSwitch(profile) {
    // exec switch
    Util.spawn(['/bin/bash', '-c', COMMAND_TO_SWITCH_GPU_PROFILE
        .replace("{profile}", profile)
        .replace("{prime-path}", _findPrimeSelect())
    ]);
}

function _isSettingActive(all_settings, setting_name) {
    return all_settings.get_boolean(setting_name) ? "y" : "n";
}

function switchIntegrated() {
    _execSwitch(GPU_PROFILE_INTEGRATED);
}

function switchHybrid(all_settings) {
    _execSwitch(GPU_PROFILE_HYBRID)
}

function switchNvidia(all_settings) {
    _execSwitch(GPU_PROFILE_NVIDIA);
}

