
export default class ArrayFind {
    static find(array, check) {
        var result;
        for (var item in array) {
            if (check(array[item])) {
                result = array[item];
                break;
            }
        }
        return result;
    }
}