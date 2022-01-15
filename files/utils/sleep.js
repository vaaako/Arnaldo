function msleep(n) {
	Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}
module.exports.sleep = function(n){
	msleep(n);
}

