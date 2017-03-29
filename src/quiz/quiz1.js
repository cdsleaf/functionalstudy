/*
 아래에 나오는 함수를 함수형으로 구현해 보는게 문제입니다 :)
 스텝바이 스텝으로 책에 나온 과정처럼 기본 기능 구현 -> 추상화 -> 함수의 조합으로 문제 해결 이렇게 해보시면 좋습니다

 sum(1, 2, 3, 4, 5);
 sumArr([1, 2, 3, 4, 5]);
 safeSum(1, null, 3, 4, 5);
 safeMultiply(1, null, 3, 4, 5);
 checkObj(객체형인지 확인, 특정프로퍼티가 있는지 확인, 특정 프로퍼티의 값이 숫자인지 확인);
 */

let fnSum = (result, num) => result+num;
let fnMultiply = (result, num) => result*num;
let safe = (func, initValue) => (...args) => _.reduce(args, fnull(func, 1, 1),initValue);

let sum = (...args) => sumArr(args);
let sumArr = arr => _.reduce(arr, fnSum, 0);
let safeSum = safe(fnSum, 0);
let safeMultiply = safe(fnMultiply, 1);

//특정 프로퍼티의 값이 숫자이다.isNumber 로 체크
let valueCheck = (func, ...keys) => {

    let fun = obj => _.every(keys, k => func(obj[k]));

    fun.message = cat(["값이 유효하지 않음: " ], keys).join(" ");

    return fun;
}
let checkObj = checker(validator("객체형이 아닙니다.",aMap), hasKeys('msg', 'type'), valueCheck(_.isNumber, 'type'));