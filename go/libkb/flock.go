package libkb

import (
	//"fmt"
	"os"
	//"syscall"
)

type LockPIDFile struct {
	name string
	file *os.File
}

func NewLockPIDFile(s string) *LockPIDFile {
	return &LockPIDFile{name: s}
}
