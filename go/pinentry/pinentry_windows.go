// +build windows

package pinentry

import (
	"fmt"

	"github.com/keybase/client/go/logger"
)

func IsRemote() bool {
	return false
}

func FindPinentry(log *logger.Logger) (string, error) {
	return "", fmt.Errorf("windows does not support pinentry yet, not using pinentry")
}