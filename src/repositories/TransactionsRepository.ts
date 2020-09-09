import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface createTransactionDTO{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    const income: number = this.transactions.filter(transaction => {
      return transaction.type === "income"
    }).reduce((total, transaction) =>{
    return total + transaction.value
  },0)
  

  const outcome: number = this.transactions.filter(transaction => {
    return transaction.type === "outcome"
  }).reduce((total, transaction) =>{
  return total + transaction.value
},0)


const total: number = income - outcome;

const balance = {
  income,
  outcome,
  total,
}

return balance;
}

  public create({title, value, type} :createTransactionDTO): Transaction {

      const transaction = new Transaction({title, value, type});

      this.transactions.push(transaction);

      return transaction;
   
  }
}

export default TransactionsRepository;
