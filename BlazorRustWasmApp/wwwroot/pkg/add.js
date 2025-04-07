// Key Points:
//
// __wbg_init: 
// The __wbg_init function initializes the wasm object, making all exported functions from the WebAssembly module accessible.
// Without this initialization step, wasm will remain undefined.
   
// Lazy Initialization in add: 
// In case the WebAssembly module isn't initialized when add is first called, we perform lazy initialization before calling the add function.
   
// Preload WASM on Page Load: 
// To improve responsiveness, we attempt to initialize the WebAssembly module as soon as the page loads.

import __wbg_init, { add } from './wasm_lib.js';

let wasmInitialized = false;

window.add = async (arg1, arg2) => {
    if (!wasmInitialized) {
        await __wbg_init(); 
        wasmInitialized = true;
        console.log('WASM module initialized');
    }
    
    return add(arg1, arg2); 
};

// Automatically initialize the WASM module when the page loads.
(async () => {
    try {
        await __wbg_init();
        wasmInitialized = true;
        console.log('WASM module preloaded');
    } catch (error) {
        console.error('Failed to initialize WASM module:', error);
    }
})();