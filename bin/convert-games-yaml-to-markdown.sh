#!/usr/bin/env bash

pos=100
while read l; do
    if [[ $l =~ \"([^\[]*)\[([^\]]*)\] ]]; then
        game=$(echo ${BASH_REMATCH[1]} | xargs)
        platform=${BASH_REMATCH[2]}
    fi

    file="src/content/games/${pos}_${game}.md"
    touch "$file"
    echo "$file"
    echo "---" >> "$file"
    echo "date_added: '$(date '+%Y-%m-%d')'" >> "$file"
    echo "game: '${game}'" >> "$file"
    echo "platform: '${platform}'" >> "$file"
    echo "---" >> "$file"
    exit

    pos=$((pos + 100))
done <src/pages/posts/video-games/video-games.yaml
