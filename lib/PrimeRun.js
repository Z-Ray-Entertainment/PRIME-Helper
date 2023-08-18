const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;
const Util = imports.misc.util;

const COMMAND_SET_EXECUTABLE = "chmod +x {scriptPath}"

const EXTENTION_SCRIPT_PATH = `/gnome-shell/extensions/PRIME_Helper@z-ray.de/script/`
const NAUTILUS_SCRIPT_PATH = `/nautilus/scripts`
const BIN_PATH = "/.local/bin"

const SCRIPT_NAME = `prime-run-nautilus`
const BIN_NAME = `prime-run`

const USER_DATA = GLib.get_user_data_dir();
const USER_HOME = GLib.get_home_dir();
const nautilus_target = `${USER_DATA}${EXTENTION_SCRIPT_PATH}${SCRIPT_NAME}`;
const bin_target = `${USER_DATA}${EXTENTION_SCRIPT_PATH}${BIN_NAME}`;

function install_file_manager_extention(){
    let dir = `${USER_DATA}${NAUTILUS_SCRIPT_PATH}`;
    let script = Gio.File.new_for_path(GLib.build_filenamev([dir, `Run on nVidia GPU`]));
    
    if (!script.query_exists(null)) {
        GLib.mkdir_with_parents(dir, 0o755);
        script.make_symbolic_link(nautilus_target, null);
        Util.spawn(['/bin/bash', '-c', COMMAND_SET_EXECUTABLE
            .replace("{scriptPath}", nautilus_target)
        ]);
    }
}

function remove_file_manager_extention(){
    let dir = `${USER_DATA}${NAUTILUS_SCRIPT_PATH}`;
    let script = Gio.File.new_for_path(GLib.build_filenamev([dir, `Run on nVidia GPU`]));

    if (script.query_exists(null)) {
        script.delete(null);
    }
}


function install_binary(){
    let dir = `${USER_HOME}${BIN_PATH}`;
    let script = Gio.File.new_for_path(GLib.build_filenamev([dir, BIN_NAME]));

    if (!script.query_exists(null)) {
        GLib.mkdir_with_parents(dir, 0o755);
        script.make_symbolic_link(bin_target, null);
        Util.spawn(['/bin/bash', '-c', COMMAND_SET_EXECUTABLE
            .replace("{scriptPath}", bin_target)
        ]);
    }
}

function remove_binary(){
    let dir = `${USER_HOME}${BIN_PATH}`;
    let script = Gio.File.new_for_path(GLib.build_filenamev([dir, BIN_NAME]));

    if (script.query_exists(null)) {
        script.delete(null);
    }
}