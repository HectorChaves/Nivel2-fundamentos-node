import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: RequestDTO): Transaction {

    const balance = this.transactionsRepository.getBalance();
  
    
    
    if ((type === "outcome") && (value > balance.total)){
      console.log(balance);
      throw Error("errooooo");
    }
    
    const transaction  = this.transactionsRepository.create({
      title,
      value,
      type
    })

    const actualBalance = this.transactionsRepository.getBalance();    
    console.log(actualBalance);


    return transaction;
  }
}

export default CreateTransactionService;
