// +build darwin dragonfly freebsd linux nacl netbsd openbsd solaris

package libkb

func (x XdgPosix) ConfigDir() string { return x.dirHelper("XDG_CONFIG_HOME", ".config") }
