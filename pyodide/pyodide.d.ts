// Generated by dts-bundle-generator v6.7.0

/**
 *
 * The Pyodide version.
 *
 * The version here follows PEP440 which is different from the one in package.json,
 * as we want to compare this with the version of Pyodide Python package without conversion.
 */
export declare const version: string;
declare function isPyProxy(jsobj: any): jsobj is PyProxy;
declare type PyProxyCache = {
	cacheId: number;
	refcnt: number;
	leaked?: boolean;
};
export declare type PyProxy = PyProxyClass & {
	[x: string]: any;
};
declare class PyProxyClass {
	$$: {
		ptr: number;
		cache: PyProxyCache;
		destroyed_msg?: string;
	};
	$$flags: number;
	/** @private */
	constructor();
	get [Symbol.toStringTag](): string;
	/**
	 * The name of the type of the object.
	 *
	 * Usually the value is ``"module.name"`` but for builtins or
	 * interpreter-defined types it is just ``"name"``. As pseudocode this is:
	 *
	 * .. code-block:: python
	 *
	 *    ty = type(x)
	 *    if ty.__module__ == 'builtins' or ty.__module__ == "__main__":
	 *        return ty.__name__
	 *    else:
	 *        ty.__module__ + "." + ty.__name__
	 *
	 */
	get type(): string;
	toString(): string;
	/**
	 * Destroy the ``PyProxy``. This will release the memory. Any further attempt
	 * to use the object will raise an error.
	 *
	 * In a browser supporting `FinalizationRegistry
	 * <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry>`_
	 * Pyodide will automatically destroy the ``PyProxy`` when it is garbage
	 * collected, however there is no guarantee that the finalizer will be run in
	 * a timely manner so it is better to ``destroy`` the proxy explicitly.
	 *
	 * @param destroyed_msg The error message to print if use is attempted after
	 *        destroying. Defaults to "Object has already been destroyed".
	 */
	destroy(destroyed_msg?: string): void;
	/**
	 * Make a new PyProxy pointing to the same Python object.
	 * Useful if the PyProxy is destroyed somewhere else.
	 */
	copy(): PyProxy;
	/**
	 * Converts the ``PyProxy`` into a JavaScript object as best as possible. By
	 * default does a deep conversion, if a shallow conversion is desired, you can
	 * use ``proxy.toJs({depth : 1})``. See :ref:`Explicit Conversion of PyProxy
	 * <type-translations-pyproxy-to-js>` for more info.
	 * @param options
	 * @return The JavaScript object resulting from the conversion.
	 */
	toJs({ depth, pyproxies, create_pyproxies, dict_converter, default_converter, }?: {
		/** How many layers deep to perform the conversion. Defaults to infinite */
		depth?: number;
		/**
		 * If provided, ``toJs`` will store all PyProxies created in this list. This
		 * allows you to easily destroy all the PyProxies by iterating the list
		 * without having to recurse over the generated structure. The most common
		 * use case is to create a new empty list, pass the list as `pyproxies`, and
		 * then later iterate over `pyproxies` to destroy all of created proxies.
		 */
		pyproxies?: PyProxy[];
		/**
		 * If false, ``toJs`` will throw a ``ConversionError`` rather than
		 * producing a ``PyProxy``.
		 */
		create_pyproxies?: boolean;
		/**
		 * A function to be called on an iterable of pairs ``[key, value]``. Convert
		 * this iterable of pairs to the desired output. For instance,
		 * ``Object.fromEntries`` would convert the dict to an object, ``Array.from``
		 * converts it to an array of entries, and ``(it) => new Map(it)`` converts
		 * it to a ``Map`` (which is the default behavior).
		 */
		dict_converter?: (array: Iterable<[
			key: string,
			value: any
		]>) => any;
		/**
		 * Optional argument to convert objects with no default conversion. See the
		 * documentation of :any:`pyodide.ffi.to_js`.
		 */
		default_converter?: (obj: PyProxy, convert: (obj: PyProxy) => any, cacheConversion: (obj: PyProxy, result: any) => void) => any;
	}): any;
	/**
	 * Check whether the :any:`PyProxy.length` getter is available on this PyProxy. A
	 * Typescript type guard.
	 */
	supportsLength(): this is PyProxyWithLength;
	/**
	 * Check whether the :any:`PyProxy.get` method is available on this PyProxy. A
	 * Typescript type guard.
	 */
	supportsGet(): this is PyProxyWithGet;
	/**
	 * Check whether the :any:`PyProxy.set` method is available on this PyProxy. A
	 * Typescript type guard.
	 */
	supportsSet(): this is PyProxyWithSet;
	/**
	 * Check whether the :any:`PyProxy.has` method is available on this PyProxy. A
	 * Typescript type guard.
	 */
	supportsHas(): this is PyProxyWithHas;
	/**
	 * Check whether the PyProxy is iterable. A Typescript type guard for
	 * :any:`PyProxy.[iterator]`.
	 */
	isIterable(): this is PyProxyIterable;
	/**
	 * Check whether the PyProxy is iterable. A Typescript type guard for
	 * :any:`PyProxy.next`.
	 */
	isIterator(): this is PyProxyIterator;
	/**
	 * Check whether the PyProxy is awaitable. A Typescript type guard, if this
	 * function returns true Typescript considers the PyProxy to be a ``Promise``.
	 */
	isAwaitable(): this is PyProxyAwaitable;
	/**
	 * Check whether the PyProxy is a buffer. A Typescript type guard for
	 * :any:`PyProxy.getBuffer`.
	 */
	isBuffer(): this is PyProxyBuffer;
	/**
	 * Check whether the PyProxy is a Callable. A Typescript type guard, if this
	 * returns true then Typescript considers the Proxy to be callable of
	 * signature ``(args... : any[]) => PyProxy | number | bigint | string |
	 * boolean | undefined``.
	 */
	isCallable(): this is PyProxyCallable;
}
export declare type PyProxyWithLength = PyProxy & PyProxyLengthMethods;
declare class PyProxyLengthMethods {
	/**
	 * The length of the object.
	 *
	 * Present only if the proxied Python object has a ``__len__`` method.
	 */
	get length(): number;
}
export declare type PyProxyWithGet = PyProxy & PyProxyGetItemMethods;
declare class PyProxyGetItemMethods {
	/**
	 * This translates to the Python code ``obj[key]``.
	 *
	 * Present only if the proxied Python object has a ``__getitem__`` method.
	 *
	 * @param key The key to look up.
	 * @returns The corresponding value.
	 */
	get(key: any): any;
}
export declare type PyProxyWithSet = PyProxy & PyProxySetItemMethods;
declare class PyProxySetItemMethods {
	/**
	 * This translates to the Python code ``obj[key] = value``.
	 *
	 * Present only if the proxied Python object has a ``__setitem__`` method.
	 *
	 * @param key The key to set.
	 * @param value The value to set it to.
	 */
	set(key: any, value: any): void;
	/**
	 * This translates to the Python code ``del obj[key]``.
	 *
	 * Present only if the proxied Python object has a ``__delitem__`` method.
	 *
	 * @param key The key to delete.
	 */
	delete(key: any): void;
}
export declare type PyProxyWithHas = PyProxy & PyProxyContainsMethods;
declare class PyProxyContainsMethods {
	/**
	 * This translates to the Python code ``key in obj``.
	 *
	 * Present only if the proxied Python object has a ``__contains__`` method.
	 *
	 * @param key The key to check for.
	 * @returns Is ``key`` present?
	 */
	has(key: any): boolean;
}
export declare type PyProxyIterable = PyProxy & PyProxyIterableMethods;
declare class PyProxyIterableMethods {
	/**
	 * This translates to the Python code ``iter(obj)``. Return an iterator
	 * associated to the proxy. See the documentation for `Symbol.iterator
	 * <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator>`_.
	 *
	 * Present only if the proxied Python object is iterable (i.e., has an
	 * ``__iter__`` method).
	 *
	 * This will be used implicitly by ``for(let x of proxy){}``.
	 */
	[Symbol.iterator](): Iterator<any, any, any>;
}
export declare type PyProxyIterator = PyProxy & PyProxyIteratorMethods;
declare class PyProxyIteratorMethods {
	/** @private */
	[Symbol.iterator](): this;
	/**
	 * This translates to the Python code ``next(obj)``. Returns the next value of
	 * the generator. See the documentation for `Generator.prototype.next
	 * <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/next>`_.
	 * The argument will be sent to the Python generator.
	 *
	 * This will be used implicitly by ``for(let x of proxy){}``.
	 *
	 * Present only if the proxied Python object is a generator or iterator (i.e.,
	 * has a ``send`` or ``__next__`` method).
	 *
	 * @param any The value to send to the generator. The value will be assigned
	 * as a result of a yield expression.
	 * @returns An Object with two properties: ``done`` and ``value``. When the
	 * generator yields ``some_value``, ``next`` returns ``{done : false, value :
	 * some_value}``. When the generator raises a ``StopIteration(result_value)``
	 * exception, ``next`` returns ``{done : true, value : result_value}``.
	 */
	next(arg?: any): IteratorResult<any, any>;
}
export declare type PyProxyAwaitable = PyProxy & Promise<any>;
export declare type PyProxyCallable = PyProxy & PyProxyCallableMethods & ((...args: any[]) => any);
declare class PyProxyCallableMethods {
	apply(jsthis: PyProxyClass, jsargs: any): any;
	call(jsthis: PyProxyClass, ...jsargs: any): any;
	/**
	 * Call the function with key word arguments.
	 * The last argument must be an object with the keyword arguments.
	 */
	callKwargs(...jsargs: any): any;
	/**
	 * No-op bind function for compatibility with existing libraries
	 */
	bind(placeholder: any): this;
}
export declare type PyProxyBuffer = PyProxy & PyProxyBufferMethods;
declare class PyProxyBufferMethods {
	/**
	 * Get a view of the buffer data which is usable from JavaScript. No copy is
	 * ever performed.
	 *
	 * Present only if the proxied Python object supports the `Python Buffer
	 * Protocol <https://docs.python.org/3/c-api/buffer.html>`_.
	 *
	 * We do not support suboffsets, if the buffer requires suboffsets we will
	 * throw an error. JavaScript nd array libraries can't handle suboffsets
	 * anyways. In this case, you should use the :any:`toJs` api or copy the
	 * buffer to one that doesn't use suboffets (using e.g.,
	 * `numpy.ascontiguousarray
	 * <https://numpy.org/doc/stable/reference/generated/numpy.ascontiguousarray.html>`_).
	 *
	 * If the buffer stores big endian data or half floats, this function will
	 * fail without an explicit type argument. For big endian data you can use
	 * ``toJs``. `DataViews
	 * <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView>`_
	 * have support for big endian data, so you might want to pass
	 * ``'dataview'`` as the type argument in that case.
	 *
	 * @param type The type of the :any:`PyBuffer.data <pyodide.PyBuffer.data>` field in the
	 * output. Should be one of: ``"i8"``, ``"u8"``, ``"u8clamped"``, ``"i16"``,
	 * ``"u16"``, ``"i32"``, ``"u32"``, ``"i32"``, ``"u32"``, ``"i64"``,
	 * ``"u64"``, ``"f32"``, ``"f64``, or ``"dataview"``. This argument is
	 * optional, if absent ``getBuffer`` will try to determine the appropriate
	 * output type based on the buffer `format string
	 * <https://docs.python.org/3/library/struct.html#format-strings>`_.
	 * @returns :any:`PyBuffer <pyodide.PyBuffer>`
	 */
	getBuffer(type?: string): PyBuffer;
}
export declare type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array;
export declare type PyProxyDict = PyProxyWithGet & PyProxyWithSet & PyProxyWithHas;
/**
 * A class to allow access to a Python data buffers from JavaScript. These are
 * produced by :any:`PyProxy.getBuffer` and cannot be constructed directly.
 * When you are done, release it with the :any:`release <PyBuffer.release>`
 * method.  See
 * `Python buffer protocol documentation
 * <https://docs.python.org/3/c-api/buffer.html>`_ for more information.
 *
 * To find the element ``x[a_1, ..., a_n]``, you could use the following code:
 *
 * .. code-block:: js
 *
 *    function multiIndexToIndex(pybuff, multiIndex){
 *       if(multindex.length !==pybuff.ndim){
 *          throw new Error("Wrong length index");
 *       }
 *       let idx = pybuff.offset;
 *       for(let i = 0; i < pybuff.ndim; i++){
 *          if(multiIndex[i] < 0){
 *             multiIndex[i] = pybuff.shape[i] - multiIndex[i];
 *          }
 *          if(multiIndex[i] < 0 || multiIndex[i] >= pybuff.shape[i]){
 *             throw new Error("Index out of range");
 *          }
 *          idx += multiIndex[i] * pybuff.stride[i];
 *       }
 *       return idx;
 *    }
 *    console.log("entry is", pybuff.data[multiIndexToIndex(pybuff, [2, 0, -1])]);
 *
 * .. admonition:: Contiguity
 *    :class: warning
 *
 *    If the buffer is not contiguous, the ``data`` TypedArray will contain
 *    data that is not part of the buffer. Modifying this data may lead to
 *    undefined behavior.
 *
 * .. admonition:: Readonly buffers
 *    :class: warning
 *
 *    If ``buffer.readonly`` is ``true``, you should not modify the buffer.
 *    Modifying a readonly buffer may lead to undefined behavior.
 *
 * .. admonition:: Converting between TypedArray types
 *    :class: warning
 *
 *    The following naive code to change the type of a typed array does not
 *    work:
 *
 *    .. code-block:: js
 *
 *        // Incorrectly convert a TypedArray.
 *        // Produces a Uint16Array that points to the entire WASM memory!
 *        let myarray = new Uint16Array(buffer.data.buffer);
 *
 *    Instead, if you want to convert the output TypedArray, you need to say:
 *
 *    .. code-block:: js
 *
 *        // Correctly convert a TypedArray.
 *        let myarray = new Uint16Array(
 *            buffer.data.buffer,
 *            buffer.data.byteOffset,
 *            buffer.data.byteLength
 *        );
 */
export declare class PyBuffer {
	/**
	 * The offset of the first entry of the array. For instance if our array
	 * is 3d, then you will find ``array[0,0,0]`` at
	 * ``pybuf.data[pybuf.offset]``
	 */
	offset: number;
	/**
	 * If the data is readonly, you should not modify it. There is no way
	 * for us to enforce this, but it may cause very weird behavior.
	 */
	readonly: boolean;
	/**
	 * The format string for the buffer. See `the Python documentation on
	 * format strings
	 * <https://docs.python.org/3/library/struct.html#format-strings>`_.
	 */
	format: string;
	/**
	 * How large is each entry (in bytes)?
	 */
	itemsize: number;
	/**
	 * The number of dimensions of the buffer. If ``ndim`` is 0, the buffer
	 * represents a single scalar or struct. Otherwise, it represents an
	 * array.
	 */
	ndim: number;
	/**
	 * The total number of bytes the buffer takes up. This is equal to
	 * ``buff.data.byteLength``.
	 */
	nbytes: number;
	/**
	 * The shape of the buffer, that is how long it is in each dimension.
	 * The length will be equal to ``ndim``. For instance, a 2x3x4 array
	 * would have shape ``[2, 3, 4]``.
	 */
	shape: number[];
	/**
	 * An array of of length ``ndim`` giving the number of elements to skip
	 * to get to a new element in each dimension. See the example definition
	 * of a ``multiIndexToIndex`` function above.
	 */
	strides: number[];
	/**
	 * The actual data. A typed array of an appropriate size backed by a
	 * segment of the WASM memory.
	 *
	 * The ``type`` argument of :any:`PyProxy.getBuffer`
	 * determines which sort of ``TypedArray`` this is. By default
	 * :any:`PyProxy.getBuffer` will look at the format string to determine the most
	 * appropriate option.
	 */
	data: TypedArray;
	/**
	 * Is it C contiguous?
	 */
	c_contiguous: boolean;
	/**
	 * Is it Fortran contiguous?
	 */
	f_contiguous: boolean;
	/**
	 * @private
	 */
	_released: boolean;
	/**
	 * @private
	 */
	_view_ptr: number;
	/**
	 * @private
	 */
	constructor();
	/**
	 * Release the buffer. This allows the memory to be reclaimed.
	 */
	release(): void;
}
declare function loadPackage(names: string | PyProxy | Array<string>, messageCallback?: (msg: string) => void, errorCallback?: (msg: string) => void): Promise<void>;
declare let loadedPackages: {
	[key: string]: string;
};
declare class PythonError extends Error {
	/**  The address of the error we are wrapping. We may later compare this
	 * against sys.last_value.
	 * WARNING: we don't own a reference to this pointer, dereferencing it
	 * may be a use-after-free error!
	 * @private
	 */
	__error_address: number;
	constructor(message: string, error_address: number);
}
declare let pyodide_py: PyProxy;
declare let globals: PyProxy;
declare function runPython(code: string, options?: {
	globals?: PyProxy;
}): any;
declare function loadPackagesFromImports(code: string, messageCallback?: (msg: string) => void, errorCallback?: (err: string) => void): Promise<void>;
declare function runPythonAsync(code: string, options?: {
	globals?: PyProxy;
}): Promise<any>;
declare function registerJsModule(name: string, module: object): void;
declare function registerComlink(Comlink: any): void;
declare function unregisterJsModule(name: string): void;
declare function toPy(obj: any, { depth, defaultConverter, }?: {
	/**
	 *  Optional argument to limit the depth of the conversion.
	 */
	depth: number;
	/**
	 * Optional argument to convert objects with no default conversion. See the
	 * documentation of :any:`JsProxy.to_py`.
	 */
	defaultConverter?: (value: any, converter: (value: any) => any, cacheConversion: (input: any, output: any) => any) => any;
}): any;
declare function pyimport(mod_name: string): PyProxy;
declare function unpackArchive(buffer: TypedArray | ArrayBuffer, format: string, options?: {
	extractDir?: string;
}): void;
declare function setInterruptBuffer(interrupt_buffer: TypedArray): void;
declare function checkInterrupt(): void;
export declare type PyodideInterface = {
	globals: typeof globals;
	FS: typeof FS;
	PATH: typeof PATH;
	ERRNO_CODES: typeof ERRNO_CODES;
	pyodide_py: typeof pyodide_py;
	version: typeof version;
	loadPackage: typeof loadPackage;
	loadPackagesFromImports: typeof loadPackagesFromImports;
	loadedPackages: typeof loadedPackages;
	isPyProxy: typeof isPyProxy;
	runPython: typeof runPython;
	runPythonAsync: typeof runPythonAsync;
	registerJsModule: typeof registerJsModule;
	unregisterJsModule: typeof unregisterJsModule;
	setInterruptBuffer: typeof setInterruptBuffer;
	checkInterrupt: typeof checkInterrupt;
	toPy: typeof toPy;
	pyimport: typeof pyimport;
	unpackArchive: typeof unpackArchive;
	registerComlink: typeof registerComlink;
	PythonError: typeof PythonError;
	PyBuffer: typeof PyBuffer;
};
declare let FS: any;
declare let PATH: any;
declare let ERRNO_CODES: any;
export declare type Py2JsResult = any;
/**
 * See documentation for loadPyodide.
 * @private
 */
export declare type ConfigType = {
	indexURL: string;
	lockFileURL: string;
	homedir: string;
	fullStdLib?: boolean;
	stdin?: () => string;
	stdout?: (msg: string) => void;
	stderr?: (msg: string) => void;
	jsglobals?: object;
};
/**
 * Load the main Pyodide wasm module and initialize it.
 *
 * Only one copy of Pyodide can be loaded in a given JavaScript global scope
 * because Pyodide uses global variables to load packages. If an attempt is made
 * to load a second copy of Pyodide, :any:`loadPyodide` will throw an error.
 * (This can be fixed once `Firefox adopts support for ES6 modules in webworkers
 * <https://bugzilla.mozilla.org/show_bug.cgi?id=1247687>`_.)
 *
 * @returns The :ref:`js-api-pyodide` module.
 * @memberof globalThis
 * @async
 */
export declare function loadPyodide(options?: {
	/**
	 * The URL from which Pyodide will load the main Pyodide runtime and
	 * packages. Defaults to the url that pyodide is loaded from with the file
	 * name (pyodide.js or pyodide.mjs) removed. It is recommended that you
	 * leave this undefined, providing an incorrect value can cause broken
	 * behavior.
	 */
	indexURL?: string;
	/**
	 * The URL from which Pyodide will load the Pyodide "repodata.json" lock
	 * file. Defaults to ``${indexURL}/repodata.json``. You can produce custom
	 * lock files with :any:`micropip.freeze`
	 */
	lockFileURL?: string;
	/**
	 * The home directory which Pyodide will use inside virtual file system. Default: "/home/pyodide"
	 */
	homedir?: string;
	/** Load the full Python standard library.
	 * Setting this to false excludes following modules: distutils.
	 * Default: true
	 */
	fullStdLib?: boolean;
	/**
	 * Override the standard input callback. Should ask the user for one line of input.
	 */
	stdin?: () => string;
	/**
	 * Override the standard output callback.
	 * Default: undefined
	 */
	stdout?: (msg: string) => void;
	/**
	 * Override the standard error output callback.
	 * Default: undefined
	 */
	stderr?: (msg: string) => void;
	jsglobals?: object;
}): Promise<PyodideInterface>;

export {};
