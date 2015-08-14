// +build windows

package libkb

import (
	"path/filepath"
)

func AddFolderPrefix(filename string) string {
	return filepath.Join("Keybase", filename)
}
