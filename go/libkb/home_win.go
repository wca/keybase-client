// +build windows

package libkb

func (x XdgPosix) ConfigDir() string {
	return x.dirHelper("XDG_CONFIG_HOME", ".config")
}
