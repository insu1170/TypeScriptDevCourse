class Employee {

    private _empName: string;
    age: number;
    empJob: string;

    constructor(empName: string, age: number, empJob: string) {
        this._empName = empName;
        this.age = age;
        this.empJob = empJob;
    }

    get empName() {
        return this._empName;
    }

    set empName(val: string) {
        this._empName = val;
    }

    printEmp = (): void => {
        console.log(this.empName + ' 나이는 ' + this.age + ' 직업은 ' + this.empJob);
    }
}

let employee1 = new Employee('kim', 3, '개발');

employee1.printEmp();