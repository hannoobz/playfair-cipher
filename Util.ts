export default class Util {
	public static pipe<T>(...fns: Array<(arg: T) => T>) {
		return (initialValue: T): T => {
			return fns.reduce((acc, fn) => fn(acc), initialValue);
		};
	}
}
