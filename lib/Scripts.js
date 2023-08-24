const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;
const Util = imports.misc.util;
const Me = imports.misc.extensionUtils.getCurrentExtension();
const {Utility} = Me.imports.lib;

const NAUTILUS_SCRIPT_PATH = `/nautilus/scripts`
const BIN_PATH = "/.local/bin"
const PRIME_NAUTILUS = `prime-run-nautilus`
const PRIME_ZINK_NAUTILUS = `prime-run-nautilus`
const PRIME_RUN = `prime-run`
const PRIME_RUN_ZINK = `prime-run-zink`
const ZINK_RUN_NAUTILUS = `zink-run-nautilus`
const ZINK_RUN = `zink-run`

function install_script(script_type){
    //return [dir, target, script];
    let props = _get_script_props(script_type);

    if(props[2].query_exists(null)){
        props[2].delete(null);
    }

    GLib.mkdir_with_parents(props[0], 0o755);
    props[2].make_symbolic_link(props[1], null);
    Util.spawn(['/bin/bash', '-c', Utility.COMMAND_SET_EXECUTABLE
        .replace("{scriptPath}", props[1])
    ]);
}

function remove_script(script_type){
    //return [dir, target, script];
    let props = _get_script_props(script_type);
    if (props[2].query_exists(null)) {
        props[2].delete(null);
    }
}

function _get_script_props(script_type){
    let dir = "";
    let target = "";
    let script = "";
    switch(script_type) {
        case Utility.SCRIPT_TYPE_PRIME_NAUTILUS:
            dir = `${Utility.USER_DATA}${NAUTILUS_SCRIPT_PATH}`;
            target = `${Utility.EXTENSION_SCRIPT_PATH_ABSOLUTE}${PRIME_NAUTILUS}`;
            script = Gio.File.new_for_path(GLib.build_filenamev([dir, `Run on nVidia GPU`]));
            break;
        case Utility.SCRIPT_TYPE_PRIME_ZINK_NAUTILUS:
            dir = `${Utility.USER_DATA}${NAUTILUS_SCRIPT_PATH}`;
            target = `${Utility.EXTENSION_SCRIPT_PATH_ABSOLUTE}${PRIME_ZINK_NAUTILUS}`;
            script = Gio.File.new_for_path(GLib.build_filenamev([dir, `Run on nVidia GPU with Zink`]));
            break;
        case Utility.SCRIPT_TYPE_PRIME_RUN:
            dir = `${Utility.USER_HOME}${BIN_PATH}`;
            target = `${Utility.EXTENSION_SCRIPT_PATH_ABSOLUTE}${PRIME_RUN}`;
            script = Gio.File.new_for_path(GLib.build_filenamev([dir, PRIME_RUN]));
            break;
        case Utility.SCRIPT_TYPE_PRIME_RUN_ZINK:
            dir = `${Utility.USER_HOME}${BIN_PATH}`;
            target = `${Utility.EXTENSION_SCRIPT_PATH_ABSOLUTE}${PRIME_RUN_ZINK}`;
            script = Gio.File.new_for_path(GLib.build_filenamev([dir, PRIME_RUN_ZINK]));
            break;
        case Utility.SCRIPT_TYPE_ZINK_RUN_NAUTILUS:
            dir = `${Utility.USER_DATA}${NAUTILUS_SCRIPT_PATH}`;
            target = `${Utility.EXTENSION_SCRIPT_PATH_ABSOLUTE}${ZINK_RUN_NAUTILUS}`;
            script = Gio.File.new_for_path(GLib.build_filenamev([dir, `Run with Zink`]));
            break;
        case Utility.SCRIPT_TYPE_ZINK_RUN:
            dir = `${Utility.USER_HOME}${BIN_PATH}`;
            target = `${Utility.EXTENSION_SCRIPT_PATH_ABSOLUTE}${ZINK_RUN}`;
            script = Gio.File.new_for_path(GLib.build_filenamev([dir, ZINK_RUN]));
            break;
    }
    return [dir, target, script];
}