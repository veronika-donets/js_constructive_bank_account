function Person(name = anonymous, dateOfBirth, amount = 0) {
    this.__proto__ = Person.prototype;

    this.name = name;
    this.dateOfBirth = dateOfBirth;
    this.amount = amount;

    const [day, month, year] = dateOfBirth.split('.');
    this.day = +day;
    this.month = +month;
    this.year = +year;
    this.log = [{ transaction: 'Initial', amount: this.amount }];
}

Person.prototype = {

    _getAge: function getAge() {
        const yearNow = new Date().getFullYear();
        const monthNow = new Date().getMonth() + 1;
        const dayNow = new Date().getDate();
        let result;
        if (monthNow === this.month && dayNow < this.day || monthNow < this.month) {
            result = yearNow - this.year - 1;
        } else {
            result = yearNow - this.year;
        }

        return result;
    },

    getInfo: function() {
        console.log(`Name: ${this.name}, Age: ${this.getAge()}, Amount: ${this.amount}\$`)
    },

    addMoney: function(money, info) {
        this.amount += money;
        this.log.push({ transaction: info, amount: money });
    },

    withdrawMoney: function(money, info) {
        this.amount -= money;
        this.log.push({ transaction: info, amount: money });
    },

    getAccountHistory: function() {

        const result = [];
        for (const value of this.log) {
            result.push(`${value.transaction}: ${value.amount}`);
        }

        return result;
    }
};

const dmytro = new Person('Dmytro', '26.10.1994', 1000);
const pavel = new Person('Pavel', '06.06.1990', 400);

dmytro.getInfo(); // print `Name: Dmytro, Age: <calculate yourself>, Amount: 1000$`
dmytro.addMoney(2000, 'salary');
dmytro.withdrawMoney(500, 'new phone');
dmytro.getInfo(); // Name: Dmytro, Age: <calculate yourself>, Amount: 2500$
dmytro.withdrawMoney(500, 'apartment rent');

console.log(dmytro);
console.log(dmytro.getAccountHistory()); // [ 'Initial: 1000', 'salary: 2000', 'new phone: -500', 'apartment rent: -500']

