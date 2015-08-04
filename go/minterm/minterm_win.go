// +build windows

// Package minterm implements minimal terminal functions.
package minterm

import (
	"golang.org/x/crypto/ssh/terminal"
)

func (m *MinTerm) open() error {
	f, err := os.OpenFile("/dev/tty", os.O_RDWR, 0)
	if err != nil {
		return err
	}
	m.tty = f
	m.out = m.tty
	m.in = m.tty
	fd := int(m.tty.Fd())
	w, h, err := terminal.GetSize(fd)
	if err != nil {
		return err
	}
	m.width, m.height = w, h
	return nil
}
