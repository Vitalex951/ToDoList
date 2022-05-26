function sum(...nums) {
    console.log(nums.reduce((sum, el) => sum + el, 0))
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался

    return nums.reduce((sum, el) => sum + el, 0)
}

// sum(1, 1, 1, 6)

function getTriangleType(a, b, c) {

    if (a + b < c || a + c < b || b + c < a) {
        return "00"
    } else if (a === b && b === c && b === c) {
        return "10"
    } else if (a === b || a === c || b === c) {
        return "01"
    } else return '11'
}

// console.log(getTriangleType(2, 3, 3))


function getSum(number) {
    let newText = number + ''
    let newNumber = +newText[0]
    for (let i = 1; i < newText.length; i++) {
        newNumber += +newText[i]
    }
    return +newNumber
}

// console.log(getSum(1234))

const isEvenIndexSumGreater = (arr) => {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    let odd = arr.filter(el => ((el % 2) !== 0)).reduce((sum, el) => sum + el, 0)
    let even = arr.filter(el => ((el % 2) === 0)).reduce((sum, el) => sum + el, 0)

    // return  even > odd
    return even
}

// console.log(isEvenIndexSumGreater([1, 100, 2, 200]))

function sumFirstNumbers(N) {
    if (N) {
        let newAr = []
        while (N > 0) {
            newAr.push(N--)
        }
        let x = newAr.reduce((sum, el) => sum + el, 0)
        return x
    }
    return x
}

console.log(sumFirstNumbers(4))

function getBanknoteList(amountOfMoney) {
    let newArr = []
    while (amountOfMoney > 0) {
        if (1000 < amountOfMoney) {
            newArr.push(1000)
            amountOfMoney - 1000
        }
    }

    return newArr
}

console.log(getBanknoteList(2500))
