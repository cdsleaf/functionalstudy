/**
 * Created by cho on 2017-03-24.
 */

//5장 준비.

//invoker 생성시에 넣어둔 메서드가 실행할때 넘어오는 target의 요소인 경우에만 실행되는 함수를 반환

//dispatch는 인자로 받는 여러 함수들의 조합으로 새로운 다형적 함수를 만들 수 있다.
function dispatch(/* funs */) {
    var funs = _.toArray(arguments);
    var size = funs.length;

    return function(target /*, args */) {
        var ret = undefined;
        var args = _.rest(arguments);

        for (var funIndex = 0; funIndex < size; funIndex++) {
            var fun = funs[funIndex];
            ret = fun.apply(fun, construct(target, args));

            if (existy(ret)) return ret;
        }

        return ret;
    };
}
//dispatch로 특정 함수를 래핑해서 새 기능을 추가할 수도 있고, 두 개 이상의 dispatch가 연결된 dispatch 체인으로 특정 명령을 오버라이드해서
//그 명령이 수행되지 않도록 할 수도 있다.

//동작이 명확하게 알려진 기존 부품을 이용해서 새로운 기능을 만들고 새로 만들어진 기능 역시 자체적으로 어떤 기능을 수행함으로써
//다른 기능의 부품이 될 수 있다. 이것이 함수 조립의 핵심.

//변이는 저수준 동작. 함수는 추상화의 기본단위.

//커링.

//각각의 논리적 인자에 대응하는 새로운 함수를 반환하는 함수를 커리(혹은 커리된) 함수라고 한다. - invoker 도 커리 함수.
//여러인자를 받는 함수가 여러개있을때 특정 인자들이 중복된다면 해당 중복인자를 내부에 클로저에 저장하는 공통적으로 활용가능한 함수를 리턴한다. 변이가 발생할 변수를 줄일 수 있다.
//invoker는 생성시에 넣어둔 메서드가 실행할때 넘어오는 target의 요소인 경우에만 실행되는 함수를 반환
function invoker (NAME, METHOD) {
    return function(target /* args ... */) {
        if (!existy(target)) fail("Must provide a target");

        var targetMethod = target[NAME];
        var args = _.rest(arguments);

        // targetMethod가 처음에 생성될때 넘겨준 함수와 동일한 경우에만 실행
        return doWhen((existy(targetMethod) && METHOD === targetMethod), function() {
            return targetMethod.apply(target, args);
        });
    };
}

//shift () 메소드는 배열에서 첫 번째 요소를 제거하고, 제거된 요소를 반환합니다.

//p.130
rightAwayInvoker(Array.prototype.reverse, [1,2,3]); //target 객체를 이용할 함수를 반환하는 대신 직접 두번째 인자로 제공된 target에 method를 호출한다.
invoker('reverse', Array.prototype.reverse)([1,2,3]); //모든 인자가 제공되기 전까지 method를 호출하지 않는다.
let invokerTest = invoker('reverse', Array.prototype.reverse); //Array를 reverse 하는 새로운 invokerTest 함수가 반환됨.

//p.131 우향커리, 좌향커리.
//본 책에서는 필자의 취향에 따라 좌향커리를 기본으로 사용(가장 오른쪽 인자에서 커리가 시작해서 왼쪽으로 이동하는..)
//부분적용은 왼쪽부터 인자를 처리. 커링은 오른쪽부터 시작.

//자동 커링 파라미터.

//커리는 함수를 인자로 받은 다음 한개의 파라미터를 갖는 고정된 함수를 반환하는 고차원 함수를 만들 수 있다.
//1. 함수를 인자로 받는다. 2. 한 개의 파라미터를 갖는 함수를 반환한다.

['11', '11', '11'].map(curry(parseInt)); //curry로 한개의 인자만 받도록 강제함.

function curry(fun) {
    return function(arg) {
        return fun(arg);
    };
}

function curry2(fun) {
    return function(secondArg) {
        return function(firstArg) {
            return fun(firstArg, secondArg);
        };
    };
}

function curry3(fun) {
    return function(last) {
        return function(middle) {
            return function(first) {
                return fun(first, middle, last);
            };
        };
    };
};