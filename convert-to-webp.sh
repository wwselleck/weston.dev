#!/usr/bin/env bash
#
shopt -s extglob
shopt -s nullglob
for i in *.{png,jpg,jpeg}; do
    cwebp "$i" -o "${i%.*}".webp
done
