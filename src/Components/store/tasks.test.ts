import {ActionType, div, mult, numberReducer, sub, sum} from "./tasks";

test('suma', () => {


    const a: number = 10
    const b: number = 20

   const result =  sum(a, b)
    expect(result).toBe(30)
})

test('sub', () => {


    const a: number = 30
    const b: number = 10

    const result =  sub(a, b)
    expect(result).toBe(20)
})


test('mult', () => {


    const a: number = 3
    const b: number = 10

    const result =  mult(a, b)
    expect(result).toBe(30)
})

test('mult', () => {
    const a: number = 30
    const b: number = 10

    const result =  div(a, b)
    expect(result).toBe(3)
})

test('mult with NumberReducer', () => {
    const salary: number = 1000
    const action: ActionType = {
        type: "SUM",
        num: 300
    }
    const result = numberReducer(salary, action)
    expect(result).toBe(1300)
})