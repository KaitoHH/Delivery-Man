const iterate_num = 1000
const ant_num = 10
const delta = 1
const beta = 6
const alpha = 0.1
const beginVertex = 0
const eps = 1e-8
const rnd = Math.random()
const q = 1.0

let best_path_val_so_far = Number.MAX_VALUE
let best_path_so_far

//const dist = [[0, 1, 2, 2, 3],[2, 0, 3, 4, 2],[3, 2, 0, 4, 1],[3, 4, 5, 0, 5], [2, 4, 1, 4, 0]]
//const dist = [[0,2,5,7], [2,0,8,3], [5,8,0,1], [7,3,1,0]]

//console.log(tsp(dist, {2: [1, 3]}))

function removeByValue(arr, value) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            arr.splice(i, 1)
        }
    }
}

function tsp(dist, prerequisites = {}) {
    // get total vertex size
    const n = dist.length
    const pheromone = initPheromone(dist)
    const herustic = initHerustic(dist)
    best_path_val_so_far = Number.MAX_VALUE
    best_path_so_far = 0
    for (let iterate = 0; iterate < iterate_num; iterate ++) {
        const ants = []
        const info = initInfo(pheromone, herustic)
        for (let m = 0; m < ant_num; m++) {
            let currentVertex = -1
            const ant = {
                currentVertex: beginVertex,
                feasibleVertex: [],
                path: [beginVertex]
            }
            do {
                ant.feasibleVertex = initFeasibleVertexs(n, ant, beginVertex, prerequisites)
                currentVertex = selectNextK(ant, info)
                ant.currentVertex = currentVertex
                removeByValue(ant.feasibleVertex, currentVertex)
                ant.path.push(currentVertex)
            } while (currentVertex != beginVertex)
            ants.push(ant)
        }
        updatePheromone(pheromone, ants, dist)
    }
    return {
        path: best_path_so_far,
        length: best_path_val_so_far
    }
}

function initHerustic(dist) {
    const n = dist.length
    const herustic = new Array()
    for (let i = 0; i < n; i++) {
        herustic[i] = new Array(n)
        for (let j = 0; j < n; j ++) {
            herustic[i][j] = 1.0 / (dist[i][j] + eps)
        }
    }
    return herustic
}

function initFeasibleVertexs(n, ant, beginVertex = 0, prerequisites) {
    const feasibleVertexs = []
    const hasVisitedPath = ant.path
    for (let i = 0; i < n; i++) {
        if (i !== beginVertex && hasVisitedPath.indexOf(i) < 0) {
            const prerequisitesPath = prerequisites[i] ? prerequisites[i] : []
            if(isContainAnotherArr(hasVisitedPath, prerequisitesPath)) {
                feasibleVertexs.push(i)
            }
        }
    }
    return feasibleVertexs
}

function isContainAnotherArr(arr, subArr) {
    let isContain = true
    for(let i = 0; i < subArr.length; i++) {
        if(arr.indexOf(subArr[i]) < 0) {
            isContain = false
        }
    }
    return isContain
}

function selectNextK(ant, info) {
    const feasibleVertex = ant.feasibleVertex
    if (feasibleVertex.length === 0) {
        return beginVertex
    }
    const currentVertex = ant.currentVertex
    let sum = 0.0, sum_prob = 0.0
    for (let i = 0; i < feasibleVertex.length; i++) {
        sum += info[currentVertex][feasibleVertex[i]]
    }
    let rnd = Math.random()
    rnd *= sum
    for (let i = 0; i < feasibleVertex.length; i++) {
        sum_prob += info[currentVertex][feasibleVertex[i]]
        if (sum_prob >= rnd) {
            return feasibleVertex[i]
        }
    }
}

function updatePheromone(pheromone, ants, dist) {
    let best_tour
    let best_val = Number.MAX_VALUE
    for (let i = 0; i < ants.length; i++) {
        const ant = ants[i]
        const path = ant.path
        const path_length = calPath(path, dist)
        if (best_val > path_length) {
            best_val = path_length
            best_tour = path
        }
    }
    if (best_val < best_path_val_so_far) {
        best_path_val_so_far = best_val
        best_path_so_far = best_tour
    }
    for (let i = 0; i < pheromone.length; i++) {
        for (let j = 0; j < pheromone.length; j++) {
            pheromone[i][j] *= (1 - alpha)
        }
    }
    for (let i = 0; i < best_tour.length - 1; i ++) {
        const start = best_tour[i]
        const end = best_tour[i + 1]
        pheromone[start][end] += q / best_val
        pheromone[end][start] = pheromone[start][end]
    }
}

function calPath(path, dist) {
    let sum = 0.0
    for (let i = 0; i < path.length - 1; i++) {
        sum += dist[path[i]][path[i + 1]]
    }
    return sum
}

function power(x, y) {
    let ans = 1.0;
    while (y){
        if (y & 1) ans *= x;
        x *= x;
        y >>= 1;
    }
    return ans;
}

function calcaluatePheromoneInitValue(dist) {
    const n = dist.length
    let cnt = 0.0
    let tmp = 0.0
    let pheromone_init = 0.0
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            tmp += i != j ? dist[i][j] : 0
            cnt += i != j ? 1 : 0
        }
    }
    pheromone_init = (cnt * 1.0) / (tmp * n)
    return pheromone_init
}

function initPheromone(dist) {
    const n = dist.length
    const pheromone = new Array()
    const pheromone_1 = calcaluatePheromoneInitValue(dist)
    for (let i = 0; i < n; i++) {
        pheromone[i] = new Array(n)
        for (let j = 0; j < n; j++) {
            pheromone[i][j] = pheromone_1
        }
    }
    return pheromone
}

function initInfo(pheromone, herustic) {
    const info = new Array()
    let n = pheromone.length
    for (let i = 0; i < n; i++) {
        info[i] = new Array(n)
        for (let j = 0; j < n; j++) {
            info[i][j] = power(pheromone[i][j], delta) * power(herustic[i][j], beta)
        }
    }
    return info
}

module.exports = {
    tsp
}