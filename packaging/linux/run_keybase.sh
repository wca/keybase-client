#!/bin/bash

set -e -u -o pipefail

# This is the script responsible for launching keybase on boot on Linux. A
# .desktop file will be created by the service on first launch in
# ~/.config/autostart/ to invoke this script.
#
# At some point, it would be nice to have all of this done by systemd, so that
# we could use all the nice facilities for restart-on-crash and dependency
# relationships and logging. But until systemd is more widely deployed, it's
# easier to do everything this way.

# Stop any existing services. These commands will return errors if keybase
# isn't already running, but putting them in if-statements prevents those
# errors from aborting the whole script.
if killall Keybase &> /dev/null ; then
  echo Shutting down Keybase GUI...
fi
if fusermount -uz /keybase &> /dev/null ; then
  echo Unmounting /keybase...
fi
if killall kbfsfuse &> /dev/null ; then
  echo Shutting down kbfsfuse...
fi
if killall keybase &> /dev/null ; then
  echo Shutting down keybase service...
fi

export KEYBASE_RUN_MODE=prod
export KEYBASE_DEBUG=1
logdir="${XDG_CACHE_HOME:-$HOME/.cache}/keybase"
mkdir -p "$logdir"

echo Launching keybase service...
keybase service &>> "$logdir/keybase.log" &
echo Mounting /keybase...
kbfsfuse -debug -mdserver mdserver.kbfs.keybase.io:443 \
  -bserver bserver.kbfs.keybase.io:443 /keybase &>> "$logdir/keybase.kbfs.log" &
echo Launching Keybase GUI...
/opt/keybase/Keybase &>> "$logdir/keybase.gui.log" &

echo 'Success!'
# Magical squirrel produced by https://github.com/erkin/ponysay
cat /opt/keybase/crypto_squirrel.txt
