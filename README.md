# PRIME Helper GNOME Shell Extension

**based on this extension: <https://github.com/alexispurslane/PRIME-GPU-Profile-Selector>**

## Description
A GNOME Shell (version 41 and above) extension which provides a simple way to
switch between GPU profiles on Nvidia Optimus systems (i.e laptops with Intel
    + Nvidia) in a few clicks.

Designed to work with `suse-prime` and similar NVIDIA PRIME implementations, i.e. anything that provides the `prime-select` commands.

## Features
- Switch between Intel, Nvidia and PRIME Offload mode

### Offload mode
- Nautilus script to run executables on nVidia dGPU
- Nautilus Script to run application on nVidia dGPU with Zink enabled
- `prime-run` utility to run applications from CLI on nVidia dGPU
- `prime-run-zink` utility to run applications from CLI on nVidia dGPU with Zink enabled

### Intel and NVidia mode
- Nautilus Script to run application via Zink (OpenGL over Vulkan)
- `zink-run` utility to run application from CLI via Zink (OpenGL over Vulkan)

## Steam Launch Options
To make use of the addional utility scripts add the following to your steam launch options:
### Zink (nvidia and intel mode only)
`zink-run %command%`
or if running flatpak Steam:
`$HOME/.local/bin/zink-run %command%`
### Prime with Zink enabled (Offload mode only)
`prime-run-zink %command%`
or if running flatpak Steam:
`$HOME/.local/bin/prime-run-zink %command%`
### Prime (Offload mode only)
`prime-run %command%`
or if running flatpak Steam:
`$HOME/.local/bin/prime-run %command%`

## Dependencies
- `pkexec`
- [bash](https://www.gnu.org/software/bash/)
- `suse-prime`, `fedora-prime`, or (for other Linux distros),
  [nvidia-prime-select](https://github.com/wildtruc/nvidia-prime-select)

## Installation

### Gnome-shell Extension website
- Install all the [dependencies](#Dependencies)
- Enable extension in official [Gnome Extension](https://extensions.gnome.org/extension/5937/prime-gpu-profile-selector/) store
- Make sure `~/.local/bin/` is in your `$PATH` for various utility scripts to function from CLI
#### Flatpak
If running apps via flatpak make sure you add `~/.local/bin/` to the list of allowed directories via flatseal. 

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
