#!/bin/bash

source ./scripts/defines.sh

# Install the mod from the repo to Factorio
echo "${factorio_mod_dir}"
rm -rf "${factorio_mod_dir}"
cp -R "${local_build_dir}/" "${factorio_mod_dir}"
cp -R "${local_mod_dir}/" "${factorio_mod_dir}"
