// +build windows

package libkb

import (
	//"fmt"
	"os"

	"errors"
	"strings"
)

func CanExec(s string) error {
	_, err := LookPath(s)

	return err

	/*
		fi, err := os.Stat(s)
		if err != nil {
			return err
		}
		mode := fi.Mode()

		//
		// Only consider non-directories that have at least one +x
		//  bit set.
		//
		// TODO: Recheck this on windows!
		//   See here for lookpath: http://golang.org/src/pkg/os/exec/lp_windows.go
		//
		// Similar to check from exec.LookPath below
		//   See here: http://golang.org/src/pkg/os/exec/lp_unix.go
		//
		if mode.IsDir() {
			return fmt.Errorf("Program '%s' is a directory", s)
		} else if int(mode)&0111 == 0 {
			return fmt.Errorf("Program '%s' isn't executable", s)
		} else {
			return nil
		}
	*/
}

// ErrNotFound is the error resulting if a path search failed to find an executable file.
var ErrNotFound = errors.New("executable file not found in %PATH%")

func chkStat(file string) error {
	d, err := os.Stat(file)
	if err != nil {
		return err
	}
	if d.IsDir() {
		return os.ErrPermission
	}
	return nil
}

func hasExt(file string) bool {
	i := strings.LastIndex(file, ".")
	if i < 0 {
		return false
	}
	return strings.LastIndexAny(file, `:\/`) < i
}

func findExecutable(file string, exts []string) (string, error) {
	if len(exts) == 0 {
		return file, chkStat(file)
	}
	if hasExt(file) {
		if chkStat(file) == nil {
			return file, nil
		}
	}
	for _, e := range exts {
		if f := file + e; chkStat(f) == nil {
			return f, nil
		}
	}
	return ``, os.ErrNotExist
}

// LookPath searches for an executable binary named file
// in the directories named by the PATH environment variable.
// If file contains a slash, it is tried directly and the PATH is not consulted.
// LookPath also uses PATHEXT environment variable to match
// a suitable candidate.
// The result may be an absolute path or a path relative to the current directory.
func LookPath(file string) (f string, err error) {
	x := os.Getenv(`PATHEXT`)
	if x == `` {
		x = `.COM;.EXE;.BAT;.CMD`
	}
	exts := []string{}
	for _, e := range strings.Split(strings.ToLower(x), `;`) {
		if e == "" {
			continue
		}
		if e[0] != '.' {
			e = "." + e
		}
		exts = append(exts, e)
	}
	if strings.IndexAny(file, `:\/`) != -1 {
		if f, err = findExecutable(file, exts); err == nil {
			return
		}
		return ``, err
	}
	if f, err = findExecutable(`.\`+file, exts); err == nil {
		return
	}
	if pathenv := os.Getenv(`PATH`); pathenv != `` {
		for _, dir := range splitList(pathenv) {
			if f, err = findExecutable(dir+`\`+file, exts); err == nil {
				return
			}
		}
	}
	return ``, os.ErrNotExist
}

func splitList(path string) []string {
	// The same implementation is used in SplitList in path/filepath;
	// consider changing path/filepath when changing this.

	if path == "" {
		return []string{}
	}

	// Split path, respecting but preserving quotes.
	list := []string{}
	start := 0
	quo := false
	for i := 0; i < len(path); i++ {
		switch c := path[i]; {
		case c == '"':
			quo = !quo
		case c == os.PathListSeparator && !quo:
			list = append(list, path[start:i])
			start = i + 1
		}
	}
	list = append(list, path[start:])

	// Remove quotes.
	for i, s := range list {
		if strings.Contains(s, `"`) {
			list[i] = strings.Replace(s, `"`, ``, -1)
		}
	}

	return list
}
