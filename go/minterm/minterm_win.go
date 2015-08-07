// +build windows

// Package minterm implements minimal terminal functions.
package minterm

import (
	"github.com/nsf/termbox-go"
)

func (m *MinTerm) open() error {
	/*
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
	*/
	if err := termbox.Init(); err != nil {
		return err
	}
	w, h := termbox.Size()
	m.width, m.height = w, h
	termbox.Close()

	return nil
}
