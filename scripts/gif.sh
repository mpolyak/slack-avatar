#!/bin/bash
# Generate example.gif using ffmpeg

cat << EOF | node | grep "images" | xargs cat | ffmpeg -f image2pipe -framerate 5 -i - -s 128x128 -filter_complex "[0]split=[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto" -y example.gif
const model = import("./src/model.mjs");

model.then(({State}) => {
	const state = new State();

	for (let i = 0; i < 30; i ++) {
		state.next();

		console.log(state.getImage());
	}
});
EOF
