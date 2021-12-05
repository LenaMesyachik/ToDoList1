import {ActionType, calculator, sum} from "./reducer";

test('sum',()=>{
    // 1 тестовые данные
    const num1 = 10;
    const num2=12;
    // 2 выполнение тестируемого кода
   const result= sum(num1,num2)
    //3 сравнение с ожидаемым результатом
    expect(result).toBe(22)
})

test ('sum of calculator', ()=>{
    const num1 = 10
    const num2=12
    const action:ActionType ={type: 'SUM', number:num2}
    const result =calculator(num1,action)
expect(result).toBe(22)
})
test ('mult of calculator', ()=>{
    const num1 = 10
    const num2=12
    const action:ActionType ={type: 'MULT', number:num2}
    const result =calculator(num1,action)
    expect(result).toBe(120)
})
test ('mult of calculator', ()=>{
    const num1 = 10
    const num2=12
    const action:ActionType ={type: 'MULT', number:num2}
    const result =calculator(num1,action)
    expect(result).toBe(120)
})
test ('mult of calculator', ()=>{
    const num1 = 10
    const num2=12
    const action:ActionType ={type: 'MULT', number:num2}
    const result =calculator(num1,action)
    expect(result).toBe(120)
})
test ('SUB of calculator', ()=>{
    const num1 = 10
    const num2=12
    const action:ActionType ={type: 'SUB', number:num2}
    const result =calculator(num1,action)
    expect(result).toBe(-2)
})
test ('DIV of calculator', ()=>{
    const num1 = 10
    const num2=5
    const action:ActionType ={type: 'DIV', number:num2}
    const result =calculator(num1,action)
    expect(result).toBe(2)
})