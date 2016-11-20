
[1,2,3,4].reduce(
  _.compose(
    partial(sqrPost, _.identity) , partial(
      condition2(
        validator("number", Number.isInteger),
        validator("number", Number.isInteger)
      ), function(p,v){return p + v;}
    )
  )
);


function condition1(/* validators */) {
    var validators = _.toArray(arguments);

    return function(fun, arg) {
        var errors = mapcat(function(isValid) {
            return isValid(arg) ? [] : [isValid.message];
        }, validators);

        if (!_.isEmpty(errors))
            throw new Error(errors.join(", "));

        return fun(arg);
    };
}

function condition2(/* validators */) {
    var validators = _.toArray(arguments);

    return function(fun /*,arguments */) {
        var err = [];
        var args = _.first(_.rest(arguments), fun.length);

        validators.forEach((v, idx)=> {
          if(!v(args[idx])) err.push(v.message);
        });

        if (err.length){
          throw new Error(err.join(", "));
        }

        return fun.apply(fun, args);
    };
}

[1,2,3,4].reduce(partial(condition2(
            validator("number", Number.isInteger),
            validator("number", Number.isInteger)
            ), function(p,v){return p + v;})
    );

var sqrPost = condition1(
  validator("result should not be over 50", (n)=> 50 > n)
);

[1,2,3,4].reduce(_.compose(partial(sqrPost, _.identity) , partial(
  condition2(
    validator("number", Number.isInteger),
    validator("number", Number.isInteger)
  ), function(p,v){return p + v;}))
);

/*
descendant = function(el, tagName){
descendant(a, 'div')
a = document.getElementsByTagName('a')[0]

el 의 자식 중 tagname 이 같은 것을 찾아야함.
el.children

el 은 dom object로 넘어올 것. tagName 은 string.
배열을 순차적으로 찾으면서 result에 넣어야....
*/

function descendant(el, tagName){
//debugger;
  var childrenElements = el.children;
  var childrenIndex = 0;
  tagName = tagName.toUpperCase();

  var descendantEl = function(arrayEl, index, tagName, result){

    if(arrayEl.length === index) return result;

    if(arrayEl[index].tagName === tagName) result.push(arrayEl[index]);

    if(!_.isEmpty(arrayEl[index].children)) result = descendantEl(arrayEl[index].children, 0, tagName, result);

    return descendantEl(arrayEl, index+1, tagName, result);
  }

  return descendantEl(childrenElements, childrenIndex, tagName, []);
}

var inputEl = document.getElementsByTagName('html')[0];
descendant(inputEl, 'h1');
//// 정답은  아래

d = (el, tagName, r = [])=>Array.prototype.slice(el.children, 0).reduce((r, el)=>{
	if(el.tagName == tagName) result.push(el);
	if(el.children.length) d(el, tagName, r);
	return r;
}, r);

function for(start, end, body){
  if(start == end) return;
  body(start);
  for(start + 1, end, body);
}

/*
16.11.14

과제

postDepth(......,influences)
대신
visit(............,influences)
이렇게 해도 동일한 결과를 얻도록

심화과제 pre는 왜 visit만으로 안되냐

*/

function visit(mapFun, resultFun, ary) {
    if (_.isArray(ary))
        return resultFun(_.map(ary, mapFun));
    else
        return resultFun(ary);
}

function postDepth(fun, ary) {
    return visit(partial1(postDepth, fun), fun, ary);
}

//postDepth(fun, nextArg)

function visit1(resultFun, ary){
  if (_.isArray(ary))
      return resultFun(_.map(ary, partial1(visit1, resultFun)));
  else
      return resultFun(ary);
}

function preDepth(fun, ary) {
    return visit(partial1(preDepth, fun), fun, fun(ary));
}
