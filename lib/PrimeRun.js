const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;
const Util = imports.misc.util;
const Me = imports.misc.extensionUtils.getCurrentExtension();
const {Utility} = Me.imports.lib;

const NAUTILUS_SCRIPT_PATH = `/nautilus/scripts`
const BIN_PATH = "/.local/bin"
const SCRIPT_NAME = `prime-run-nautilus`
const BIN_NAME = `prime-run`

function install_file_manager_extention(){
    let dir = `${Utility.USER_DATA}${NAUTILUS_SCRIPT_PATH}`;
    let nautilus_target = `${Utility.EXTENSION_SCRIPT_PATH_ABSOLUTE}${SCRIPT_NAME}`;
    let script = Gio.File.new_for_path(GLib.build_filenamev([dir, `Run on nVidia GPU`]));
    
    if (!script.query_exists(null)) {
        GLib.mkdir_with_parents(dir, 0o755);
        script.make_symbolic_link(nautilus_target, null);
        Util.spawn(['/bin/bash', '-c', Utility.COMMAND_SET_EXECUTABLE
            .replace("{scriptPath}", nautilus_target)
        ]);
    }
}

function remove_file_manager_extention(){
    let dir = `${Utility.USER_DATA}${NAUTILUS_SCRIPT_PATH}`;
    let script = Gio.File.new_for_path(GLib.build_filenamev([dir, `Run on nVidia GPU`]));

    if (script.query_exists(null)) {
        script.delete(null);
    }
}

function install_binary(){
    let dir = `${Utility.USER_HOME}${BIN_PATH}`;
    let bin_target = `${Utility.EXTENSION_SCRIPT_PATH_ABSOLUTE}${BIN_NAME}`;
    let script = Gio.File.new_for_path(GLib.build_filenamev([dir, BIN_NAME]));

    if (!script.query_exists(null)) {
        GLib.mkdir_with_parents(dir, 0o755);
        script.make_symbolic_link(bin_target, null);
        Util.spawn(['/bin/bash', '-c', Utility.COMMAND_SET_EXECUTABLE
            .replace("{scriptPath}", bin_target)
        ]);
    }
}

function remove_binary(){
    let dir = `${Utility.USER_HOME}${BIN_PATH}`;
    let script = Gio.File.new_for_path(GLib.build_filenamev([dir, BIN_NAME]));

    if (script.query_exists(null)) {
        script.delete(null);
    }
}