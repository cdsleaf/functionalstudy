/**
 * Created by cho on 2017-04-14.
 */

//넓이 우선 탐색 버전.
var i = [
    ['lisp', 'smal'],
    ['lisp', 'sch'],
    ['smal', 'self'],
    ['sch', 'java'],
    ['sch', 'lua'],
    ['self', 'lua'],
    ['self', 'java']
]

function depthSearch(graph, nodes, seen) {
    if (_.isEmpty(nodes)) return seen;

    var node = _.first(nodes);
    var more = _.rest(nodes);

    if (_.contains(seen, node))
        return depthSearch(graph, more, seen);
    else
        return depthSearch(graph,
            cat(more, nexts(graph, node)), // 이 부분에서 뒤에 남은 노드를 먼저 처리하게 함으로 써, 넓이 우선 탐색이 됨.
            construct(node, seen));
}

depthSearch(i, ['lisp'], []);