
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
          ), function(p,v){return p + v;}
        )
      )
    );
