
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
2. descendant = function(el, tagName){
descendant(a, 'div')
a = document.getElementsByTagName('a')[0]

el 의 자식 중 tagname 이 같은 것을 찾아야함.
el.children
*/

//el 은 dom object로 넘어올 것. tagName 은 string.
//배열을 순차적으로 찾으면서 result에 넣어야....

function descendant(el, tagName){

  var elements = el.getElementsByTagName(tagName);

  var descendantEl = function(arrayEl, tagName, result){

    if(_.isEmpty(arrayEl)) return result;

    var node = _.first(arrayEl);
    var more = _.rest(arrayEl);

    return descendantEl(more, tagName, construct(node, result));
  }

  return descendantEl(elements, tagName, []);
}

descendant(document.getElementsByTagName('html')[0], 'h1');

//////////////////////////////

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
