// +build darwin dragonfly freebsd linux nacl netbsd openbsd solaris

package libkb

func AddFolderPrefix(filename string) string {
	return filename
}
