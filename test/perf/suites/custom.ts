const array1 = new Array(30).fill(0);
const array2 = new Array(30).fill(0);

export const customTests: Array<(() => void)> = [
    function concat () {
        return array1.concat(array2);
    },
    function spread () {
        return [...array1, ...array2];
    },
    function forPush () {
        const arr = [];
        for (let i = 0; i < array1.length; i++) {
            arr.push(array1[i]);
        }
        for (let i = 0; i < array2.length; i++) {
            arr.push(array2[i]);
        }
    },
    function forAssign () {
        const arr = [];
        for (let i = 0; i < array1.length; i++) {
            arr[i] = array1[1];
        }
        for (let i = 0; i < array2.length; i++) {
            arr[arr.length] = array2[i];
        }
    },
];
