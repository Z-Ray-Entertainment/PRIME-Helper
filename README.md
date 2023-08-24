# PRIME Helper GNOME Shell Extension

**based on this extension: <https://github.com/alexispurslane/PRIME-GPU-Profile-Selector>**

## Description
A GNOME Shell (version 41 and above) extension which provides a simple way to
switch between GPU profiles on Nvidia Optimus systems (i.e laptops with Intel
    + Nvidia) in a few clicks.

Designed to work with `suse-prime` and similar NVIDIA PRIME implementations, i.e. anything that provides the `prime-select` commands.

## Features
- Switch between Intel, Nvidia and PRIME Offload mode
- Nautilus script to run executables on nVidia GPU if running in offload mode
- Nautilus Script to run Application via Zink (OpenGL over Vulkan) if in nvidia or intel mode
- Nautilus Script to run application on your nVidia GPU in offload mode with Zink enabled if running in offload mode
- `prime-run` utility to run applications from CLI on nVidia dGPUs if running in nvidia or intel mode
- `zink-run` utility to run application from CLI via Zink (OpenGL over Vulkan) if running in nvidia or intel
- `prime-run-zink` utility to run applications from CLI on nVidia dGPUs with Zink enabled if running in offload mode

## Dependencies
- `pkexec`
- [bash](https://www.gnu.org/software/bash/)
- `suse-prime`, `fedora-prime`, or (for other Linux distros),
  [nvidia-prime-select](https://github.com/wildtruc/nvidia-prime-select)

## Installation

### Gnome-shell Extension website
- Install all the [dependencies](#Dependencies)
- Enable extension in official [Gnome Extension](https://extensions.gnome.org/extension/5937/prime-gpu-profile-selector/) store

### Manual
- Install all the [dependencies](#Dependencies)
- Clone this repo with:
  ```
  git clone git@github.com:Z-Ray-Entertainment/PRIME-Helper.git ~/.local/share/gnome-shell/extensions/PRIME_Helper@z-ray.de
  ```
## Debuging and packaging

### For looking command line logs
```
journalctl -f -o cat /usr/bin/gnome-shell
```

### For looking updates using wayland (it opens a new wayland session in a window)
```
dbus-run-session -- gnome-shell --nested --wayland
```

### Packaging the extension source for gnome extension website
```
gnome-extensions pack \
--extra-source="README.md" \
--extra-source="LICENSE" \
--extra-source="img" \
--extra-source="ui" \
--extra-source="lib" \
--extra-source="script"
```
