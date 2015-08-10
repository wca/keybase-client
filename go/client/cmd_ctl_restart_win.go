// +build windows

package client

import (
	"time"
)

func (s *CmdCtlRestart) Run() error {
	cli, err := GetCtlClient()
	if err != nil {
		return err
	}
	if err = cli.Stop(); err != nil {
		G.Log.Warning("Stop failed: %s", err)
		return err
	}

	// Wait a few seconds before the server stops
	G.Log.Info("Delaying for shutdown...")
	time.Sleep(2 * time.Second)
	G.Log.Info("Restart")
	//return ForkServerNix(G.Env.GetCommandLine())
	return nil;
}
