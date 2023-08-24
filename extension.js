const Main = imports.ui.main;
const {St, GLib} = imports.gi;
const GObject = imports.gi.GObject;
const Gio = imports.gi.Gio;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = imports.misc.extensionUtils.getCurrentExtension();
const Util = imports.misc.util;
const Clutter = imports.gi.Clutter;

const {TopBarView, AttachedToBatteryView} = Me.imports.ui;
const {Utility, Scripts} = Me.imports.lib;

class Extension {
    enable() {
        // if there is no battery, there is no power management panel, so the extension moves to TopBar. If the gnome version is too old to have a quicksettings panel, we also move to the top bar.
        if (Utility.isBatteryPlugged() && imports.ui.quickSettings != undefined) {
            this.extensionViewTopbar = false
            this.extensionView = AttachedToBatteryView.getAttachedToBatteryView();
        } else {
            this.extensionViewTopbar = true
            this.extensionView = new TopBarView.TopBarView();
            Main.panel.addToStatusArea("GPU_SELECTOR", this.extensionView, 1);
            this.extensionView.enable();
        }

        //Add / remove file explorer extention and prime-run.
        const gpu_profile = Utility.getCurrentProfile();
        switch(gpu_profile){
            //Intel and Nvidia
            default:
                Scripts.remove_script(Utility.SCRIPT_TYPE_PRIME_NAUTILUS);
                Scripts.remove_script(Utility.SCRIPT_TYPE_PRIME_RUN);
                Scripts.remove_script(Utility.SCRIPT_TYPE_PRIME_ZINK_NAUTILUS);
                Scripts.remove_script(Utility.SCRIPT_TYPE_PRIME_RUN_ZINK);

                //Zink
                Scripts.install_script(Utility.SCRIPT_TYPE_ZINK_RUN_NAUTILUS);
                Scripts.install_script(Utility.SCRIPT_TYPE_ZINK_RUN);
                break;
            //Offload
            case Utility.GPU_PROFILE_HYBRID:
                Scripts.install_script(Utility.SCRIPT_TYPE_PRIME_NAUTILUS);
                Scripts.install_script(Utility.SCRIPT_TYPE_PRIME_RUN);
                
                //Zink
                Scripts.install_script(Utility.SCRIPT_TYPE_PRIME_ZINK_NAUTILUS);
                Scripts.install_script(Utility.SCRIPT_TYPE_PRIME_RUN_ZINK);
                Scripts.remove_script(Utility.SCRIPT_TYPE_ZINK_RUN_NAUTILUS);
                Scripts.remove_script(Utility.SCRIPT_TYPE_ZINK_RUN);
                break;
        }

    }

    disable() {
        this.extensionView.disable();
        // also topbar popup must be destroyed
        if (this.extensionViewTopbar !== null && this.extensionViewTopbar) {
            this.extensionViewTopbar = null
            this.extensionView.destroy();
        }
        this.extensionView = null;
    }
}

function init() {
    return new Extension();
}
