class Calculator{
    constructor(previous, current){
        this.previous_op_text_element = previous;
        console.log(this.previous_op_text_element);
        this.current_op_text_element = current;
        console.log(this.current_op_text_element);
        this.clear();
    }
    clear(){
        this.cur = "";
        this.prev = "";
        this.op = undefined;
    }
    del(){
        let current = this.cur;
        this.cur = current.toString().slice(0, -1)
    }
    append_number(number){
        // if we already have a decimal point don't include this
        if ((number) === '.' && this.cur.includes('.')) return
        // use string concatentation to make the cur
        this.cur = this.cur.toString() + number.toString()
    }
    choose_operation(sign){
        if (this.cur === "") return
        if (this.prev !== ""){
            this.compute()
        }
        this.op = sign
        this.prev = this.cur
        this.cur = ""
    }
    compute(){
        let computation
        //parseFloat makes element flaot number
        const prev = parseFloat(this.prev)
        //parseFloat makes element flaot number
        const current = parseFloat(this.cur)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.op) {
          case '+':
            computation = prev + current
            break
          case '-':
            computation = prev - current
            break
          case '*':
            computation = prev * current
            break
          case '÷':
            computation = prev / current
            break
          default:
            return
        }
        this.cur = computation
        this.op = undefined
        this.prev = ''
    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        //we had parseFloat earlier so we can use isNaN function here below
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    generate_display(){
        this.current_op_text_element.innerText = this.getDisplayNumber(this.cur);
        if (this.op != null) {
            this.previous_op_text_element.innerText = `${this.getDisplayNumber(this.prev)} ${this.op}`
        } else {
            this.previous_op_text_element.innerText = ''
        }
    }
}

const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const equals = document.querySelector('[data-equals]');

const clear = document.querySelector('[data-all-clear]');
const del = document.querySelector('[data-delete]');

const pre_display = document.querySelector('[data-previous-operand]');
const cur_display = document.querySelector('[data-current-operand]');

const calc = new Calculator(pre_display, cur_display);

numbers.forEach(number => {
    number.addEventListener('click', () => {
        // have to add innerText to get text string attributes
        calc.append_number(number.innerText);
        calc.generate_display();
    })
})

operations.forEach(operation => {
    operation.addEventListener('click', () => {
        calc.choose_operation(operation.innerText);
        calc.generate_display();
    })
})

equals.addEventListener('click', () =>{
    calc.compute();
    calc.generate_display();
})

clear.addEventListener('click', () =>{
    calc.clear();
    calc.generate_display();
})

del.addEventListener('click', () =>{
    calc.del();
    calc.generate_display();
})