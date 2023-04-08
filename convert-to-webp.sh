#!/usr/bin/env bash
#
shopt -s extglob
shopt -s nullglob
for i in *.{png,jpg,jpeg,PNG}; do
    cwebp "$i" -o "${i%.*}".webp
done
rm -rf *.{png,jpg,jpeg,PNG}
